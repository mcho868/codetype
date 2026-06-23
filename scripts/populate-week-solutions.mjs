#!/usr/bin/env node
/**
 * Set code-runner starterCode from "Model solution:\n..." in the explanation field.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../src/lib/learn/courses/compsci101");

const WEEK2_SOLUTIONS = {
  "w2-q4": 'name = input()\nprint("Hi", name)',
  "w2-q5": "a = int(input())\nb = int(input())\nprint(a + b)",
  "w2-q6": "n = int(input())\nprint(n * 2)",
  "w2-q7": 'age = int(input())\nprint(f"Next year: {age + 1}")',
  "w2-q8": "value = input()\nprint(type(value))",
  "w2-q9": "text = input()\nprint(int(text))",
  "w2-q10": "text = input()\nprint(float(text))",
  "w2-q11":
    'name = input()\nage = int(input())\nprint(f"Hello, {name}! You are {age} years old.")',
  "w2-q12": 'a = int(input())\nb = int(input())\nprint(f"{a} + {b} = {a + b}")',
  "w2-q13": 'width = float(input())\nheight = float(input())\nprint(f"Area: {width * height}")',
  "w2-q14": 'c = float(input())\nf = c * 9 / 5 + 32\nprint(f"{c} C = {f} F")',
  "w2-q15": "a = int(input())\nb = int(input())\nprint(a // b)\nprint(a % b)",
  "w2-q16": "a = float(input())\nb = float(input())\nc = float(input())\nprint((a + b + c) / 3)",
  "w2-q17": "n = int(input())\nprint(int(n / 2))",
  "w2-q18":
    "# Read the user's name from standard input\nname = input()\n# Greet them on one line\nprint(\"Welcome,\", name)",
};

function extractModelSolution(explanation, questionId) {
  const marker = "Model solution:\n";
  const idx = explanation.indexOf(marker);
  if (idx !== -1) {
    let code = explanation.slice(idx + marker.length);
    const alt = code.indexOf("\n\nAlternative:");
    if (alt !== -1) code = code.slice(0, alt);
    const why = code.indexOf("\n\nWhy:");
    if (why !== -1) code = code.slice(0, why);
    return code.replace(/\n$/, "");
  }
  return WEEK2_SOLUTIONS[questionId] ?? null;
}

function readQuotedOrTemplate(src, pos) {
  const ch = src[pos];
  if (ch === "`") {
    let i = pos + 1;
    let out = "";
    while (i < src.length) {
      if (src[i] === "\\") {
        out += src[i + 1];
        i += 2;
        continue;
      }
      if (src[i] === "`") return { value: out, end: i + 1, quote: "`" };
      out += src[i++];
    }
    throw new Error("Unclosed template at " + pos);
  }
  if (ch === "'" || ch === '"') {
    let i = pos + 1;
    let out = "";
    while (i < src.length) {
      if (src[i] === "\\" && i + 1 < src.length) {
        const esc = src[i + 1];
        const decoded = { n: "\n", t: "\t", r: "\r", "\\": "\\", "'": "'", '"': '"' };
        out += decoded[esc] ?? esc;
        i += 2;
        continue;
      }
      if (src[i] === ch) return { value: out, end: i + 1, quote: ch };
      out += src[i++];
    }
    throw new Error("Unclosed string at " + pos);
  }
  throw new Error("Expected string at " + pos);
}

function skipWsComma(src, pos) {
  let i = pos;
  while (i < src.length && /[\s,]/.test(src[i])) i++;
  return i;
}

function findCrClose(block) {
  let depth = 1;
  let i = 0;
  let inStr = null;
  while (i < block.length) {
    const c = block[i];
    if (inStr) {
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === inStr) inStr = null;
      i++;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") {
      inStr = c;
      i++;
      continue;
    }
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return block.length;
}

function processCrBlock(block) {
  let i = skipWsComma(block, 0);
  const id = readQuotedOrTemplate(block, i);
  i = skipWsComma(block, id.end);
  readQuotedOrTemplate(block, i); // prompt — skip
  i = skipWsComma(block, readQuotedOrTemplate(block, i).end);
  const starterStart = i;
  const starter = readQuotedOrTemplate(block, starterStart);
  i = skipWsComma(block, starter.end);

  let lastArg = null;
  while (i < block.length) {
    i = skipWsComma(block, i);
    if (i >= block.length) break;
    if (block.startsWith("),", i) || block.startsWith(")\n", i)) break;
    if (block[i] === "'" || block[i] === '"' || block[i] === "`") {
      lastArg = readQuotedOrTemplate(block, i);
      i = lastArg.end;
      continue;
    }
    const m = block.slice(i).match(/^[a-zA-Z_][\w]*\(/);
    if (m) {
      let depth = 0;
      let j = i + m[0].length - 1;
      while (j < block.length) {
        if (block[j] === "(") depth++;
        else if (block[j] === ")") {
          depth--;
          if (depth === 0) {
            i = j + 1;
            break;
          }
        }
        j++;
      }
      continue;
    }
    i++;
  }

  if (!lastArg) return null;
  const solution = extractModelSolution(lastArg.value, id.value);
  if (!solution) return null;

  const newStarter =
    starter.quote === "`" ? "`" + solution + "`" : `'${solution.replace(/'/g, "\\'")}'`;

  if (solution === starter.value) return null;

  const replaced =
    block.slice(0, starterStart) + newStarter + block.slice(starter.end);

  return { id: id.value, replaced };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const parts = content.split("cr(");
  if (parts.length === 1) return 0;

  let changes = 0;
  const out = [parts[0]];
  for (let p = 1; p < parts.length; p++) {
    const block = parts[p];
    const closeIdx = findCrClose(block);
    const crBody = block.slice(0, closeIdx);
    const tail = block.slice(closeIdx);
    const result = processCrBlock(crBody);
    if (result) {
      changes++;
      out.push("cr(" + result.replaced + tail);
    } else {
      out.push("cr(" + block);
    }
  }
  if (changes > 0) fs.writeFileSync(filePath, out.join(""));
  return changes;
}

const weeks = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["week2", "week3", "week4", "week5", "week6", "week7", "week8", "week9", "week10"];

let total = 0;
for (const w of weeks) {
  const file = path.join(ROOT, `${w}.ts`);
  const n = processFile(file);
  console.log(`${w}.ts: ${n} starter(s) updated`);
  total += n;
}
console.log(`Total: ${total}`);
