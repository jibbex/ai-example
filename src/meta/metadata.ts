const DEFAULT_URL = "https://michm.de";
const DEFAULT_TITLE = "Generative Künstliche Intelligenz";
const DEFAULT_SHARE_IMAGE = "/pixel-vault.png";
const DEFAULT_DESCRIPTION =
    "Generative AI umfasst ein sehr breites Spektrum von möglichen " +
    " Anwendungsfällen wie z.B. die Generation oder das Umformen von Textinhalten" +
    " auf Basis unterschiedlichster Quellen, das Erzeugen von Multimedia Inhalten (Bilder, Videos, Audio)" +
    " wobei die Ausgabe auch äußerst vielfältig sein kann, dem Erkennen von Mustern in Bildern oder Videos." +
    " und noch vielen mehr. ";

const DEFAULT_KEYWORDS: string[] = [
    "Generative Künstliche Intelligenz", 
    "AI", 
    "GPT", 
    "Stable Diffusion", 
    "Maschinelles Lernen", 
    "Modelle", 
    "Techniken", 
    "Chancen",
    "Gefahren",
];

/**
 * Represents the metadata properties associated with a web page or application.
 *
 * @typedef {Object} MetadataProps
 * @property {string} description - A textual description or summary.
 * @property {string} theme-color - The color theme associated with the content.
 * @property {string} og:site_name - The name of the website or application.
 * @property {string} og:type - The type of content (e.g., article, video).
 * @property {string} og:title - The title or headline of the content.
 * @property {string} og:description - A concise summary.
 * @property {string} og:url - The canonical URL.
 * @property {string} og:image - An associated image.
 * @property {string} twitter:title - Title for Twitter sharing.
 * @property {string} twitter:description - Description for Twitter sharing.
 * @property {string} twitter:card - Card type for Twitter.
 * @property {string} twitter:url - URL for Twitter sharing.
 * @property {string} twitter:image - Image for Twitter sharing.
 */
interface MetadataProps {
    description: string;
    "theme-color": string;
    "og:site_name": string;
    "og:type": string;
    "og:title": string;
    "og:description": string;
    "og:url": string;
    "og:image": string;
    "twitter:title": string;
    "twitter:description": string;
    "twitter:card": string;
    "twitter:url": string;
    "twitter:image": string;
}

/**
 * Represents the default metadata properties for a web page or application.
 *
 * @typedef {Object} MetadataProps
 * @property {string} description - A textual description or summary.
 * @property {string} theme-color - The color theme associated with the content.
 * @property {string} og:site_name - The name of the website or application.
 * @property {string} og:type - The type of content (e.g., article, video).
 * @property {string} og:title - The title or headline of the content.
 * @property {string} og:description - A concise summary.
 * @property {string} og:url - The canonical URL.
 * @property {string} og:image - An associated image.
 * @property {string} twitter:title - Title for Twitter sharing.
 * @property {string} twitter:description - Description for Twitter sharing.
 * @property {string} twitter:card - Card type for Twitter.
 * @property {string} twitter:url - URL for Twitter sharing.
 * @property {string} twitter:image - Image for Twitter sharing.
 */
const defaultMetadataValues: MetadataProps = {
    description: DEFAULT_DESCRIPTION,
    "theme-color": "#16324e",
    "og:site_name": DEFAULT_TITLE,
    "og:type": "website",
    "og:title": DEFAULT_TITLE,
    "og:description": DEFAULT_DESCRIPTION,
    "og:url": DEFAULT_URL,
    "og:image": DEFAULT_SHARE_IMAGE,
    "twitter:title": DEFAULT_TITLE,
    "twitter:description": DEFAULT_DESCRIPTION,
    "twitter:card": "summary_large_image",
    "twitter:url": DEFAULT_URL,
    "twitter:image": DEFAULT_SHARE_IMAGE
}

export type { MetadataProps };
export { 
    defaultMetadataValues, 
    DEFAULT_URL, 
    DEFAULT_TITLE, 
    DEFAULT_SHARE_IMAGE, 
    DEFAULT_DESCRIPTION,
    DEFAULT_KEYWORDS
};
