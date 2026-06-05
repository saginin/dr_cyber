import { pathways } from "@/lib/config/pathways";
import { quizQuestions } from "@/lib/config/quiz";
import type { PathwayId, QuizAnswerInput, ScoreMap } from "@/types/funnel";

const pathwayIds = pathways.map((pathway) => pathway.id);

export function scoreQuiz(answers: QuizAnswerInput[]) {
  const scores = Object.fromEntries(pathwayIds.map((id) => [id, 0])) as Record<PathwayId, number>;
  const responseDetails = answers.map((answer) => {
    const question = quizQuestions.find((item) => item.id === answer.questionId);
    const option = question?.options.find((item) => item.id === answer.selectedAnswer);

    if (!question || !option) {
      throw new Error(`Invalid quiz answer for ${answer.questionId}`);
    }

    Object.entries(option.scores).forEach(([pathwayId, points]) => {
      scores[pathwayId as PathwayId] += points ?? 0;
    });

    return {
      questionId: question.id,
      questionText: question.text,
      selectedAnswer: option.label,
      selectedAnswerId: option.id,
      answerScoreJson: option.scores as ScoreMap
    };
  });

  const winner = Object.entries(scores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return pathwayIds.indexOf(a[0] as PathwayId) - pathwayIds.indexOf(b[0] as PathwayId);
  })[0][0] as PathwayId;

  const pathway = pathways.find((item) => item.id === winner) ?? pathways[pathways.length - 1];
  return { pathway, scores, responseDetails };
}
