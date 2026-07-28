function groupAnagrams(strs: string[]): string[][] {
  const grouped = new Map<string, string[]>();
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(word);
  }
  return Array.from(grouped.values());
}

// Try it out — press Run
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [['eat','tea','ate'], ['tan','nat'], ['bat']] (order may vary)
console.log(groupAnagrams([""]));  // [['']]
console.log(groupAnagrams(["a"])); // [['a']]

export {};
