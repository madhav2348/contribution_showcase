import { buildStatsHeader, getTypeBadge } from "./shared";

export function generateTableMarkdown(items, stats) {
  let markdown = buildStatsHeader(stats);
  markdown += "## Contributions\n\n";
  markdown += "| Type | Repository | Title | Updated | Link |\n";
  markdown += "|------|------------|-------|---------|------|\n";

  items.forEach((item) => {
    const badge = getTypeBadge(item.type);
    const date = new Date(item.updatedAt).toLocaleDateString();
    markdown += `| ${badge} | ${item.repo} | ${item.title} | ${date} | [View](${item.url}) |\n`;
  });

  return markdown;
}
