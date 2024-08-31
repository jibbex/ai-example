import { cn } from '@/lib/utils';
import { Image, Link, TYPE, Footer as FooterContent, ContentElement } from '../../../content';
import './css/Footer.css';

interface FooterProps {
    content: FooterContent,
}

const classNth1 = 'flex flex-col items-center justify-start mx-2 gap-2';
const classes = 'flex items-end justify-end mb-0 mr-8 mt-14';

function getElementType(element: Image | ContentElement | Link<Image> | Link<string>): string {
    const numType = (element as Link<Image>).type as number;
    switch (numType) {
        case 0: return 'Link<Image>';
        case 1: return 'ContentElement';
        case 2: return 'Link<string>';
        default: return 'ContentElement';
    }
}

function getContainerElement(element: ContentElement) {
    const Div = (): JSX.Element => (
        <div { ...{ ...(delete element.key && element), content: undefined, type: undefined } }>
            {element.content}
        </div>
    );

    const P = (): JSX.Element => (
        <p { ...{ ...(delete element.key && element), content: undefined, type: undefined } }>
            {element.content}
        </p>
    )

    const Span = (): JSX.Element => (
        <span { ...{ ...(delete element.key && element), content: undefined, type: undefined } }>
            {element.content}
        </span>
    )

    switch (element.type) {
        case TYPE.Div: return <Div />;
        case TYPE.Paragraph: return <P />;
        case TYPE.Span: return <Span />;
    }
}

const toImg = (item: Image | ContentElement |  Link<Image>) => ((item as Link<Image>).content as Image);
const toStr = (item: Image | ContentElement | Link<Image> | Link<string>) => ((item as Link<string>).content as unknown as string);
const id = (seed: number) => Math.floor(Math.random() * new Date().getTime() + seed);
function Footer(props: FooterProps): JSX.Element {    
    return (
        <footer>
            {props.content.map((elems, key) => (
                <div className={cn(
                        key === 0 ? classNth1 : classes,
                        'flex flex-end'
                    )} 
                    key={id(key)}
                >
                    {elems.map((el, elkey) => {
                        let item;
                        const typeName = getElementType(el as (Image & ContentElement & Link<Image> & Link<string>));
                        switch (typeName) {
                            case 'Link<Image>': 
                                item = el as Link<Image>;
                                return (
                                    <a key={item.key} href={item.url} >
                                        <img className={cn(toImg(item).className, 'size-24 sm:size-32 md:size-46')} src={toImg(item).src} alt={toImg(item).alt} />
                                    </a>
                                );
                            case 'Link<string>': {
                                item = el as Link<string>;
                                const hasSeperator = elkey < elems.length -1;
                                return (
                                    <div className='m-0' key={item.key}>
                                        <a className={cn('m-0', hasSeperator ? 'mr-2' : 'ml-2')} href={item.url}>
                                            {toStr(item)}
                                        </a>
                                        {hasSeperator && "| "}
                                    </div>
                                );
                            }
                            case 'Image':
                                item = el as Image;
                                return <img key={item.key} className='fill-slate-300' src={item.src} alt={item.alt} />
                            default: 
                                item = el as ContentElement;
                                return <div key={item.key}>{getContainerElement(item)}</div>;
                        }
                    })}
                </div>
            ))}
        </footer>
    );
}

export type { FooterProps };
export { Footer };