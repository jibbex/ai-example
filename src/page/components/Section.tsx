import * as React from 'react';
import { SectionProps } from './SectionProps';
import {ContentElement, TYPE } from '@/../content';
import { AosAttrs, Image, Audio } from '@/../content.d';
const getIndex = (arr: Array<React.Key>) => arr.length === 0 ? 0 : arr.length - 1;
/**
 * Maps to the passed element Type to the corresponding JSX 
 * ContentElementement and passes the Props according to it.
 * 
 * @date 2024-03-03
 * @param {ContentElement| Image } element
 * @returns { JSX.Element }
 */
function ElementMapper({element, index}: React.PropsWithRef<{element: ContentElement, index: number}>): JSX.Element {
    const el = element as ContentElement;
    const keys: Array<React.Key> = [];
    const hasChildren = !!el?.content && typeof el.content !== 'string';
    let children: JSX.Element[] = [];

    index++;

    if (hasChildren) {
        children = [ ...(el.content as Array<ContentElement>).map(
            (child, idx) => <ElementMapper key={idx} element={child as ContentElement} index={index + idx} />
        ) ];
    }

    switch (el.type) {
        case TYPE.H1: 
            return <h1 data-index={(keys[getIndex(keys)] = el.key ?? '')} { ...(delete el.key && el as AosAttrs) } className={el.className} style={el.style}>{el.content}</h1>;
        case TYPE.H2: 
            return <h2 data-index={(keys[getIndex(keys)] = el.key ?? '')} { ...(delete el.key && el as AosAttrs) } className={el.className} style={el.style}>{el.content}</h2>;
        case TYPE.H3: 
            return <h3 data-index={(keys[getIndex(keys)] = el.key ?? '')} { ...(delete el.key && el as AosAttrs) } className={el.className} style={el.style}>{el.content}</h3>;
        case TYPE.H4: 
            return <h4 data-index={(keys[getIndex(keys)] = el.key ?? '')} { ...(delete el.key && el as AosAttrs) } className={el.className} style={el.style}>{el.content}</h4>;
        case TYPE.H5: 
            return <h5 data-index={(keys[getIndex(keys)] = el.key ?? '')} { ...(delete el.key && el as AosAttrs) } className={el.className} style={el.style}>{el.content}</h5>;
        case TYPE.H6: 
            return <h6 data-index={(keys[getIndex(keys)] = el.key ?? '')}  { ...(delete el.key && el as AosAttrs) } className={el.className} style={el.style}>{el.content}</h6>;
        case TYPE.Div: 
            return <div data-index={(keys[getIndex(keys)] = el.key ?? '')}  { ...(delete el.key && el as AosAttrs) } className={el.className} style={el.style}>{children !== undefined ? children : el.content}</div>;
        case TYPE.Img:
            return <img data-index={(keys[getIndex(keys)] = el.key ?? '')}  { ...(delete el.key && el as AosAttrs) } className={el.className} src={(el as Image).src as string} alt={(el as Image).alt as string} style={el.style}/>
        case TYPE.Audio:
            return <audio data-index={(keys[getIndex(keys)] = el.key ?? '')}  { ...(delete el.key && el as AosAttrs) } className={el.className} src={(el as Audio).src as string} controls={true} style={el.style}/>;
        case TYPE.Iframe:
            return <iframe data-index={(keys[getIndex(keys)] = el.key ?? '')}  { ...(delete el.key && el as AosAttrs) } className={el.className} src={(el as Image).src as string} style={el.style}/>;
        case TYPE.Span:
        default:
            return <span data-index={(keys[getIndex(keys)] = el.key ?? '')} { ...(delete el.key && el as AosAttrs) } className={el.className}  style={el.style}>{el?.content}</span>;
    }
}

/**
 * Renders a Section Component based on the data contained in 
 * the Container object and returns it.
 * 
 * @date 2024-03-03
 * @param { SectionProps } parm1
 */
const Section = ({ id, content }: SectionProps) => {
    return (
        <section id={id} style={content.style} className={content.className}>
            {content.elements.map((el, idx) => <ElementMapper key={el.key} data-index={el.key} element={el as ContentElement} index={idx} />)}
        </section>
    );
};

export { Section, ElementMapper };