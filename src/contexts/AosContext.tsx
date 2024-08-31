import * as React from 'react';
import useAos from '@/hooks/useAos';
import '/node_modules/aos/dist/aos.css';
/**
 * Creates a context for managing the AOS (Animate On Scroll) instance.
 * @type {React.Context<Aos.Aos | null>}
 */
const AosContext = React.createContext<Aos.Aos|null>(null);
/**
 * A provider component that initializes and manages the AOS library in a React application.
 * @param {Object} props - Component props.
 * @param {AosOptions} props.options - Optional AOS configuration options.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} The AOS provider component.
 */
function AosProvider({ 
    children 
}: React.PropsWithChildren): JSX.Element {
    const aos = useAos({
        easing: 'ease-out-back',
        duration: 1000,
        mirror: true,
    });

    return (
        <AosContext.Provider value={aos ?? null}>
            {children}
        </AosContext.Provider>
    );
}

export { AosContext, AosProvider };