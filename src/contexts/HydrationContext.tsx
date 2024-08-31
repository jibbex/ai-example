import * as React from 'react';

const HydrationContext = React.createContext(false);

function HydrationProvider({ children }: React.PropsWithChildren): React.JSX.Element {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <HydrationContext.Provider value={hydrated}>
            {children}
        </HydrationContext.Provider>
    );
}

export { HydrationProvider, HydrationContext };