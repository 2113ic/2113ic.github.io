import config from '@/config'

/**
 * Format a date string with a given delimiter
 * @param {string} date - The date string to be formatted
 * @param {string} [delimiter="-"] - The delimiter to use between date parts
 */
export function formatDate(date: string, delimiter?: string) {
  delimiter = delimiter || config.blogs.dateDelimiter
  return date.split(delimiter).map(patchZero).join(delimiter)
}

/**
 * Add a leading zero to a number if it is less than 10
 * @param {string} str - The string to pad with a zero
 */
export function patchZero(str: string) {
  return +str < 10 ? `0${str}` : str
}
