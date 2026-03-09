export function groupItemsByRepo(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.repo]) acc[item.repo] = [];
    acc[item.repo].push(item);
    return acc;
  }, {});
}

export function buildStatsHeader(stats) {
  let markdown = "# My Contributions\n\n";
  markdown += "## Statistics\n\n";
  markdown += `**Total Contributions:** ${stats.total} | **Merged PRs:** ${stats.prs} | **Issues:** ${stats.issues} | **Reviews:** ${stats.reviews} | **Last Updated:** ${stats.lastUpdated}\n\n`;
  markdown += "---\n\n";
  return markdown;
}

export function getTypeLabel(type) {
  if (type === "prs") return "Merged Pull Request";
  if (type === "issues") return "Issue";
  return "Review";
}

export function getTypeBadge(type) {
  if (type === "prs") return "PR";
  if (type === "issues") return "Issue";
  return "Review";
}
