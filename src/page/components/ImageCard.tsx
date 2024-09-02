import {ContentElement, TYPE } from "@/../content";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import React from "react";

export interface ImageCardProps {
    src: string;
    alt: string;
    style?: object;
    className?: string;
    type: TYPE;
    content?: string | ContentElement | undefined
}

interface ImageItemProps {
    src?: string | undefined;
    alt?: string | undefined;
    style?: object | undefined;
    className?: string | undefined;
    type: TYPE;
    content?: string | ContentElement | undefined
}

function ImageItem({src, alt, style, className, type, content}: ImageItemProps): React.JSX.Element {
    switch (type) {
        case TYPE.Img:
            return (
                <img
                    src={src}
                    alt={alt}
                    style={style}
                    className={className}
                />
            );
        case TYPE.Div:
            return (
                <div
                    style={style}
                    className={className}
                >
                    {!!content && (content as string)}
                </div>
            );
        case TYPE.Lnk:
            return (
                <a
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
export function ImageCard({ src, alt, style, className, type, content }: ImageCardProps): React.JSX.Element {
    return (
        <CardContainer className='left-0 md:left-[25vw] md:bottom-[8em] lg:bottom-[10em]'>
            <CardBody
                className="bg-gradient-to-br overflow-visible p-6 to-[#671e75] from-[#fc4d02] relative group shadow-lg hover:shadow-2xl border-white/[0.4] border-2 min-w-[500px] w-full sm:w-[30rem] h-auto rounded-2xl">
                <CardItem
                    translateY="-10"
                    translateX="-29"
                    translateZ="100"
                    rotateZ={-4}
                    style={style}
                >
                    <ImageItem
                        src={src}
                        alt={alt}
                        style={style}
                        className={`${className} shadow-lg shadow-slate-800 group-hover:shadow-2xl group-hover:shadow-slate-800`}
                        type={type}
                        content={content}
                    />
                </CardItem>
                {!!content && 
                    <CardItem
                        translateZ="160"
                        translateY="56"
                        translateX="-55"
                        rotateZ={2}
                        className="p-6 bg-black/20 group-hover:bg-black/5 backdrop-blur-xl shadow-md shadow-slate-800/50 group-hover:shadow-2xl group-hover:shadow-slate-800/20  rounded-[2em] m-4"
                        style={{ with: 'calc(100% - 0.5rem)' }}
                    >
                        <ImageItem 
                            type={TYPE.Div}
                            content={content}
                        />
                    </CardItem>
                }
            </CardBody>
        </CardContainer>
    );
}