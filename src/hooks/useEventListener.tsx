import * as React from 'react';

/**
 * Interface definition for a listener object.
 */
export interface Listener {
    type: string;
    instance: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
}

/**
 * Interface for the EventListener context.
 *
 * @interface IEventListenerContext
 * @property {Function} addEventListener - Function to add an event listener.
 * @property {Function} removeEventListener - Function to remove an event listener.
 */
interface IEventListenerContext {
    addEventListener: (listener: Listener) => void;
    removeEventListener: (listener: Listener) => void;
}

/**
 * React context for managing event listeners.
 *
 * @constant {React.Context<IEventListenerContext>} EventListenerContext
 */
export const EventListenerContext = React.createContext<IEventListenerContext>({
    addEventListener: () => console.error('EventListener not initialized'),
    removeEventListener: () => console.error('EventListener not initialized'),
} as IEventListenerContext);

/**
 * Props for the EventListenerProvider component.
 *
 * @interface EventListenerProviderProps
 * @property {React.ReactNode} children - The child components to be wrapped by the provider.
 */
export interface EventListenerProviderProps {
    children: React.ReactNode;
}

/**
 * EventListenerProvider component to provide event listener management via context.
 *
 * @param {EventListenerProviderProps} props - The props for the component.
 * @returns {React.JSX.Element} The provider component.
 */
export const EventListenerProvider = ({children}: EventListenerProviderProps): React.JSX.Element => {
    const [listeners, setListeners] = React.useState<Record<string, Listener>>({} as Record<string, Listener>);

    /**
     * Adds an event listener to the state.
     *
     * @param {Listener} listener - The listener to be added.
     */
    const addEventListener = React.useCallback((listener: Listener) => {
        if (listeners[listener.type]) {
            console.warn(`Listener for event type ${listener.type} already exists`);
            return;
        }

        setListeners((prevListeners) => ({
            ...prevListeners,
            listener,
        }));
    }, [listeners]);

    /**
     * Removes an event listener from the state.
     *
     * @param {Listener} listener - The listener to be removed.
     */
    const removeEventListener = React.useCallback((listener: Listener) => {
        listeners[listener.type] && setListeners((prevListeners) => {
            delete prevListeners[listener.type];
            return {...prevListeners};
        });
    }, [listeners]);

    /**
     * Effect to add and remove event listeners on the window object.
     */
    React.useEffect(() => {
        Object.entries(listeners).forEach(([type, listener]) => {
            window.addEventListener(type, listener.instance, listener.options);
        });

        return () => {
            Object.entries(listeners).forEach(([type, listener]) => {
                window.removeEventListener(type, listener.instance);
            });
        };
    }, [listeners]);

    const providerValue = React.useMemo(
        () => ({addEventListener, removeEventListener}), [
            addEventListener,
            removeEventListener
        ]
    );

    return (
        <EventListenerContext.Provider value={providerValue}>
            {children}
        </EventListenerContext.Provider>
    );
};

/**
 * Custom hook to use the EventListener context.
 *
 * @returns {IEventListenerContext} The EventListener context.
 */
export const useEventListener = (): IEventListenerContext => React.useContext(EventListenerContext);