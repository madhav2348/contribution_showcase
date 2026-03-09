import { generateEmojiMarkdown } from "./emojiMarkdown";
import { generateLinkMarkdown } from "./linkMarkdown";
import { generateTableMarkdown } from "./tableMarkdown";

export function generateMarkdownByFormat(format, items, stats) {
  if (format === "emoji") return generateEmojiMarkdown(items, stats);
  if (format === "link") return generateLinkMarkdown(items, stats);
  return generateTableMarkdown(items, stats);
}
