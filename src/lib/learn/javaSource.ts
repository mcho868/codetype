/**
 * Lesson snippets routinely declare several top-level classes in one editor
 * buffer (a superclass, a subclass, and a driver class with `main`). A real
 * .java file allows only one *public* top-level type, and it must match the
 * file name, so those snippets cannot be written to disk verbatim.
 *
 * This module rewrites such a snippet into something javac accepts without
 * changing what the student sees:
 * - the entry type is the top-level type that declares `main`
 * - every other top-level `public` modifier is blanked out (package-private
 *   types in the same file still see each other)
 *
 * Blanking is done by overwriting `public` with spaces rather than deleting it,
 * so javac's line and column numbers still line up with the student's code.
 */

export interface PreparedJavaSource {
  /** Type to compile as `<className>.java` and hand to `java`. */
  className: string;
  /** Source text to write to disk. */
  source: string;
}

interface TopLevelType {
  name: string;
  /** Index of this declaration's `public` modifier, if it has one. */
  publicIndex: number | null;
  bodyStart: number;
  bodyEnd: number;
}

const PUBLIC_KEYWORD = "public";
const TYPE_KEYWORDS = new Set(["class", "interface", "enum", "record"]);
const MAIN_SIGNATURE = /\bmain\s*\(\s*(?:final\s+)?String\b/g;

/**
 * Replaces comments and string/char literals with spaces so brace counting and
 * keyword matching cannot be fooled by `"}"` or `// class Foo`. Offsets and
 * newlines are preserved, so indexes into the mask are valid in the original.
 */
function maskCommentsAndLiterals(code: string): string {
  const out = code.split("");
  let i = 0;

  const blank = (from: number, to: number) => {
    for (let j = from; j < to && j < code.length; j++) {
      if (code[j] !== "\n") out[j] = " ";
    }
  };

  while (i < code.length) {
    const ch = code[i];
    const next = code[i + 1];

    if (ch === "/" && next === "/") {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      blank(i, stop);
      i = stop;
      continue;
    }

    if (ch === "/" && next === "*") {
      const end = code.indexOf("*/", i + 2);
      const stop = end === -1 ? code.length : end + 2;
      blank(i, stop);
      i = stop;
      continue;
    }

    if (ch === '"' && code.startsWith('"""', i)) {
      const end = code.indexOf('"""', i + 3);
      const stop = end === -1 ? code.length : end + 3;
      blank(i, stop);
      i = stop;
      continue;
    }

    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== ch && code[j] !== "\n") {
        j += code[j] === "\\" ? 2 : 1;
      }
      const stop = j < code.length && code[j] === ch ? j + 1 : j;
      blank(i, stop);
      i = stop;
      continue;
    }

    i++;
  }

  return out.join("");
}

function findTopLevelTypes(masked: string): TopLevelType[] {
  const types: TopLevelType[] = [];
  const tokens = masked.matchAll(/[A-Za-z_$][\w$]*|[{};]/g);

  let depth = 0;
  let publicIndex: number | null = null;
  let expectingName = false;
  let pending: { name: string; publicIndex: number | null } | null = null;
  let open: TopLevelType | null = null;

  for (const token of tokens) {
    const text = token[0];
    const index = token.index ?? 0;

    if (text === "{") {
      if (depth === 0 && pending) {
        open = { ...pending, bodyStart: index, bodyEnd: masked.length };
        pending = null;
      }
      depth++;
      continue;
    }

    if (text === "}") {
      depth = Math.max(0, depth - 1);
      if (depth === 0 && open) {
        open.bodyEnd = index;
        types.push(open);
        open = null;
        publicIndex = null;
      }
      continue;
    }

    if (depth > 0) continue;

    // `;` ends an import/package statement or an abstract-free declaration.
    if (text === ";") {
      publicIndex = null;
      expectingName = false;
      pending = null;
      continue;
    }

    if (expectingName) {
      pending = { name: text, publicIndex };
      publicIndex = null;
      expectingName = false;
      continue;
    }

    if (TYPE_KEYWORDS.has(text)) {
      expectingName = true;
      continue;
    }

    if (text === PUBLIC_KEYWORD) {
      publicIndex = index;
    }
  }

  return types;
}

function braceDepthAt(masked: string, index: number): number {
  let depth = 0;
  for (let i = 0; i < index; i++) {
    if (masked[i] === "{") depth++;
    else if (masked[i] === "}") depth--;
  }
  return depth;
}

function findEntryType(masked: string, types: TopLevelType[]): TopLevelType | null {
  if (types.length === 0) return null;

  const enclosing: TopLevelType[] = [];
  let shallowest: TopLevelType | null = null;

  MAIN_SIGNATURE.lastIndex = 0;
  for (const match of masked.matchAll(MAIN_SIGNATURE)) {
    const index = match.index ?? 0;
    const owner = types.find((type) => index > type.bodyStart && index < type.bodyEnd);
    if (!owner) continue;

    enclosing.push(owner);
    // Depth 1 means `main` sits directly in a top-level type rather than in a
    // nested helper class, which makes it the more likely entry point.
    if (!shallowest && braceDepthAt(masked, index) === 1) shallowest = owner;
  }

  if (shallowest) return shallowest;
  if (enclosing.length > 0) return enclosing[0];

  return types.find((type) => type.publicIndex !== null) ?? types[0];
}

export function prepareJavaSource(code: string): PreparedJavaSource {
  const masked = maskCommentsAndLiterals(code);
  const types = findTopLevelTypes(masked);
  const entry = findEntryType(masked, types);

  if (!entry) return { className: "Main", source: code };

  const characters = code.split("");
  for (const type of types) {
    if (type === entry || type.publicIndex === null) continue;
    for (let i = 0; i < PUBLIC_KEYWORD.length; i++) {
      characters[type.publicIndex + i] = " ";
    }
  }

  return { className: entry.name, source: characters.join("") };
}
