import type { Module } from '../../python101/types';

const module8: Module = {
  id: 'leetcode-125-valid-palindrome',
  slug: '8',
  title: '125. Valid Palindrome',
  description:
    'Given a string s, return true if it is a palindrome after removing non-alphanumeric characters and ignoring case. Classic two-pointer approach.',
  icon: '🪞',
  color: 'from-sky-500 to-blue-400',
  locked: false,
  section: 'Two Pointers',
  lessons: [
    {
      id: 'lesson-valid-palindrome-problem',
      title: 'The Problem',
      content: `**125. Valid Palindrome** — Easy

Given a string **s**, return **true** if it is a palindrome, otherwise **false**.

A palindrome reads the same forward and backward. It is **case-insensitive** and **ignores all non-alphanumeric characters**.

**Example 1**
Input: s = "Was it a car or a cat I saw?"
Output: true
Explanation: After filtering → "wasitacaroracatisaw", which is a palindrome.

**Example 2**
Input: s = "tab a cat"
Output: false
Explanation: "tabacat" is not a palindrome.

**Constraints**
- 1 <= s.length <= 1000
- s is made up of only printable ASCII characters.`,
      codeExamples: [],
    },
    {
      id: 'lesson-valid-palindrome-two-pointers',
      title: 'Two Pointers — O(n)',
      content: `Place one pointer at the start and one at the end. Move them toward each other, skipping any non-alphanumeric characters, and compare the characters they land on (case-insensitive). If they ever differ, return false.

**How it works**
1. \`left = 0\`, \`right = len(s) - 1\`.
2. While \`left < right\`:
   - Advance \`left\` past non-alphanumeric characters.
   - Retreat \`right\` past non-alphanumeric characters.
   - If \`s[left].lower() != s[right].lower()\`, return false.
   - Move both pointers inward.
3. If the loop completes, return true.

**Complexity**
- Time: **O(n)** — each pointer moves at most n/2 steps.
- Space: **O(1)** — no extra strings created.

**Alternative:** Build a cleaned string first (\`''.join(c.lower() for c in s if c.isalnum())\`) then compare it to its reverse. Correct but uses O(n) extra space.`,
      codeExamples: [
        {
          language: 'python',
          code: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        import re

        s = re.sub(r"[^a-zA-Z0-9]", "", s).lower()

        left = 0
        right = len(s) - 1
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1
        return True

# Try it out — press Run
sol = Solution()
print(sol.isPalindrome("Was it a car or a cat I saw?"))  # True
print(sol.isPalindrome("tab a cat"))                     # False
print(sol.isPalindrome("A man, a plan, a canal: Panama")) # True`,
          caption: 'Python — clean then two-pointer, O(n) space',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function isPalindrome(s: string): boolean {
  const cleaned: string = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let left: number = 0;
  let right: number = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] != cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Try it out — press Run
console.log(isPalindrome("Was it a car or a cat I saw?")); // true
console.log(isPalindrome("tab a cat"));                    // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true`,
          caption: 'TypeScript — clean then two-pointer, O(n) space',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module8;
