import TestView from "@/components/learn/TestView";
import resitTest1 from "@/lib/learn/courses/typescript101/tests/resit-test-1";

export default function Resit1Page() {
  return (
    <TestView
      test={resitTest1}
      courseSlug="typescript101"
      backPath="/learn/courses/typescript101"
    />
  );
}
