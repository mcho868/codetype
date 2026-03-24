import LessonView from "@/components/learn/LessonView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { moduleId } = await params;
  return <LessonView moduleId={moduleId} />;
}
