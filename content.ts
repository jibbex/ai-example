import githubIcon from "@/assets/github_badge.svg";

import "/content.css";

import {
    TYPE,
    Container,
    TextEl,
    Image,
    Body,
    Footer,
    LINK_TYPE,
    ContentElement,
    ContentElementType,
} from "./content.d";

let index = -1;
const generateKey = (seed: number) => Math.floor(Math.random() * new Date().getTime() + seed)

class Link<T> implements Link<T> {
    type: LINK_TYPE;
    url?: string | undefined;
    ariaLabel?: string | undefined;
    content: Image | ContentElement;
    readonly key: string;

    constructor(element: ContentElementType) {
        const _types = {
            passed: element.type as number,
            validate: (t: LINK_TYPE): boolean => _types.passed === t as number,
        }

        if (!(_types.validate(LINK_TYPE.Img) && _types.validate(LINK_TYPE.Lnk))) {
            throw new Error(
                "type T has to be one of Image|ContentElement.type.Div|ContentElement.type.Lnk"
            );
        }

        this.key = generateKey(++index).toString(16);

        this.type = _types.validate(LINK_TYPE.Img) ? LINK_TYPE.Img : LINK_TYPE.Lnk;
        this.content = _types.validate(LINK_TYPE.Img) 
            ? (element as Image) 
            : (element as ContentElement);
    }
}

function typeToStr(type: TYPE): string {
    switch (type) {
        case TYPE.Paragraph:
            return "p";
        case TYPE.Span:
            return "span";
        case TYPE.EM:
            return "em";
        case TYPE.H1:
            return "h1";
        case TYPE.H2:
            return "h2";
        case TYPE.H3:
            return "h3";
        case TYPE.H4:
            return "h4";
        case TYPE.H5:
            return "h5";
        case TYPE.H6:
            return "h6";
        case TYPE.Div:
            return "div";
        case TYPE.Img:
            return "img";
        case TYPE.Lnk:
            return "a";
    }
}

const textStyle = {
    with: "100%",
    fontWeigh: "500",
    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
    opacity: "0.4",
    display: "block",
    left: "auto",
    padding: "1em 0",
};

const body: Body = [
    {
        key: generateKey(++index).toString(16),
        style: {
            zIndex: 10,
            backgroundImage:
                "linear-gradient(320deg, rgba(103, 30, 117, 1) 11.2%, rgba(252, 76, 2, 1) 91.1%)",
            boxShadow: "0 0 12em rgba(0, 0, 0, 0.45)",
            rotate: "2deg",
            top: "-5lvh",
            height: "60lvh",
            width: "110vw",
            left: "-5vw",
        },
        elements: [
            {
                type: TYPE.H2,
                key: generateKey(++index).toString(16),
                content: "Natural Language Processing",
                "data-aos": "zoom-out-up",
                "data-aos-delay": 0,
                "data-aos-offset": 0,
                "data-aos-anchor-placement": "bottom-bottom",
                className: "txt",
                style: {
                    fontWeight: 500,
                    bottom: 'auto',
                    position: 'relative',
                    margin: '2em auto 0 2em',
                    marginTop: '0',
                    left: 'auto',
                    color: "transparent",
                    backgroundClip: "text",
                    pointerEvents: "none",
                    textAlign: "left",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    backgroundImage:
                        "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)",
                },
            }, 
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "GPT-Modelle (generative pre-trained transformer) gehören zu den Large Language Models (LLM) und wurden von OpenAI entwickelt. Sie sind so konzipiert, dass sie auf der Grundlage der Eingaben, die sie erhalten, einen menschlich ähnlichen Text erzeugen können. Hierbei wird eine Wahrscheinlichkeit auf Basis der zuvor generierten Wörter, der Eingabe und zusätzlich definierbaren Parameter berechnet um das Nächste zu erahnen. Dieses vorgehen kann hochwertigen Text erzeugen, wenn der Eingabe-Prompt akkurat und auch Aussagen zur Form der gewünschten Ausgabe erhält.",
                "data-aos-delay": 0,
                "data-aos": "fade-right",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    fonsSize: "0.5em !important",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "Öfter lässt sich allerdings auch eine Ausgabe ohne viel Aufwand als KI generiert identifizieren. Anhaltspunkte sind z.B. eine starke Häufung an Wortwiederholungen. Gerade das Angefragte Subjekt wird annährend in jeden Satz wiederholt, und Standard-Phrasen, die häufig von den Modellen erzeugt werden lassen sich auch leicht erkennen. Mit einem entsprechend trainierten Modell, ließe sich auch ein erkennendes System automatisieren. Das würde exakt auf die gleiche Technik zurückgreifen.",
                "data-aos-delay": 0,
                "data-aos": "fade-right",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "Neben den GPT Modellen gibt es auch noch andere Modelle, die auf ähnlichen Prinzipien basieren. Einige davon sind auch Open Source und können von jedem genutzt werden. Unter anderem erwähnenswert ist Mistral von Mistral AI, Claude von Antrophic und auch llama von Ollama. Diese Modelle sind alle auf GitHub und Hugging Face verfügbar und können von jedem genutzt werden.",
                "data-aos-delay": 0,
                "data-aos": "fade-left",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
            
        ],
    },
    {
        key: generateKey(++index).toString(16),
        style: {
            zIndex: 10,
            backgroundImage:
                "linear-gradient(14deg, rgb(252, 76, 2) 11.2%, rgb(103, 30, 117) 91.1%)",
            boxShadow: "0 0 12em rgba(0, 0, 0, 0.45)",
            rotate: "2deg",
            top: "-5lvh",
            height: "60lvh",
            width: "110vw",
            left: "-5vw",
        },
        elements: [
            {
                type: TYPE.H2,
                key: generateKey(++index).toString(16),
                content: "LLM's",
                "data-aos": "zoom-out-up",
                "data-aos-delay": 0,
                "data-aos-offset": 0,
                "data-aos-anchor-placement": "bottom-bottom",
                className: "txt",
                style: {
                    wuth: "100%",
                    flex: '1 1 100%',
                    fontWeight: 500,
                    bottom: 'auto',
                    position: 'relative',
                    margin: '2em auto 0 2em',
                    marginTop: '0',
                    left: 'auto',
                    color: "transparent",
                    backgroundClip: "text",
                    pointerEvents: "none",
                    textAlign: "left",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    backgroundImage:
                        "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)",
                },
            }, 
            {
                type: TYPE.Img,
                key: generateKey(++index).toString(16),
                src: "/bots2.png",
                alt: "Some annoyed looking bots.",
                "data-aos": "zoom-in-down",
                "data-aos-delay": 0,
                className: "self-start radius-[2em]",
            },
            {
                type: TYPE.Img,
                key: generateKey(++index).toString(16),
                alt: "The Pixel Vault",
                "data-aos": "zoom-out-up",
                "data-aos-delay": 300,
                className: "self-end radius-[2em]",
                src: "/pixel-vault.jpg",
            },
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "Typischerweise werden LLM's für Textgenerierung, Textklassifikation, Textübersetzung, Feature-Extraktion, Zusammenfassungen und Textverständnis verwendet. Einige der bekanntesten Anwendungen sind Chatbots, Sprachassistenten, automatische Übersetzungsdienste und Textanalyse-Tools. LLM's können auch für die Erstellung von Inhalten wie Blog-Posts, Produktbeschreibungen und Nachrichtenartikeln verwendet werden.",
                "data-aos-delay": 0,
                "data-aos": "fade-right",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    fonsSize: "0.5em !important",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
        ],
    },
    {
        className: "",
        key: generateKey(++index).toString(16),
        style: {
            flexWrap: "wrap",
            gap: "2em",
            boxShadow: "box-shadow: 0 0 12em rgba(0 0 0 / 45%)",
        },
        elements: [
            {
                type: TYPE.H2,
                key: generateKey(++index).toString(16),
                "data-aos": "zoom-out-up",
                "data-aos-anchor-placement": "center-center",
                className: "txt",
                style: {
                    display: "block",
                    fontWeight: 500,
                    bottom: 'auto',
                    position: 'relative',
                    flex: '1 1 100%',
                    margin: '2em auto 0 2em',
                    marginTop: '0',
                    left: 'auto',
                    color: "transparent",
                    backgroundClip: "text",
                    textAlign: "left",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    backgroundImage:
                        "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)",
                },
                content:
                    "Computer Vision",
            },
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "Computer Vision ist ein Bereich der künstlichen Intelligenz, der sich mit der Entwicklung von Algorithmen und Technologien befasst, die Computern das Sehen und Verstehen von Bildern und Videos ermöglichen. Computer Vision-Systeme können Objekte, Personen, Orte, Aktivitäten und andere visuelle Elemente in Bildern und Videos erkennen, klassifizieren und verarbeiten. Diese Systeme werden in einer Vielzahl von Anwendungen eingesetzt, darunter Gesichtserkennung, Objekterkennung, Bilderkennung, medizinische Bildgebung, autonome Fahrzeuge und Robotik.",
                "data-aos-delay": 0,
                "data-aos": "fade-right",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    fonsSize: "0.5em !important",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "So lassen sich beispielsweise aus Bildern und Videos eine Tiefenschätzung ableiten und daraus 3D-Modelle generieren. Um ein 3D-Modell aus den generierten Daten abzuleiten beötigt man das Ursprungsbild und die sogenannte Depth Map. Beide Bilder kann man dann mithilfe eines Algorithmuses, der in einen Shader rechnet zu einem 3D-Modell zusammenfügen. Ein Shader ist ein Programm, das auf der Grafikkarte ausgeführt wird und die Berechnungen für die Darstellung von 3D-Objekten übernimmt.",
                "data-aos-delay": 0,
                "data-aos": "fade-right",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    fonsSize: "0.5em !important",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
        ],
    },
    {
        key: generateKey(++index).toString(16),
        style: {
            backgroundImage:
                "linear-gradient(14deg, rgb(252, 76, 2) 11.2%, rgb(103, 30, 117) 91.1%)",
            boxShadow: "0 0 12em rgba(0, 0, 0, 0.45)",
            rotate: "2deg",
            top: "-5lvh",
            height: "60lvh",
            width: "110vw",
            left: "-5vw",
        },
        elements: [
            {
                type: TYPE.H2,
                key: generateKey(++index).toString(16),
                "data-aos": "zoom-out-up",
                "data-aos-anchor-placement": "center-center",
                className: "txt",
                style: {
                    display: "block",
                    fontWeight: 500,
                    bottom: 'auto',
                    position: 'relative',
                    flex: '1 1 100%',
                    margin: '2em auto 0 2em',
                    marginTop: '0',
                    left: 'auto',
                    color: "transparent",
                    backgroundClip: "text",
                    textAlign: "left",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    backgroundImage:
                        "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)",
                },
                content:
                    "Audio Processing",
            },
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "Audio Processing ist ein Bereich der künstlichen Intelligenz, der sich mit der Entwicklung von Algorithmen und Technologien befasst, die Computern das Verstehen und Verarbeiten von Audio ermöglichen. Audio Processing-Systeme können Sprache, Musik, Geräusche und andere akustische Signale erkennen, klassifizieren und verarbeiten. Diese Systeme werden in einer Vielzahl von Anwendungen eingesetzt, darunter Spracherkennung, Musikerkennung, Geräuschunterdrückung, Audioanalyse und Sprachsynthese.",
                "data-aos-delay": 0,
                "data-aos": "fade-right",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    fonsSize: "0.5em !important",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
            {
                type: TYPE.Paragraph,
                key: generateKey(++index).toString(16),
                content: "",
                "data-aos-delay": 0,
                "data-aos": "fade-right",
                "data-aos-anchor-placement": "bottom-bottom",
                className: "text-6xl md:text-8xl lg:text-10xl",
                style: {
                    ...textStyle,
                    color: "currentColor",
                    backgroundClip: "text",
                    position: 'relative',
                    fonsSize: "0.5em !important",
                    filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
                    textShadow: "0.1em -0.1em 0.4em #450b0ac4",
                },
            },
        ],
    }
];

const footer: Footer = [
    [
        {
            key: generateKey(++index).toString(16),
            type: LINK_TYPE.Img,
            url: "https://github.com/jibbex",
            content: {
                className: 'hover:opacity-100 opacity-40 fill-slate-400 footer-ico',
                src: githubIcon,
                alt: "Github",
            } as Image
        },
        {
            type: TYPE.Paragraph,
            key: generateKey(++index).toString(16),
            className: "w-1/2 p-2 text-center text-sm md:text-lg ml-[20vw]",
            content: "Contribute to 🛡️ Vault Boy and be a part of this open-source journey."
        },
    ],
    [
        {
            key: generateKey(++index).toString(16),
            type: LINK_TYPE.Lnk,
            url: "/privacy",
            content: "Privacy Policy",
        },
        {
            key: generateKey(++index).toString(16),
            type: LINK_TYPE.Lnk,
            url: "/legal",
            content: "Legal Notice",
        },
        // {
        //     type: TYPE.Lnk,
        //     url: "/register",
        //     content: "Register Account",
        // },
        // {
        //     type: TYPE.Lnk,
        //     content: "Login In",
        //     url: "/login",
        // },
    ],
];

export type { Body, Footer, Container, Image, ContentElement, TextEl };

export {typeToStr, footer, body, TYPE, type Link, LINK_TYPE};
