import LessonView from "@/components/learn/LessonView";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ course: string; moduleSlug: string }>;
}

export default async function CourseLessonPage({ params }: Props) {
  const { course, moduleSlug } = await params;
  if (course === "compsci101") {
    redirect(`/learn/courses/python-essentials/${moduleSlug}`);
  }
  return <LessonView courseSlug={course} moduleId={moduleSlug} />;
}
