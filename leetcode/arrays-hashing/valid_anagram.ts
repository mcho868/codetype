function isAnagram(s: string, t: string): boolean {
  const hm = new Map<string, number>();
  for (const ch of s) {
    hm.set(ch, (hm.get(ch) ?? 0) + 1);
  }
  for (const ch of t) {
    if (!hm.has(ch)) return false;
    const count = hm.get(ch)! - 1;
    if (count === 0) hm.delete(ch);
    else hm.set(ch, count);
  }
  return hm.size === 0;
}

// Try it out — press Run
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false

export {};
