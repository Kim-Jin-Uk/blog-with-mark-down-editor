export const markdownAddStyleMap: Map<string, string> = new Map([
  ["h1", "\n# Header"],
  ["h2", "\n## Header"],
  ["h3", "\n### Header3"],
  ["strong", "**Bold**"],
]);
export const markdownSetStyleMap: Map<string, string[]> = new Map([
  ["h1", ["\n# ", "\n"]],
  ["h2", ["\n## ", "\n"]],
  ["h3", ["\n## ", "\n"]],
  ["strong", ["**", "**"]],
]);

/**
 * export const markdownAddStyleMap: Map<string, string> = new Map([
  ["H1", "\n# Header"],
  ["H2", "\n## Header"],
  ["H3", "\n### Header3"],
  ["Bold", "**Bold**"],
  ["Italic", "_Italic_"],
  ["<->", "`Inline Code`"],
  ["---", "\n---\n"],
  ["Image", "![Image Title](https://test.image.com)"],
]);
export const markdownSetStyleMap: Map<string, string[]> = new Map([
  ["H1", ["\n# ", "\n"]],
  ["H2", ["\n## ", "\n"]],
  ["H3", ["\n## ", "\n"]],
  ["Bold", ["**", "**"]],
  ["Italic", ["_", "_"]],
  ["<->", ["`", "`"]],
]);
  */
