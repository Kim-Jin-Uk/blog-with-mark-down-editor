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
