import LessonView from "@/components/learn/LessonView";

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { moduleId } = await params;
  return <LessonView moduleId={moduleId} />;
}
