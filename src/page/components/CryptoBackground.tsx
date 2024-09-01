import { MouseEvent, TouchEvent } from "react";
import * as React from "react";
import { HydrationContext } from "../../contexts/HydrationContext";
import { DeviceContext } from "@/contexts/DeviceContext";
import proxyImage from "../../assets/proxy.jpg";
import "./css/crypto.css";
import {ImageCard} from "@/page/components/ImageCard.tsx";
import {TYPE} from "../../../content";
/**
 * Constants for animation and circular movement.
 *
 * @constant {number} CHAR_UPDATE_TIME - The interval for updating the characters in milliseconds.
 * @constant {number} THIRTY_FPS - The interval for 30 frames per second in milliseconds.
 * @constant {number} STEPS - The number of steps for smooth movement.
 * @constant {number} CIRCLE_RADIUS - The radius of the circular movement in pixels.
 * @constant {number} CIRCLE_UPDATE_INTERVAL - The interval for updating the circular movement in milliseconds.
 // * @constant {Function} RNG_NUM - A function that returns a random number between a given range.
 */
const CHAR_UPDATE_TIME: number = 4;
const THIRTY_FPS: number = 1000 / 30;
const STEPS: number = 32;
const CIRCLE_RADIUS: number = 100;
const CIRCLE_UPDATE_INTERVAL: number = THIRTY_FPS;
// const RNG_NUM = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
/**
 * Represents a combined TouchEvent or MouseEvent.
 */
declare type MoveEvent = MouseEvent | TouchEvent;
/**
 * The TouchMouseEvent class combines both MouseEvent and TouchEvent events.
 * It provides properties to determine whether the event is a mouse event or
 * a touch event, as well as access to client coordinates (X and Y). The
 * constructor accepts an event object* (either MouseEvent or TouchEvent).
 * If the event type is not one of the e xpected types, an error is thrown.
 * This class can be useful for handling input events in a unified manner
 * across different input devices.
 */
class TouchMouseEvent<T> {
    type: string;
    event: T;
    /**
     * Creates a new TouchMouseEvent instance.
     * @param {T} event - The event object (either MouseEvent or TouchEvent).
     */
    constructor(event: T) {
        this.typeCheck(event as UIEvent);
        this.type = (event as UIEvent).type;
        this.event = event;
    }
    /**
     * Checks if the event is a MouseEvent.
     * @returns {boolean} - True if it's a MouseEvent, false otherwise.
     */
    get isMouseEvent(): boolean {
        return this.type === "mousemove";
    }
    /**
     * Checks if the event is a TouchEvent.
     * @returns {boolean} - True if it's a TouchEvent, false otherwise.
     */
    get isTouchEvent(): boolean {
        return !this.isMouseEvent;
    }
    /**
     * Gets the client X coordinate.
     * @returns {number} - The X coordinate.
     */
    get clientX(): number {
        if (this.isMouseEvent) {
            return (this.event as MouseEvent).clientX;
        }

        return (this.event as TouchEvent).touches[0].clientX;
    }
    /**
     * Gets the client Y coordinate.
     * @returns {number} - The Y coordinate.
     */
    get clientY(): number {
        if (this.isMouseEvent) {
            return (this.event as MouseEvent).clientY;
        }

        return (this.event as TouchEvent).touches[0].clientY;
    }
    static isMoving: (type: string) => boolean = (type) => type === "mousemove";
    static isTouching: (type: string) => boolean = (type) =>
        // Touchend produces an exception, because touches[0] can be `null`.
        // Every item in the TouchList represents on touch point on the
        // display. The `touchend` event is triggered, when the user
        // removes the touch point from the surface. It is possible,
        // that multiple touch points on the same time are active.
        //
        // Read: https://w3c.github.io/touch-events/#event-touchend
        type === "touchstart" || type === "touchmove"; // || type === 'touchend'
    /**
     * Validates the event type.
     * @param {UIEvent} evt - The event object.
     */
    private typeCheck(evt: UIEvent) {
        if (
            !TouchMouseEvent.isMoving(evt.type) &&
            !TouchMouseEvent.isTouching(evt.type)
        ) {
            throw new Error("expecting mousemove|touchmove|touchstart event");
        }
    }
}

/**
 * The current id of requested animation frame.
 */
let animationId: number | null = null;
/**
 * Represents the size of an object in pixels.
 */
interface Size {
    height: number;
    width: number;
}
/**
 * A constant that defines the size of a character in pixels.
 *
 * @type {Size}
 */
const CHAR_SIZE: Size = {
    height: 7.5,
    width: 15,
};
/**
 * A constant string of characters available for random selection.
 *
 * @type {string}
 */
const CHARS: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
/**
 * Returns a random character from a string of characters. This implementation has
 * approximately the same probability of choosing the last character as any other
 * character before it. The rounding to the next lower value still prevents an out 
 * of range error. With a simple subtraction by 1, the last character is not choosen 
 * ~99.99% of the time.
 *
 * @returns {string} A random character from the string.
 */
const randomChar = (): string =>
    CHARS[Math.floor(Math.random() * (CHARS.length - 0.0001))];
/**
 * Returns a random string of a given length from a string of a predefined selection of characters.
 * The `number` based `FOR` loop in combination with a spatial initialized Array and the assigment
 * of a random character should be the fastest possible implementation for almost every Browser.
 *
 * @param {number} len - The length of the random string.
 * @returns {string} A random string of the given length.
 */
function randomString(len: number): string {
    const arr: Array<string> = new Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = randomChar();
    }

    return arr.join("");
}
/**
 * A React component that renders a card with random characters that follow the mouse or touch movement.
 *
 * @returns {React.JSX.Element} The Crypto component.
 */
function Crypto(): React.JSX.Element {
    const device = React.useContext(DeviceContext);
    const hydrated = React.useContext(HydrationContext);
    const [isMouseMoving, setIsMouseMoving] = React.useState<boolean>(false);
    const angleRef = React.useRef<number>(0);
    const intervalIdRef = React.useRef<number | null>(null);
    const idleTimeoutRef = React.useRef<number | null>(null);

    /**
     * Reference to container element.
     */
    const cardRef: React.RefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null);
    /**
     * Reference to character container element.
     */
    const lettersRef: React.RefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null);
    /**
     * State of current window size
     */
    const [size, setSize] = React.useState<Size>({
        width: hydrated ? window.innerWidth : 1920,
        height: hydrated ? window.innerHeight : 951,
    });
    /**
     * Stores the number of characters probably required.
     * Is only recalculated if the size of the window changes.
     */
    const charCount = React.useMemo(
        (): number =>
            Math.ceil(
                (size.width / CHAR_SIZE.width) * (size.height * 1.1 / CHAR_SIZE.height)
            ),
        [size]
    );
    /**
     * Updates the circular movement of the characters.
     */
    const updateCircularMovement = React.useCallback(() => {
        if (lettersRef.current) {
            animationId = requestAnimationFrame(() => {
                if (lettersRef.current !== null) {
                    // Determine the direction with the most visible area
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    const centerX = windowWidth / 2;
                    const centerY = windowHeight / 2;
                    // Get the current position of the character container
                    const currentX = parseFloat(lettersRef.current.style.getPropertyValue("--x") || "0");
                    const currentY = parseFloat(lettersRef.current.style.getPropertyValue("--y") || "0");
                    // Calculate the new position based on the current angle
                    const newX = currentX + CIRCLE_RADIUS * Math.cos(angleRef.current);
                    const newY = currentY + CIRCLE_RADIUS * Math.sin(angleRef.current);


                    // console.log(centerX, centerY);
                    const deltaX = newX - centerX;
                    const deltaY = newY - centerY;

                    // Adjust the angle to move towards the direction with the most visible area
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        angleRef.current += deltaX > 0 && deltaX < windowWidth ? -0.1 : 0.1;
                    } else {
                        angleRef.current += deltaY > 0 && deltaY < windowHeight ? -0.1 : 0.1;
                    }

                    lettersRef.current.style.setProperty("--x", `${newX}px`);
                    lettersRef.current.style.setProperty("--y", `${newY}px`);
                    lettersRef?.current.style.setProperty("opacity", "0.3");
                    lettersRef.current.textContent = randomString(charCount);
                }

                angleRef.current += 0.1;
                animationId = null;
            });
        }
    }, [lettersRef, angleRef, charCount]);
    /**
     * Starts the circular movement of the characters.
     */
    const startCircularMovement = React.useCallback(() => {
        // setTimeout(() => stopCircularMovement(), RNG_NUM(20000, 45000));
        if (intervalIdRef.current === null) {
            intervalIdRef.current = setInterval(updateCircularMovement,
                CIRCLE_UPDATE_INTERVAL) as unknown as number;
        }
    }, [intervalIdRef, updateCircularMovement]);
    /**
     * Stops the circular movement of the characters.
     */
    const stopCircularMovement = React.useCallback(() => {
        // setTimeout(() => startCircularMovement(), RNG_NUM(150, 250));
        if (intervalIdRef.current !== null) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }, [intervalIdRef]);

    /**
     * Calculates and sets the position of the masking radial gradiant and
     * updates the random string. Avoids unnecessary updates by performing
     * calculations and UI updates only when a new frame is required.
     *
     * Mouse handling differs from touch handling.
     *
     * - Mouse:     Is straight forward. The event clientX and clientY properties
     *              from left and top of the parents element bounding rect.
     * - Touch:     Current coordinates and time is determined. After initialization
     *              frames are requested recursively until the final position is reached
     *              or a maximum duration has passed. The callback fuction updates
     *              the initial values with the sum of current + STEPS.
     */
    const handleMouseMove = React.useCallback(
        (event: MoveEvent) => {
            let start: number;
            let mStart: number;
            let prevTime: number;
            if (idleTimeoutRef.current !== null) {
                clearTimeout(idleTimeoutRef.current);
                idleTimeoutRef.current = null;
            }
            idleTimeoutRef.current = setTimeout(() => {
                startCircularMovement();
                setIsMouseMoving(false);
            }, 75) as unknown as number;

            setIsMouseMoving(true);
            stopCircularMovement();

            const timeInit = (time: number) => {
                if (start === undefined) {
                    start = time;
                    mStart = time;
                }
            };
            if (hydrated && animationId === null) {
                try {
                    const e = new TouchMouseEvent(event);
                    const moveHighLight = (x: number, y: number, time: number) => {
                        if (lettersRef.current) {
                            const elapsed: number = time - mStart;
                            lettersRef.current.style.setProperty("--x", `${x}px`);
                            lettersRef.current.style.setProperty("--y", `${y}px`);

                            if (device.isDesktop || CHAR_UPDATE_TIME < elapsed) {
                                mStart = time;
                                lettersRef.current.innerHTML = randomString(charCount);
                            }
                        }

                        animationId = null;
                    };

                    if (e.clientX === undefined || e.clientY === undefined) {
                        return;
                    }

                    if (device.isDesktop && e.isMouseEvent) {
                        animationId = requestAnimationFrame((time) => {
                            const rect = cardRef.current?.getBoundingClientRect();
                            const x = e.clientX - (rect?.left ?? 0);
                            const y = e.clientY - (rect?.top ?? 0);
                            moveHighLight(x, y, time);
                        });
                    } else {
                        const rect = cardRef.current?.getBoundingClientRect();
                        const targetPos = {
                            x: e.clientX - (rect?.left ?? 0),
                            y: e.clientY - (rect?.top ?? 0),
                        };

                        const pos = {
                            x: lettersRef.current?.style.getPropertyValue("--x"),
                            y: lettersRef.current?.style.getPropertyValue("--y"),
                        };

                        let x = parseFloat(pos.x ?? "0") ?? 0;
                        let y = parseFloat(pos.y ?? "0") ?? 0;

                        const smoothMove = (time: number) => {
                            timeInit(time);

                            const elapsed: number = time - start;

                            if (prevTime !== time) {
                                x += targetPos.x < x ? STEPS * -1 : STEPS;
                                y += targetPos.y < y ? STEPS * -1 : STEPS;

                                if (x && y) {
                                    moveHighLight(x, y, time);
                                }
                            }

                            if (elapsed < 100) {
                                prevTime = time;
                                if (x !== targetPos.x || y !== targetPos.y) {
                                    animationId = requestAnimationFrame(smoothMove);
                                }

                                animationId = null;
                            }
                        };

                        animationId = requestAnimationFrame(smoothMove);
                    }
                } catch (error) {
                    console.warn((error as Error).message);
                }

            }
        },
        [charCount, device, hydrated]
    );
    /**
     * Binds an event listener to the window object on mount and removes it on dispose.
     * The listener that updates the size status is called when a resize event is triggered.
     */
    React.useEffect(() => {
        if (hydrated) {
            const handleResize = () => {
                setSize(() => ({
                        width: window.innerWidth,
                        height: window.innerHeight,
                    })
                );
            };

            window.addEventListener("resize", handleResize, { passive: true });
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [setSize, hydrated]);
    /**
     * Sets the initial state
     */
    React.useEffect(() => {
        if (
            hydrated &&
            lettersRef.current &&
            device.isMobile &&
            !lettersRef.current.style.opacity
        ) {
            lettersRef.current.style.setProperty("--x", "0px");
            lettersRef.current.style.setProperty("--y", "0px");
            lettersRef.current.style.setProperty("opacity", "0.3");
            lettersRef.current.textContent = randomString(charCount);
        }
    }, [lettersRef, charCount, hydrated, device.isMobile, isMouseMoving]);

    return (
        <div className="card-track">
            <div className="card-wrapper">
                <div
                    ref={cardRef}
                    onTouchStart={handleMouseMove}
                    onTouchEnd={handleMouseMove}
                    onTouchMove={handleMouseMove}
                    onMouseMove={handleMouseMove}
                    className="card"
                >
                    {/*<div className="card-image right-[5vw] bottom-[5lvh] size-[70%] transform-gpu rotate-[2deg] skew-y-1 translate-y-[-2em]">*/}
                        {/*<img*/}
                        {/*    className={"card-image"}*/}
                        {/*    style={{ top: "-3em", borderRadius: "1em", zIndex: 10, right: "2vw" }}*/}
                        {/*    src={proxyImage}*/}

                        {/*    alt="AI generated Image" />*/}
                    <div
                        className="z-20 bottom-2 absolute"
                        data-aos="zoom-in-left"
                        data-aos-mirror={true}
                        data-aos-offset={550}
                        data-aos-duration={700}
                        data-aos-delay={800}
                        data-aos-anchor-placement="bottom-bottom"
                        data-aos-anchor="#vault-title"
                    >
                        <ImageCard 
                            className="image-vault" 
                            src={proxyImage} 
                            alt="AI generated Image" 
                            type={TYPE.Img} 
                            content="Entstand bei einer Erläuterung welche Aufgabe ein Reverse Proxy erfüllt."
                        />
                    </div>
                    <div ref={lettersRef} className="card-letters"></div>
                </div>
            </div>
        </div>
    );
}

export default Crypto;
