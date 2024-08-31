/**
 * Represents the metadata properties for a web page or application.
 *
 * @typedef {Object} HeadProps
 * @property {string} title - The title of the content.
 * @property {string} description - A textual description or summary.
 * @property {string[]} keywords - An array of keywords associated with the content.
 * @property {string} shareImage - The URL of the image used for sharing.
 */
export interface HeadProps {
    title: string,
    description: string,
    keywords: string[],
    shareImage: string,
}