const hoursPassedSinceFirstEntry =
  (new Date() - new Date(1578867601 * 1000)) / 1000 / 60 / 60;

export default [
  6, // hour
  12,
  24, // 1 day
  3 * 24, // 3 days
  7 * 24, // 7 days
  28 * 24, // 1 month
  3 * 28 * 24, // 3 months
  6 * 28 * 24, // 6 months
  365 * 24, // 1 year
].reduce(
  (carry, hour) => {
    if (hour <= hoursPassedSinceFirstEntry) {
      return [...carry, hour];
    }

    return carry;
  },
  [1],
);
