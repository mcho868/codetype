import QuizView from "@/components/learn/QuizView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { moduleId } = await params;
  return <QuizView moduleId={moduleId} />;
}
