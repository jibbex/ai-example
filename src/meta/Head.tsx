import { Helmet } from "react-helmet";
import { HeadProps } from "./HeadProps";
import { defaultMetadataValues } from './metadata';

/**
 * Renders the head section of the HTML document with metadata.
 *
 * @param {HeadProps} props - The metadata properties.
 * @returns {JSX.Element} - The rendered head section.
 */
function Head(props: HeadProps) {
    const IconScriptCss = (key: string, val: string, type: string) => 
        (key === 'icon' 
            ? <link rel="icon" type={type} href={val} data-react-helmet="true" />
            : key === 'style' ? <style type={type} data-react-helmet="true">{val}</style>
            : <script type={type} data-react-helmet="true">{val}</script>
        );

    const meta = {
        ...defaultMetadataValues,
        "og:site_name": props.title,
        "twitter:title": props.title,
        "og:title": props.title,
        "og:description": props.description,
        "twitter:description": props.description,
        "og:image": props.shareImage,
        "twitter:image": props.shareImage,
    };


    return (
        <Helmet>
            <title>{props.title}</title>
            <meta name="keywords" property={props.keywords.join(', ')} data-react-helmet="true" />
            {Object.entries(meta).map(([key, val], idx) => {
                if (key.startsWith("og:") || key.startsWith('twitter')) {
                    return <meta key={idx} property={key} content={val} data-react-helmet="true" />;
                } else if (!key.startsWith('icon') && !key.startsWith('style') && !key.startsWith('script')) {
                    return <meta key={idx} name={key} content={val} data-react-helmet="true" />;
                }

                return IconScriptCss(key, val, { icon: 'image/svg+xml', style: 'text/css', script: 'module' }[key] as string)
            })}
        </Helmet>
    );
}

export { Head };