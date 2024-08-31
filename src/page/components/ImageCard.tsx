import {ContentElement, TYPE } from "@/../content";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import React from "react";

export interface ImageCardProps {
    src: string;
    alt: string;
    style?: object;
    className?: string;
    key?: string;
    type: TYPE;
    content?: string | ContentElement | null
}

/**
 * This component represents an image card with content.
 *
 * @param {ImageCardProps} props - The properties of the image card.
 * @returns {React.JSX.Element} The image card component.
 */
export function ImageCard({ src, alt, style, className, key, type, content }: ImageCardProps): React.JSX.Element {
    const element = React.useMemo(() => {
        switch (type) {
            case TYPE.Img:
                return (
                    <img
                        key={key}
                        src={src}
                        alt={alt}
                        style={style}
                        className={className}
                    />
                );
            case TYPE.Div:
                return (
                    <div
                        key={key}
                        style={style}
                        className={className}
                    >
                        {!!content && (content as ContentElement).content}
                    </div>
                );
            case TYPE.Lnk:
                return (
                    <a
                        key={key}
                        href={src}
                        style={style}
                        className={className}
                    >
                        {!!content && (content as ContentElement).content}
                    </a>
                );
            default:
                return <></>;
        }
    }, [src, alt, key, type]);
    return (
        <CardContainer className='left-0 md:left-[25vw] md:bottom-[-3em] lg:bottom-3'>
            <CardBody
                className="bg-gradient-to-br from-gray-100/20 via-red-400/100 to-indigo-900/60 backdrop-blur-sm relative group/card hover:shadow-2xl dark:bg-black border-white/[0.6] min-w-[600px] w-full sm:w-[30rem] h-auto rounded-2xl p-0 border">
                <CardItem
                    translateZ="40"
                    style={style}
                >
                    {element}
                </CardItem>
            </CardBody>
        </CardContainer>
    );
}