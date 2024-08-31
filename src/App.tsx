import { HydrationProvider } from "./contexts/HydrationContext";
import { Head } from './meta/Head';
import { LandingPage } from "./page/LandingPage";
import {
    DEFAULT_TITLE,
    DEFAULT_DESCRIPTION,
    DEFAULT_KEYWORDS,
    DEFAULT_SHARE_IMAGE
} from "./meta/metadata";
import useLocation from "./hooks/useLocation";

import "./App.css";
import React from "react";

const THIRTY_SECONDS = 0x7530;

/**
 * The main application component.
 *
 * @returns {React.JSX.Element} The rendered application component.
 */
function App(): React.JSX.Element {
    const location = useLocation();
    const thirtySec = React.useMemo(() => THIRTY_SECONDS, []);

    return (
        <HydrationProvider>
            <Head
                title={DEFAULT_TITLE}
                description={DEFAULT_DESCRIPTION}
                keywords={DEFAULT_KEYWORDS}
                shareImage={DEFAULT_SHARE_IMAGE}
            />
            <LandingPage interval={thirtySec} />
            {
                !!location && <style>
                    {`
body[data-scroll-locked] {
    margin-right: 0 !important;
}
                    `}
                </style>
            }
        </HydrationProvider>
    );
}

export default App;