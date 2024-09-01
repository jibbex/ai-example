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

interface ImageItemProps {
    src?: string | null;
    alt?: string | null;
    style?: object | null;
    className?: string | null;
    key?: string | null;
    type: TYPE;
    content?: string | ContentElement | null
}

function ImageItem({src, alt, style, className, key, type, content}: ImageItemProps): React.JSX.Element {
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
                    {!!content && (content as string)}
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
                    {!!content && (content as string)}
                </a>
            );
        default:
            return <></>;
    }
}

/**
 * This component represents an image card with content.
 *
 * @param {ImageCardProps} props - The properties of the image card.
 * @returns {React.JSX.Element} The image card component.
 */
export function ImageCard({ src, alt, style, className, key, type, content }: ImageCardProps): React.JSX.Element {
    return (
        <CardContainer className='left-0 md:left-[25vw] md:bottom-[-3em] lg:bottom-4'>
            <CardBody
                className="bg-gradient-to-br from-gray-100/20 via-red-400/50 to-indigo-900/20 backdrop-blur-xl relative group/card hover:shadow-2xl border-white/[0.6] min-w-[600px] w-full sm:w-[30rem] h-auto rounded-2xl p-0 border">
                <CardItem
                    translateY="-10"
                    translateZ="-20"
                    rotateZ={-4}
                    style={style}
                >
                    <ImageItem
                        src={src}
                        alt={alt}
                        style={style}
                        className={className}
                        key={key}
                        type={type}
                        content={content}
                    />
                </CardItem>
                {!!content && 
                    <CardItem
                        translateZ="30"
                        translateY="-5"
                        rotateZ={2}
                        className="p-6 bg-black/20 rounded-md my-2 mx-auto"
                        style={{ with: 'calc(100% - 0.5rem)' }}
                    >
                        <ImageItem 
                            type={TYPE.Div}
                            content={content}
                            key={`${key}--content`}
                        />
                    </CardItem>
                }
            </CardBody>
        </CardContainer>
    );
}