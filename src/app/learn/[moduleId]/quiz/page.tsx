import QuizView from "@/components/learn/QuizView";

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { moduleId } = await params;
  return <QuizView moduleId={moduleId} />;
}
