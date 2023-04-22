/**
 * Format a date string with a given delimiter
 * @param {string} date - The date string to be formatted
 * @param {string} [delimiter="-"] - The delimiter to use between date parts
 * @returns {string} - The formatted date string
 */
export function formatDate(date: string, delimiter: string = '-'): string {
  return date.split(delimiter).map(patchZero).join(delimiter);
}

/**
 * Add a leading zero to a number if it is less than 10
 * @param {string} str - The string to pad with a zero
 * @returns {string} - The original string with a leading zero if necessary
 */
export function patchZero(str: string): string {
  return +str < 10 ? `0${str}` : str;
}
