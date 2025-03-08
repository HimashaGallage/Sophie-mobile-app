/**
 * Truncate a string to a specified length and append ellipsis if truncated.
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the string.
 * @returns The truncated string.
 */
export const truncateString = (str: string, maxLength: number): string => {
     if (str.length > maxLength) {
         return `${str.substring(0, maxLength)}...`;
     }
     return str;
 };