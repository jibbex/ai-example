"use strict";
exports.__esModule = true;
var React = require("react");
var HydrationContext_1 = require("../../contexts/HydrationContext");
var DeviceContext_1 = require("@/contexts/DeviceContext");
var proxy_jpg_1 = require("../../assets/proxy.jpg");
require("./css/crypto.css");
var ImageCard_tsx_1 = require("@/page/components/ImageCard.tsx");
var content_1 = require("../../../content");
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
var CHAR_UPDATE_TIME = 4;
var THIRTY_FPS = 1000 / 30;
var STEPS = 32;
var CIRCLE_RADIUS = 100;
var CIRCLE_UPDATE_INTERVAL = THIRTY_FPS;
/**
 * The TouchMouseEvent class combines both MouseEvent and TouchEvent events.
 * It provides properties to determine whether the event is a mouse event or
 * a touch event, as well as access to client coordinates (X and Y). The
 * constructor accepts an event object* (either MouseEvent or TouchEvent).
 * If the event type is not one of the e xpected types, an error is thrown.
 * This class can be useful for handling input events in a unified manner
 * across different input devices.
 */
var TouchMouseEvent = /** @class */ (function () {
    /**
     * Creates a new TouchMouseEvent instance.
     * @param {T} event - The event object (either MouseEvent or TouchEvent).
     */
    function TouchMouseEvent(event) {
        this.typeCheck(event);
        this.type = event.type;
        this.event = event;
    }
    Object.defineProperty(TouchMouseEvent.prototype, "isMouseEvent", {
        /**
         * Checks if the event is a MouseEvent.
         * @returns {boolean} - True if it's a MouseEvent, false otherwise.
         */
        get: function () {
            return this.type === "mousemove";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchMouseEvent.prototype, "isTouchEvent", {
        /**
         * Checks if the event is a TouchEvent.
         * @returns {boolean} - True if it's a TouchEvent, false otherwise.
         */
        get: function () {
            return !this.isMouseEvent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchMouseEvent.prototype, "clientX", {
        /**
         * Gets the client X coordinate.
         * @returns {number} - The X coordinate.
         */
        get: function () {
            if (this.isMouseEvent) {
                return this.event.clientX;
            }
            return this.event.touches[0].clientX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchMouseEvent.prototype, "clientY", {
        /**
         * Gets the client Y coordinate.
         * @returns {number} - The Y coordinate.
         */
        get: function () {
            if (this.isMouseEvent) {
                return this.event.clientY;
            }
            return this.event.touches[0].clientY;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Validates the event type.
     * @param {UIEvent} evt - The event object.
     */
    TouchMouseEvent.prototype.typeCheck = function (evt) {
        if (!TouchMouseEvent.isMoving(evt.type) &&
            !TouchMouseEvent.isTouching(evt.type)) {
            throw new Error("expecting mousemove|touchmove|touchstart event");
        }
    };
    TouchMouseEvent.isMoving = function (type) { return type === "mousemove"; };
    TouchMouseEvent.isTouching = function (type) {
        // Touchend produces an exception, because touches[0] can be `null`.
        // Every item in the TouchList represents on touch point on the
        // display. The `touchend` event is triggered, when the user
        // removes the touch point from the surface. It is possible,
        // that multiple touch points on the same time are active.
        //
        // Read: https://w3c.github.io/touch-events/#event-touchend
        return type === "touchstart" || type === "touchmove";
    }; // || type === 'touchend'
    return TouchMouseEvent;
}());
/**
 * The current id of requested animation frame.
 */
var animationId = null;
/**
 * A constant that defines the size of a character in pixels.
 *
 * @type {Size}
 */
var CHAR_SIZE = {
    height: 7.5,
    width: 15
};
/**
 * A constant string of characters available for random selection.
 *
 * @type {string}
 */
var CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
/**
 * Returns a random character from a string of characters. This implementation has
 * approximately the same probability of choosing the last character as any other
 * character before it. The rounding to the next lower value still prevents an out
 * of range error. With a simple subtraction by 1, the last character is not choosen
 * ~99.99% of the time.
 *
 * @returns {string} A random character from the string.
 */
var randomChar = function () {
    return CHARS[Math.floor(Math.random() * (CHARS.length - 0.0001))];
};
/**
 * Returns a random string of a given length from a string of a predefined selection of characters.
 * The `number` based `FOR` loop in combination with a spatial initialized Array and the assigment
 * of a random character should be the fastest possible implementation for almost every Browser.
 *
 * @param {number} len - The length of the random string.
 * @returns {string} A random string of the given length.
 */
function randomString(len) {
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
        arr[i] = randomChar();
    }
    return arr.join("");
}
/**
 * A React component that renders a card with random characters that follow the mouse or touch movement.
 *
 * @returns {React.JSX.Element} The Crypto component.
 */
function Crypto() {
    var device = React.useContext(DeviceContext_1.DeviceContext);
    var hydrated = React.useContext(HydrationContext_1.HydrationContext);
    var _a = React.useState(false), isMouseMoving = _a[0], setIsMouseMoving = _a[1];
    var angleRef = React.useRef(0);
    var intervalIdRef = React.useRef(null);
    var idleTimeoutRef = React.useRef(null);
    /**
     * Reference to container element.
     */
    var cardRef = React.useRef(null);
    /**
     * Reference to character container element.
     */
    var lettersRef = React.useRef(null);
    /**
     * State of current window size
     */
    var _b = React.useState({
        width: hydrated ? window.innerWidth : 1920,
        height: hydrated ? window.innerHeight : 951
    }), size = _b[0], setSize = _b[1];
    /**
     * Stores the number of characters probably required.
     * Is only recalculated if the size of the window changes.
     */
    var charCount = React.useMemo(function () {
        return Math.ceil((size.width / CHAR_SIZE.width) * (size.height * 1.1 / CHAR_SIZE.height));
    }, [size]);
    /**
     * Updates the circular movement of the characters.
     */
    var updateCircularMovement = React.useCallback(function () {
        if (lettersRef.current) {
            animationId = requestAnimationFrame(function () {
                if (lettersRef.current !== null) {
                    // Determine the direction with the most visible area
                    var windowWidth = window.innerWidth;
                    var windowHeight = window.innerHeight;
                    var centerX = windowWidth / 2;
                    var centerY = windowHeight / 2;
                    // Get the current position of the character container
                    var currentX = parseFloat(lettersRef.current.style.getPropertyValue("--x") || "0");
                    var currentY = parseFloat(lettersRef.current.style.getPropertyValue("--y") || "0");
                    // Calculate the new position based on the current angle
                    var newX = currentX + CIRCLE_RADIUS * Math.cos(angleRef.current);
                    var newY = currentY + CIRCLE_RADIUS * Math.sin(angleRef.current);
                    // console.log(centerX, centerY);
                    var deltaX = newX - centerX;
                    var deltaY = newY - centerY;
                    // Adjust the angle to move towards the direction with the most visible area
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        angleRef.current += deltaX > 0 && deltaX < windowWidth ? -0.1 : 0.1;
                    }
                    else {
                        angleRef.current += deltaY > 0 && deltaY < windowHeight ? -0.1 : 0.1;
                    }
                    lettersRef.current.style.setProperty("--x", newX + "px");
                    lettersRef.current.style.setProperty("--y", newY + "px");
                    lettersRef === null || lettersRef === void 0 ? void 0 : lettersRef.current.style.setProperty("opacity", "0.3");
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
    var startCircularMovement = React.useCallback(function () {
        // setTimeout(() => stopCircularMovement(), RNG_NUM(20000, 45000));
        if (intervalIdRef.current === null) {
            intervalIdRef.current = setInterval(updateCircularMovement, CIRCLE_UPDATE_INTERVAL);
        }
    }, [intervalIdRef, updateCircularMovement]);
    /**
     * Stops the circular movement of the characters.
     */
    var stopCircularMovement = React.useCallback(function () {
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
    var handleMouseMove = React.useCallback(function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var start;
        var mStart;
        var prevTime;
        if (idleTimeoutRef.current !== null) {
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = null;
        }
        idleTimeoutRef.current = setTimeout(function () {
            startCircularMovement();
            setIsMouseMoving(false);
        }, 75);
        setIsMouseMoving(true);
        stopCircularMovement();
        var timeInit = function (time) {
            if (start === undefined) {
                start = time;
                mStart = time;
            }
        };
        if (hydrated && animationId === null) {
            try {
                var e_1 = new TouchMouseEvent(event);
                var moveHighLight_1 = function (x, y, time) {
                    if (lettersRef.current) {
                        var elapsed = time - mStart;
                        lettersRef.current.style.setProperty("--x", x + "px");
                        lettersRef.current.style.setProperty("--y", y + "px");
                        if (device.isDesktop || CHAR_UPDATE_TIME < elapsed) {
                            mStart = time;
                            lettersRef.current.innerHTML = randomString(charCount);
                        }
                    }
                    animationId = null;
                };
                if (e_1.clientX === undefined || e_1.clientY === undefined) {
                    return;
                }
                if (device.isDesktop && e_1.isMouseEvent) {
                    animationId = requestAnimationFrame(function (time) {
                        var _a, _b, _c;
                        var rect = (_a = cardRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                        var x = e_1.clientX - ((_b = rect === null || rect === void 0 ? void 0 : rect.left) !== null && _b !== void 0 ? _b : 0);
                        var y = e_1.clientY - ((_c = rect === null || rect === void 0 ? void 0 : rect.top) !== null && _c !== void 0 ? _c : 0);
                        moveHighLight_1(x, y, time);
                    });
                }
                else {
                    var rect = (_a = cardRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                    var targetPos_1 = {
                        x: e_1.clientX - ((_b = rect === null || rect === void 0 ? void 0 : rect.left) !== null && _b !== void 0 ? _b : 0),
                        y: e_1.clientY - ((_c = rect === null || rect === void 0 ? void 0 : rect.top) !== null && _c !== void 0 ? _c : 0)
                    };
                    var pos = {
                        x: (_d = lettersRef.current) === null || _d === void 0 ? void 0 : _d.style.getPropertyValue("--x"),
                        y: (_e = lettersRef.current) === null || _e === void 0 ? void 0 : _e.style.getPropertyValue("--y")
                    };
                    var x_1 = (_g = parseFloat((_f = pos.x) !== null && _f !== void 0 ? _f : "0")) !== null && _g !== void 0 ? _g : 0;
                    var y_1 = (_j = parseFloat((_h = pos.y) !== null && _h !== void 0 ? _h : "0")) !== null && _j !== void 0 ? _j : 0;
                    var smoothMove_1 = function (time) {
                        timeInit(time);
                        var elapsed = time - start;
                        if (prevTime !== time) {
                            x_1 += targetPos_1.x < x_1 ? STEPS * -1 : STEPS;
                            y_1 += targetPos_1.y < y_1 ? STEPS * -1 : STEPS;
                            if (x_1 && y_1) {
                                moveHighLight_1(x_1, y_1, time);
                            }
                        }
                        if (elapsed < 100) {
                            prevTime = time;
                            if (x_1 !== targetPos_1.x || y_1 !== targetPos_1.y) {
                                animationId = requestAnimationFrame(smoothMove_1);
                            }
                            animationId = null;
                        }
                    };
                    animationId = requestAnimationFrame(smoothMove_1);
                }
            }
            catch (error) {
                console.warn(error.message);
            }
        }
    }, [charCount, device.isDesktop, hydrated, startCircularMovement, stopCircularMovement]);
    /**
     * Binds an event listener to the window object on mount and removes it on dispose.
     * The listener that updates the size status is called when a resize event is triggered.
     */
    React.useEffect(function () {
        if (hydrated) {
            var handleResize_1 = function () {
                setSize(function () { return ({
                    width: window.innerWidth,
                    height: window.innerHeight
                }); });
            };
            window.addEventListener("resize", handleResize_1, { passive: true });
            return function () { return window.removeEventListener("resize", handleResize_1); };
        }
    }, [setSize, hydrated]);
    /**
     * Sets the initial state
     */
    React.useEffect(function () {
        if (hydrated &&
            lettersRef.current &&
            device.isMobile &&
            !lettersRef.current.style.opacity) {
            lettersRef.current.style.setProperty("--x", "0px");
            lettersRef.current.style.setProperty("--y", "0px");
            lettersRef.current.style.setProperty("opacity", "0.3");
            lettersRef.current.textContent = randomString(charCount);
        }
    }, [lettersRef, charCount, hydrated, device.isMobile, isMouseMoving]);
    return (React.createElement("div", { className: "card-track" },
        React.createElement("div", { className: "card-wrapper" },
            React.createElement("div", { ref: cardRef, onTouchStart: handleMouseMove, onTouchEnd: handleMouseMove, onTouchMove: handleMouseMove, onMouseMove: handleMouseMove, className: "card" },
                React.createElement("div", { className: "z-20 bottom-8 absolute", "data-aos": "zoom-in-left", "data-aos-mirror": true, "data-aos-offset": 0, "data-aos-duration": 700, "data-aos-delay": 800, "data-aos-anchor-placement": "bottom-bottom" },
                    React.createElement(ImageCard_tsx_1.ImageCard, { className: "image-vault", src: proxy_jpg_1["default"], alt: "AI generated Image", type: content_1.TYPE.Img, content: "Entstand bei einer Erl\u00E4uterung welche Aufgabe ein Reverse Proxy erf\u00FCllt." })),
                React.createElement("div", { ref: lettersRef, className: "card-letters" })))));
}
exports["default"] = Crypto;
