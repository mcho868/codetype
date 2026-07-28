function isPalindrome(s: string): boolean {
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
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true

export {};
