export default {
  // arbitrary limitation to limit the field size automatically based on
  // max-property of input[type="number"]
  MAX_RATE_PER_HOUR: 200_000_000,

  // game limitation
  MAX_MINES: 35_000,

  /**
   * Calculates the price of the next mine based on the current amount of
   * existing mines and the mine base price
   *
   * @param {number} totalMineAmount
   * @param {number} basePrice
   */
  calcPriceOfNextMine: (totalMineAmount, basePrice) =>
    Math.round(basePrice * (1 + totalMineAmount / 50)),
};
