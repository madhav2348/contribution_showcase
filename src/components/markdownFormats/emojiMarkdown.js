import { buildStatsHeader, getTypeLabel, groupItemsByRepo } from "./shared";

const EMOJI = {
  check: "\u2705",
  bug: "\ud83d\udc1b",
  review: "\ud83d\udcac",
  fire: "\ud83d\udd25",
  calendar: "\ud83d\uddd3",
  link: "\ud83d\udd17",
};

function getTypeEmoji(type) {
  if (type === "prs") return EMOJI.check;
  if (type === "issues") return EMOJI.bug;
  return EMOJI.review;
}

export function generateEmojiMarkdown(items, stats) {
  const groupedByRepo = groupItemsByRepo(items);
  let markdown = buildStatsHeader(stats);

  Object.entries(groupedByRepo).forEach(([, contributions]) => {
    contributions.forEach((item) => {
      const emoji = getTypeEmoji(item.type);
      const typeLabel = getTypeLabel(item.type);
      const date = new Date(item.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      markdown += `### ${EMOJI.fire} ${item.repo}\n`;
      markdown += `${emoji} ${typeLabel} - ${EMOJI.calendar} ${date} - ${EMOJI.review} ${item.title} - ${EMOJI.link} [View](${item.url})\n\n`;
    });
  });

  return markdown;
}
