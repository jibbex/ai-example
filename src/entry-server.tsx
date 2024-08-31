import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { HydrationProvider } from "./contexts/HydrationContext";
import { Head } from './meta/Head';
import { LandingPage } from "./page/LandingPage";
import { 
    DEFAULT_TITLE, 
    DEFAULT_DESCRIPTION, 
    DEFAULT_KEYWORDS,
    DEFAULT_SHARE_IMAGE
} from "./meta/metadata";

import './index.css';
import "./App.css";

const render = () => renderToString(
    <HydrationProvider>
        <Head 
            title={DEFAULT_TITLE} 
            description={DEFAULT_DESCRIPTION} 
            keywords={DEFAULT_KEYWORDS}  
            shareImage={DEFAULT_SHARE_IMAGE}
        />
        <LandingPage />
    </HydrationProvider>
);

const renderStatic = () => renderToStaticMarkup(
    <HydrationProvider>
        <Head
            title={DEFAULT_TITLE}
            description={DEFAULT_DESCRIPTION}
            keywords={DEFAULT_KEYWORDS}
            shareImage={DEFAULT_SHARE_IMAGE}
        />
        <LandingPage />
    </HydrationProvider>
);

export { render, renderStatic };