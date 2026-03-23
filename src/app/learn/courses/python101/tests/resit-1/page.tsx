import TestView from "@/components/learn/TestView";
import resitTest1 from "@/lib/learn/courses/python101/tests/resit-test-1";

export default function Resit1Page() {
  return (
    <TestView
      test={resitTest1}
      courseSlug="python101"
      backPath="/learn/courses/python101"
    />
  );
}
