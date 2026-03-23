import LessonView from "@/components/learn/LessonView";

interface Props {
  params: Promise<{ course: string; moduleSlug: string }>;
}

export default async function CourseLessonPage({ params }: Props) {
  const { course, moduleSlug } = await params;
  return <LessonView courseSlug={course} moduleId={moduleSlug} />;
}
