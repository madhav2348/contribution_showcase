import { buildStatsHeader, getTypeBadge, groupItemsByRepo } from "./shared";

export function generateLinkMarkdown(items, stats) {
  const groupedByRepo = groupItemsByRepo(items);
  let markdown = buildStatsHeader(stats);

  Object.entries(groupedByRepo).forEach(([repo, contributions]) => {
    markdown += `## ${repo}\n\n`;
    contributions.forEach((item) => {
      const badge = getTypeBadge(item.type);
      const date = new Date(item.updatedAt).toLocaleDateString();
      markdown += `- **[${badge}]** [${item.title}](${item.url}) - ${date}\n`;
    });
    markdown += "\n";
  });

  return markdown;
}
