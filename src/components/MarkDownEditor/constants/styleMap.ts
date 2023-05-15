export const markdownAddStyleMap: Map<string, string> = new Map([
  ["H1", "\n# Header"],
  ["H2", "\n## Header"],
  ["H3", "\n### Header3"],
  ["Bold", "**Bold**"],
  ["Italic", "_Italic_"],
  ["<->", "`Inline Code`"],
  ["---", "\n---\n"],
  ["Image", "![Image Title](https://test.image.com)"],
  ["Link", "[Link Title](https://test.link.com)"],
  ["Block", "\n> Block Quote"],
  ["Code", "\n```\nCode Block\n```\n"],
  [
    "Table",
    "\n| head1 | head2 | head3 |\n| :-: | :-: | :-: |\n| row1 | row2 | row3 |\n",
  ],
]);
export const markdownSetStyleMap: Map<string, string[]> = new Map([
  ["H1", ["\n# ", "\n"]],
  ["H2", ["\n## ", "\n"]],
  ["H3", ["\n## ", "\n"]],
  ["Bold", ["**", "**"]],
  ["Italic", ["_", "_"]],
  ["<->", ["`", "`"]],
  ["Block", ["\n> ", ""]],
  ["Code", ["\n```\n", "\n```\n"]],
]);
