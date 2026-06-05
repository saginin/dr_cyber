import { QuizApp } from "@/components/QuizApp";
import { quizQuestions } from "@/lib/config/quiz";

export default function QuizPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <QuizApp questions={quizQuestions} searchParams={searchParams} />;
}
