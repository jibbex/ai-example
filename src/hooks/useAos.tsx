import * as React from 'react';
import { HydrationContext } from '@/contexts/HydrationContext';
import Aos, { AosOptions } from 'aos';

/**
 * Custom hook to initialize and manage AOS (Animate On Scroll) library in a React component.
 * @returns {Aos.Aos | undefined} The initialized AOS instance.
 */
export default function useAos(options?: AosOptions ): Aos.Aos | undefined {
    const [aos, setAos] = React.useState<Aos.Aos|undefined>();
    const isHydrated = React.useContext(HydrationContext);

    React.useEffect(() => {
        if (isHydrated) {
            setAos(inst => {
                inst = Aos;
                return { ...inst };
            });
        }
    }, [isHydrated]);

    aos?.init(options);

    return aos;
}