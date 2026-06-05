import { emailSequence } from "@/lib/config/emailSequence";
import { getPathway } from "@/lib/config/pathways";
import { appSettings } from "@/lib/settings";
import { logEmail, trackEvent } from "@/lib/store";
import type { FunnelLead } from "@/types/funnel";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

async function sendProviderEmail(payload: EmailPayload) {
  const provider = process.env.EMAIL_PROVIDER || "console";
  if (provider === "resend" && process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: payload.to,
        subject: payload.subject,
        html: payload.html
      })
    });
    return response.ok ? "sent" : `failed:${response.status}`;
  }
  console.info("[email:console]", payload);
  return "logged";
}

export function renderResultEmail(lead: FunnelLead) {
  const settings = appSettings();
  const pathway = getPathway(lead.pathwayResult);
  const roadmap = pathway.roadmap.map((step, index) => `${index + 1}. ${step}`).join("\n");
  const text = `Hi ${lead.firstName},

Your recommended cybersecurity pathway is:

${pathway.name}

Based on your answers, this pathway may be a strong fit because of your background, skills, and career goals.

Your suggested next steps are:

${roadmap}

You can also book a free Cyber Career Roadmap Call here:

${settings.bookingLink}

This call will help you understand which skills, certifications, and projects you should focus on first.

Regards,
Cyber Career Pathway Team`;

  return {
    subject: "Your Cybersecurity Career Pathway Is Ready",
    text,
    html: text.replaceAll("\n", "<br />")
  };
}

export async function sendQuizResultEmail(lead: FunnelLead) {
  const email = renderResultEmail(lead);
  const status = await sendProviderEmail({
    to: lead.email,
    subject: email.subject,
    text: email.text,
    html: email.html
  });
  await logEmail(lead.id, "quiz-result", email.subject, status);
  await trackEvent("Email Sent", { leadId: lead.id, emailType: "quiz-result", status });
}

export async function notifyAdmin(lead: FunnelLead) {
  const settings = appSettings();
  if (!settings.adminNotificationEmail) return;
  const subject = `New quiz completion: ${lead.firstName} ${lead.lastName}`;
  const text = `${lead.firstName} ${lead.lastName} completed the quiz and received ${lead.pathwayResult}.\nEmail: ${lead.email}\nPhone: ${lead.phone || "N/A"}`;
  const status = await sendProviderEmail({
    to: settings.adminNotificationEmail,
    subject,
    text,
    html: text.replaceAll("\n", "<br />")
  });
  await logEmail(lead.id, "admin-notification", subject, status);
}

export async function enqueueNurtureSequence(lead: FunnelLead) {
  for (const item of emailSequence) {
    await logEmail(
      lead.id,
      item.key,
      item.subject,
      item.delayDays === 0 ? "queued-immediate" : `scheduled-day-${item.delayDays}`
    );
  }
}
