/**
 * Format number to coin format with commas.
 * @param {number} n
 * @returns {string}
 */
export const formatNumToCoin = (n) => {
  const integer_n = n.toFixed();
  return integer_n.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
