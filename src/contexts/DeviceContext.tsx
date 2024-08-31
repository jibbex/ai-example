import * as React from 'react';
/**
 * Represents the type of device context.
 */
declare interface DeviceContextType {
    isMobile: boolean;
    isDesktop: boolean;
}
/**
 * Context for managing device information (mobile/desktop).
 */
const DeviceContext = React.createContext({isMobile: false, isDesktop: false} as DeviceContextType);
/**
 * Provider component for managing device context.
 * @param {React.PropsWithChildren} props - Component props.
 * @returns {JSX.Element} The device provider component.
 */
function DeviceProvider({ children }: React.PropsWithChildren): JSX.Element {
    const [device, setDevice] = React.useState<DeviceContextType>({isMobile: false, isDesktop: false});

    React.useEffect(() => {
        if (!device.isDesktop && !device.isMobile) {
            const mobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setDevice(() => ({
                isMobile: mobile,
                isDesktop: !mobile,
            }));
        }
    }, [device]);

    return (
        <DeviceContext.Provider value={device}>
            {children}
        </DeviceContext.Provider>
    );
}

export { DeviceProvider, DeviceContext };