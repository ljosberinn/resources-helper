export default {
  /**
   * Calculates the cost of a single upgrade
   *
   * @param {number} targetLevel
   */
  calcUpgradeCostToLevel: targetLevel =>
    125_000 * (targetLevel > 1 ? targetLevel - 1 : targetLevel) ** 2,

  /**
   * Calculates the total cost of a warehouse upgrade from level A to level B
   *
   * @param {number} start
   * @param {number} end
   */
  calcUpgradeCostFromLevelTolevel: (start, end) =>
    [...new Array(end - start)].reduce(
      (carry, _, index) => (carry += 125_000 * (start + index) ** 2),
      0,
    ),

  /**
   *
   * @param {number} level
   */
  calcContingentAtLevel: level => 5_000 * level ** 2,
};
