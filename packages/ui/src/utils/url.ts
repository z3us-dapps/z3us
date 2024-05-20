/**
 * Check if a given URL is an external URL by testing if it starts with "http://" or "https://".
 *
 * @param {string} href - The URL to check.
 * @returns {boolean} True if the URL is external, false if it's not.
 */
export const isExternalHref = (href: string) => /(http(s?)):\/\//i.test(href)
