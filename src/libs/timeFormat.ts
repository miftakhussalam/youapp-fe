/**
 * Convert ISO date string to DD/MM/YYYY
 * Handles undefined, null, or invalid input
 * @param dateString ISO string e.g. "2000-12-11T17:00:00.000Z"
 * @returns string in "DD/MM/YYYY" format or empty string if invalid
 */
export const formatToDDMMYYYY = (dateString?: string | null): string => {
  if (!dateString) return ''; // handle undefined or null

  const date: Date = new Date(dateString);
  if (isNaN(date.getTime())) return ''; // invalid date

  const day: number = date.getUTCDate();
  const month: number = date.getUTCMonth() + 1;
  const year: number = date.getUTCFullYear();

  const dd: string = day < 10 ? `0${day}` : `${day}`;
  const mm: string = month < 10 ? `0${month}` : `${month}`;

  return `${dd}/${mm}/${year}`;
}
