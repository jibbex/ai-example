import Hero from "./components/Hero";
import { body, footer } from "./../../content";
import Navbar from "@/Navbar";
import { DeviceProvider } from "@/contexts/DeviceContext";
import { AosProvider } from "@/contexts/AosContext";
import { Section } from "@/page/components/Section";
import { Footer } from "@/page/components/Footer";
import './css/LandingPage.css';
import React from "react";
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
        timerRef.current = setInterval(nextSection, interval ?? 5000) as unknown as number;
        // const debounced = (debounce as DebounceFunction)(handleWheelEvent.bind(this), 1000);
        window.addEventListener('wheel',  handleWheelEvent.bind(this), { passive: false });
        return () => {
            clearInterval(timerRef.current);
            window.removeEventListener('wheel', handleWheelEvent);
        };
    },
    [sectionRef, interval, nextSection, prevSection, timerRef, handleWheelEvent]);

    return (
        <AosProvider>
            <DeviceProvider>
                <main className="section--bg relative z-[1] shadow-md">
                    <Navbar></Navbar>
                    <Hero title="Generative AI" />
                    {body.map((content, key) => (<Section id={`section--${key}`} key={key} content={content} />))}
                    <ClipSvg />
                    <Footer content={footer} />
                </main>
            </DeviceProvider>
        </AosProvider>
    );
}
