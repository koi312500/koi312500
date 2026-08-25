import type { TimelineDateRange } from "../types";

type SortableTimelineItem = {
  dateRanges: readonly TimelineDateRange[];
};

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function isActive(range: TimelineDateRange, currentMonth: string) {
  return (
    range.start <= currentMonth &&
    (range.end === "present" || range.end >= currentMonth)
  );
}

function compareRangesNewestFirst(left: TimelineDateRange, right: TimelineDateRange) {
  const leftEnd = left.end === "present" ? "9999-12" : left.end;
  const rightEnd = right.end === "present" ? "9999-12" : right.end;

  return rightEnd.localeCompare(leftEnd) || right.start.localeCompare(left.start);
}

function getLatestRange(ranges: readonly TimelineDateRange[]) {
  return [...ranges].sort(compareRangesNewestFirst)[0];
}

function getLatestActiveRange(ranges: readonly TimelineDateRange[], currentMonth: string) {
  return ranges
    .filter((range) => isActive(range, currentMonth))
    .sort((left, right) => right.start.localeCompare(left.start))[0];
}

export function compareTimelineItems(
  left: SortableTimelineItem,
  right: SortableTimelineItem,
  currentMonth = getCurrentMonth(),
) {
  const leftActive = getLatestActiveRange(left.dateRanges, currentMonth);
  const rightActive = getLatestActiveRange(right.dateRanges, currentMonth);

  if (leftActive && rightActive) {
    return (
      rightActive.start.localeCompare(leftActive.start) ||
      compareRangesNewestFirst(leftActive, rightActive)
    );
  }

  if (leftActive) return -1;
  if (rightActive) return 1;

  const leftLatest = getLatestRange(left.dateRanges);
  const rightLatest = getLatestRange(right.dateRanges);

  if (!leftLatest && !rightLatest) return 0;
  if (!leftLatest) return 1;
  if (!rightLatest) return -1;

  return compareRangesNewestFirst(leftLatest, rightLatest);
}
