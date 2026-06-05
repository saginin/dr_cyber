import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { scoreQuiz } from "@/lib/scoring";
import { sendQuizResultEmail, notifyAdmin, enqueueNurtureSequence } from "@/lib/services/email";
import { sendResultSms } from "@/lib/services/sms";
import { saveQuizResponses, setPipelineStage, trackEvent, upsertLead } from "@/lib/store";
import { quizSubmitSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  if (!rateLimit(request, 10).ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const parsed = quizSubmitSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid quiz submission" }, { status: 400 });
  if (parsed.data.hp) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  try {
    const result = scoreQuiz(parsed.data.answers);
    const lead = await upsertLead({
      ...parsed.data.lead,
      phone: parsed.data.lead.phone || "",
      pathwayResult: result.pathway.name,
      pathwayScoreJson: result.scores,
      tag: `pathway:${result.pathway.id}`
    });

    await saveQuizResponses(
      lead.id,
      result.responseDetails.map((response) => ({
        questionId: response.questionId,
        questionText: response.questionText,
        selectedAnswer: response.selectedAnswer,
        answerScoreJson: response.answerScoreJson
      }))
    );
    await setPipelineStage(lead.id, "Quiz Completed");
    await trackEvent("Quiz Completed", {
      leadId: lead.id,
      sessionId: parsed.data.sessionId,
      pathwayResult: result.pathway.name
    });
    await trackEvent("Lead Submitted", { leadId: lead.id });

    await sendQuizResultEmail(lead);
    await enqueueNurtureSequence(lead);
    await sendResultSms(lead);
    await notifyAdmin(lead);
    await setPipelineStage(lead.id, "Roadmap Delivered");

    return NextResponse.json({ leadId: lead.id, pathway: result.pathway.name });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Submission failed" }, { status: 400 });
  }
}
