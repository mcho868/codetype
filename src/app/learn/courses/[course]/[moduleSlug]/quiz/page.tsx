import QuizView from "@/components/learn/QuizView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ course: string; moduleSlug: string }>;
}

export default async function CourseQuizPage({ params }: Props) {
  const { course, moduleSlug } = await params;
  return <QuizView courseSlug={course} moduleId={moduleSlug} />;
}
