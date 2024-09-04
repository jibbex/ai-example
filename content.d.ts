import { easingOptions, anchorPlacementOptions } from "aos";

enum TYPE {
    Img = 0,
    Div = 1,
    Lnk = 2,
    Paragraph = 3,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    EM,
    Span,
    Audio,
    WebGl,
    Iframe,
}

export enum LINK_TYPE {
    Img = 0,
    Div = 1,
    Lnk = 2,
}

declare interface ContentElementType {
    type: TYPE;
    key?: string;
    style?: object | undefined;
    className?: string | undefined;
}
/**
 * This interface represents attributes that can be used with AOS animations.
 * The attributes include properties like data-aos, data-aos-easing, data-aos-anchor-placement, and others.
 */
declare interface AosAttrs {
    "data-aos"?: string;
    "data-aos-easing"?: easingOptions;
    "data-aos-anchor-placement"?: anchorPlacementOptions;
    "data-aos-anchor"?: string;
    "data-aos-delay"?: number;
    "data-aos-offset"?: number;
    "data-aos-duration"?: number;
    "data-aos-mirror"?: boolean;
}
/**
 * This interface defines an animation configuration for AOS.
 * It includes properties like animationName, easing, placement, anchor, delay, offset, and mirror.
 * The getDataAttrs method returns an array of attribute-value pairs.
 */
declare interface AosAnimation {
    animationName: string;
    easing?: easingOptions | undefined;
    placement?: anchorPlacementOptions | undefined;
    anchor?: string | undefined;
    delay?: number | undefined;
    offset?: number | undefined;
    mirror?: boolean | undefined;
    getDataAttrs: () => Array<
        [string, string | easingOptions | anchorPlacementOptions | number | boolean]
    >;
}
/**
 * This type represents the possible types for an element (e.g., string, object, Container, boolean, etc.).
 */
declare type ElPropTypes =
    | string
    | object
    | undefined
    | (typeof Container)[]
    | boolean
    | number
    | anchorPlacementOptions
    | easingOptions;
/**
 * This interface defines an element with AOS attributes.
 * It includes properties like type, style, className, src, alt, and content.
 */
declare type ContentElement = AosAttrs & ContentElementType & {
    content?: string | (typeof Container)[];
};
/**
 * This interface represents a container of elements.
 * It has a style property and an array of elements.
 */
declare interface Container {
    style?: object | undefined;
    className?: string;
    key?: string;
    elements: (ContentElement | Image | Audio | WebGl)[];
}
/**
 * This type represents a text element.
 */
declare type TextEl = string;
/**
 * This interface defines a link with properties like type, url, ariaLabel, and content.
 */
declare interface Link<T> {
    type: LINK_TYPE;
    content: T;
    url?: string;
    key?: string;
    ariaLabel?: string;
}
/**
 * These types represent images, body content, and footer content, respectively.
 */
type Image = AosAttrs & ContentElementType & {
    src: string;
    alt: string;
};

type Audio = AosAttrs & ContentElementType & {
    src: string;
};

type WebGl = AosAttrs & ContentElementType & {
    src: string;
    depthSrc: string;
    xTreshold: number,
    yTreshold: number,
    size: {
        width: number,
        height: number,
    };
}

type Ifeame = AosAttrs & ContentElementType & {
    src: string;
}

type Body = Container[];

type Footer = Array<Array<Image | Link<Image> | Link<TextEl> | ContentElement>>;

export {
    TYPE,
    ContentElement,
};

export type {
    AosAnimation,
    Animation,
    AosAttrs,
    Container,
    Image,
    ContentElementType,
    ElProps,
    Audio,
    WebGl,
    TextEl,
    Link,
    Body,
    Footer,
};
