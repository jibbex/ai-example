import Hero from "./components/Hero";
import { body, footer } from "./../../content";
import { DeviceProvider } from "@/contexts/DeviceContext";
import { AosProvider } from "@/contexts/AosContext";
import { Section } from "@/page/components/Section";
import { Footer } from "@/page/components/Footer";
import { Button } from "@/components/ui/button";
import './css/LandingPage.css';
import React from "react";

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='currentColor' className='size-6'>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='currentColor' className='size-6'>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clipRule="evenodd" />
    </svg>
);

/**
 * SVG component for clipping paths.
 * @returns {JSX.Element} The SVG element.
 */
const ClipSvg = (): JSX.Element => (
    <svg width={0} height={0}>
        <defs />
        <g>
            <clipPath id="svgPath">
                <path
                    id="rect1"
                    style={{ opacity: 1, vectorEffect: 'none', fill: 'transparent', fillRule: 'evenodd', strokeWidth: 1.28465, strokeDasharray: 5695.12, stopColor: '#000000', stopOpacity: 1 }}
                    d="M 2.0469091,2.0469081 -2.0469076,571.08744 Z" />
                <path
                    id="path1"
                    style={{ opacity: 1, vectorEffect: 'none', fill: '#ffffff', fillRule: 'evenodd', strokeWidth: 1.28465, strokeDasharray: 5695.12, stopColor: '#000000', stopOpacity: 1 }}
                    d="M 285,-2.1556503e-7 1922.047,2.0469081 1920,1080 800.50158,1077.9531 C 658.92274,974.85075 717.37261,699.89763 475.90623,489.21111 234.43985,278.52458 -159.70464,49.790476 8.187634,-16.375247 92.766804,-49.707585 285,-2.1556503e-7 285,-2.1556503e-7 Z" />
            </clipPath>
        </g>
    </svg>
);

export interface LandingPageProps {
    interval: number;
}

const WHEEL_TRIGGER_DELAY = 0x1F4;

/**
 * Landing page component with AOS (Animate On Scroll) integration.
 * @param {LandingPageProps} props - The properties for the landing page component.
 * @returns {React.JSX.Element} The landing page component.
 */
export function LandingPage({ interval }: LandingPageProps): React.JSX.Element {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const sectionRef: React.MutableRefObject<number> = React.useRef(0);
    const timerRef: React.MutableRefObject<number> = React.useRef(0);
    const lastScrollRef = React.useRef(0);
    const nextSection = React.useCallback(() => {
        const sections = document.querySelectorAll('main section');
        if (sectionRef.current < sections.length - 1) {
            sectionRef.current++;
        } else {
            sectionRef.current = 0;
        }
        
        sections.item(sectionRef.current).scrollIntoView({ behavior: 'smooth' });
    }, [sectionRef]);
    const prevSection = React.useCallback(() => {
        const sections = document.querySelectorAll('main section');
        if (sectionRef.current > 0) {
            sectionRef.current--;

        } else {
            sectionRef.current = sections.length - 1;
        }
    
        sections.item(sectionRef.current).scrollIntoView({ behavior: 'smooth' });
    }, [sectionRef]);
    const handleWheelEvent = React.useCallback((ev: WheelEvent) => {
        ev.preventDefault();
        if (ev.timeStamp - lastScrollRef.current < WHEEL_TRIGGER_DELAY) {
            return;
        }
        lastScrollRef.current = ev.timeStamp;
        clearInterval(timerRef.current);
        if (ev.deltaY > 0) {
            nextSection();
        } else {
            prevSection();
        }
    }, [nextSection, prevSection, lastScrollRef]);
    /**
     * Effect hook to scroll through sections at a specified interval.
     *
     * This hook sets up a timer that scrolls through all sections within the main element.
     * When the end of the sections is reached, it resets the scroll position to the first section.
     *
     * @param {React.MutableRefObject<number>} sectionRef - Reference to the current section index.
     * @param {number} interval - The interval in milliseconds for scrolling to the next section.
     */
    React.useEffect(function (this: unknown) {
        if (!isPlaying) {
            return;
        }

        timerRef.current = setInterval(nextSection, interval ?? 5000) as unknown as number;
        // window.addEventListener('wheel',  handleWheelEvent.bind(this), { passive: false });
        return () => {
            clearInterval(timerRef.current);
            window.removeEventListener('wheel', handleWheelEvent);
        };
    },
    [sectionRef, interval, nextSection, prevSection, timerRef, handleWheelEvent, isPlaying]);


    return (
        <AosProvider>
            <DeviceProvider>
                <main className="section--bg relative z-[1] shadow-md">
                    <Hero title="Generative AI" />
                    <nav className="sticky top-0 z-[1300] left-[90%] inline-block">
                        <Button onClick={() => setIsPlaying(active => !active)} size="icon" variant="default" className="border-white/[0.4] rounded-full focus:ring-2 ring-yellow-200 text-black hover:shadow-sm shadow-xl hover:backdrop-blur-lg m-4">
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </Button>
                    </nav>
                    {body.map((content, key) => (<Section id={`section--${key}`} key={key} content={content} />))}
                    <ClipSvg />
                    <Footer content={footer} />
                </main>
            </DeviceProvider>
        </AosProvider>
    );
}
