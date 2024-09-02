var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import * as React from "react";
import React__default, { createContext, useRef, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Aos from "aos";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
const HydrationContext = React.createContext(false);
function HydrationProvider({ children }) {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  return /* @__PURE__ */ jsx(HydrationContext.Provider, { value: hydrated, children });
}
const DEFAULT_URL = "https://michm.de";
const DEFAULT_TITLE = "Generative Künstliche Intelligenz";
const DEFAULT_SHARE_IMAGE = "/pixel-vault.png";
const DEFAULT_DESCRIPTION = "Generative AI umfasst ein sehr breites Spektrum von möglichen  Anwendungsfällen wie z.B. die Generation oder das Umformen von Textinhalten auf Basis unterschiedlichster Quellen, das Erzeugen von Multimedia Inhalten (Bilder, Videos, Audio) wobei die Ausgabe auch äußerst vielfältig sein kann, dem Erkennen von Mustern in Bildern oder Videos. und noch vielen mehr. ";
const DEFAULT_KEYWORDS = [
  "Generative Künstliche Intelligenz",
  "AI",
  "GPT",
  "Stable Diffusion",
  "Maschinelles Lernen",
  "Modelle",
  "Techniken",
  "Chancen",
  "Gefahren"
];
const defaultMetadataValues = {
  description: DEFAULT_DESCRIPTION,
  "theme-color": "#16324e",
  "og:site_name": DEFAULT_TITLE,
  "og:type": "website",
  "og:title": DEFAULT_TITLE,
  "og:description": DEFAULT_DESCRIPTION,
  "og:url": DEFAULT_URL,
  "og:image": DEFAULT_SHARE_IMAGE,
  "twitter:title": DEFAULT_TITLE,
  "twitter:description": DEFAULT_DESCRIPTION,
  "twitter:card": "summary_large_image",
  "twitter:url": DEFAULT_URL,
  "twitter:image": DEFAULT_SHARE_IMAGE
};
function Head(props) {
  const IconScriptCss = (key, val, type) => key === "icon" ? /* @__PURE__ */ jsx("link", { rel: "icon", type, href: val, "data-react-helmet": "true" }) : key === "style" ? /* @__PURE__ */ jsx("style", { type, "data-react-helmet": "true", children: val }) : /* @__PURE__ */ jsx("script", { type, "data-react-helmet": "true", children: val });
  const meta = {
    ...defaultMetadataValues,
    "og:site_name": props.title,
    "twitter:title": props.title,
    "og:title": props.title,
    "og:description": props.description,
    "twitter:description": props.description,
    "og:image": props.shareImage,
    "twitter:image": props.shareImage
  };
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: props.title }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", property: props.keywords.join(", "), "data-react-helmet": "true" }),
    Object.entries(meta).map(([key, val], idx) => {
      if (key.startsWith("og:") || key.startsWith("twitter")) {
        return /* @__PURE__ */ jsx("meta", { property: key, content: val, "data-react-helmet": "true" }, idx);
      } else if (!key.startsWith("icon") && !key.startsWith("style") && !key.startsWith("script")) {
        return /* @__PURE__ */ jsx("meta", { name: key, content: val, "data-react-helmet": "true" }, idx);
      }
      return IconScriptCss(key, val, { icon: "image/svg+xml", style: "text/css", script: "module" }[key]);
    })
  ] });
}
const DeviceContext = React.createContext({ isMobile: false, isDesktop: false });
function DeviceProvider({ children }) {
  const [device, setDevice] = React.useState({ isMobile: false, isDesktop: false });
  React.useEffect(() => {
    if (!device.isDesktop && !device.isMobile) {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setDevice(() => ({
        isMobile: mobile,
        isDesktop: !mobile
      }));
    }
  }, [device]);
  return /* @__PURE__ */ jsx(DeviceContext.Provider, { value: device, children });
}
const proxyImage = "/ai-example/assets/proxy-fT_8cQvV.jpg";
const githubIcon = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generated%20by%20IcoMoon.io%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%3e%3cpath%20fill='currentColor'%20d='M16%205.343c-6.196%200-11.219%205.023-11.219%2011.219%200%204.957%203.214%209.162%207.673%2010.645%200.561%200.103%200.766-0.244%200.766-0.54%200-0.267-0.010-1.152-0.016-2.088-3.12%200.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696%200.077-0.682%200.077-0.682%201.126%200.078%201.72%201.156%201.72%201.156%201.001%201.715%202.627%201.219%203.265%200.931%200.102-0.723%200.392-1.219%200.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545%200-1.226%200.438-2.225%201.154-3.011-0.114-0.285-0.501-1.426%200.111-2.97%200%200%200.941-0.301%203.085%201.15%200.894-0.25%201.854-0.373%202.807-0.377%200.953%200.004%201.913%200.129%202.809%200.379%202.14-1.453%203.083-1.15%203.083-1.15%200.613%201.545%200.227%202.685%200.112%202.969%200.719%200.785%201.153%201.785%201.153%203.011%200%204.31-2.624%205.259-5.123%205.537%200.404%200.348%200.761%201.030%200.761%202.076%200%201.5-0.015%202.709-0.015%203.079%200%200.299%200.204%200.648%200.772%200.538%204.455-1.486%207.666-5.69%207.666-10.645%200-6.195-5.023-11.219-11.219-11.219z'%3e%3c/path%3e%3c/svg%3e";
var TYPE = /* @__PURE__ */ ((TYPE2) => {
  TYPE2[TYPE2["Img"] = 0] = "Img";
  TYPE2[TYPE2["Div"] = 1] = "Div";
  TYPE2[TYPE2["Lnk"] = 2] = "Lnk";
  TYPE2[TYPE2["Paragraph"] = 3] = "Paragraph";
  TYPE2[TYPE2["H1"] = 4] = "H1";
  TYPE2[TYPE2["H2"] = 5] = "H2";
  TYPE2[TYPE2["H3"] = 6] = "H3";
  TYPE2[TYPE2["H4"] = 7] = "H4";
  TYPE2[TYPE2["H5"] = 8] = "H5";
  TYPE2[TYPE2["H6"] = 9] = "H6";
  TYPE2[TYPE2["EM"] = 10] = "EM";
  TYPE2[TYPE2["Span"] = 11] = "Span";
  TYPE2[TYPE2["Audio"] = 12] = "Audio";
  return TYPE2;
})(TYPE || {});
var LINK_TYPE = /* @__PURE__ */ ((LINK_TYPE2) => {
  LINK_TYPE2[LINK_TYPE2["Img"] = 0] = "Img";
  LINK_TYPE2[LINK_TYPE2["Div"] = 1] = "Div";
  LINK_TYPE2[LINK_TYPE2["Lnk"] = 2] = "Lnk";
  return LINK_TYPE2;
})(LINK_TYPE || {});
let index = -1;
const generateKey = (seed) => Math.floor(Math.random() * (/* @__PURE__ */ new Date()).getTime() + seed);
const textStyle = {
  with: "100%",
  fontWeigh: "500",
  textShadow: "0.1em -0.1em 0.4em #450b0ac4",
  opacity: "0.4",
  display: "block",
  left: "auto",
  padding: "1em 0"
};
const body = [
  {
    key: generateKey(++index).toString(16),
    style: {
      backgroundImage: "linear-gradient(320deg, rgba(103, 30, 117, 1) 11.2%, rgba(252, 76, 2, 1) 91.1%)",
      boxShadow: "0 0 -4em 12em rgba(0, 0, 0, 0.45)",
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "flex-start",
      marginTop: "-20lvh",
      clipPath: "polygon(0 6%, 100% 0, 100% 105%, 0 100%)",
      zIndex: index + 2
    },
    elements: [
      {
        type: TYPE.H2,
        key: generateKey(++index).toString(16),
        content: "Natural Language Processing",
        "data-aos": "zoom-out-up",
        "data-aos-delay": 1600,
        "data-aos-offset": 0,
        "data-aos-anchor-placement": "bottom-bottom",
        className: "txt",
        style: {
          fontWeight: 500,
          bottom: "auto",
          position: "relative",
          marginTop: "0",
          left: "auto",
          flex: "0",
          color: "transparent",
          backgroundClip: "text",
          pointerEvents: "none",
          textAlign: "center",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          backgroundImage: "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)"
        }
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: "GPT-Modelle (generative pre-trained transformer) gehören zu den Large Language Models (LLM) und wurden von OpenAI entwickelt. Sie sind so konzipiert, dass sie auf der Grundlage der Eingaben, die sie erhalten, einen menschlich ähnlichen Text erzeugen können. Hierbei wird eine Wahrscheinlichkeit auf Basis der zuvor generierten Wörter, der Eingabe und zusätzlich definierbaren Parameter berechnet um das Nächste zu erahnen. Dieses vorgehen kann hochwertigen Text erzeugen, wenn der Eingabe-Prompt akkurat und auch Aussagen zur Form der gewünschten Ausgabe erhält.",
        "data-aos-delay": 0,
        "data-aos": "fade-left",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "text-6xl md:text-8xl lg:text-10xl",
        style: {
          ...textStyle,
          color: "currentColor",
          backgroundClip: "text",
          position: "relative",
          fonsSize: "0.5em !important",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
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
          position: "relative",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
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
          position: "relative",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
      }
    ]
  },
  {
    key: generateKey(++index).toString(16),
    style: {
      backgroundImage: "linear-gradient(14deg, rgb(252, 76, 2) 11.2%, rgb(103, 30, 117) 91.1%)",
      boxShadow: "0 0 12em rgba(0, 0, 0, 0.45)",
      alignItems: "center",
      gap: "2em",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      zindex: index + 2,
      clipPath: "polygon(0 6%, 100% 0, 100% 105%, 0 100%)"
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
          display: "block",
          fontWeight: 500,
          bottom: "auto",
          position: "relative",
          flex: "1 1 100%",
          marginTop: "0",
          left: "auto",
          alignSelf: "flex-start",
          color: "transparent",
          backgroundClip: "text",
          textAlign: "center",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          backgroundImage: "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)"
        }
      },
      {
        type: TYPE.Img,
        key: generateKey(++index).toString(16),
        src: "/bots2.png",
        alt: "Some annoyed looking bots.",
        "data-aos": "zoom-in-down",
        "data-aos-delay": 0,
        className: "self-start radius-[2em]"
      },
      {
        type: TYPE.Img,
        key: generateKey(++index).toString(16),
        alt: "The Pixel Vault",
        "data-aos": "zoom-out-up",
        "data-aos-delay": 300,
        className: "self-end radius-[2em]",
        src: "/pixel-vault.jpg"
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
          position: "relative",
          fonsSize: "0.5em !important",
          margin: "0",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
      }
    ]
  },
  {
    key: generateKey(++index).toString(16),
    style: {
      flexWrap: "wrap",
      gap: "2em",
      boxShadow: "box-shadow: 0 0 12em rgba(0 0 0 / 45%)",
      backgroundImage: "linear-gradient(138deg, rgb(252, 76, 2) 11.2%, rgb(103, 30, 117) 130%)",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      zIndex: index + 2,
      clipPath: "polygon(0 6%, 100% 0, 100% 105%, 0 100%)"
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
          bottom: "auto",
          position: "relative",
          margin: "0",
          color: "transparent",
          backgroundClip: "text",
          textAlign: "center",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          backgroundImage: "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)"
        },
        content: "Computer Vision"
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: "Computer Vision ist ein Bereich der künstlichen Intelligenz, der sich mit der Entwicklung von Algorithmen und Technologien befasst, die Computern das Sehen und Verstehen von Bildern und Videos ermöglichen. Computer Vision-Systeme können Objekte, Personen, Orte, Aktivitäten und andere visuelle Elemente in Bildern und Videos erkennen, klassifizieren und verarbeiten. Diese Systeme werden in einer Vielzahl von Anwendungen eingesetzt, darunter Gesichtserkennung, Objekterkennung, Bilderkennung, medizinische Bildgebung, autonome Fahrzeuge und Robotik.",
        "data-aos-delay": 0,
        "data-aos": "fade-left",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "text-6xl md:text-8xl lg:text-10xl",
        style: {
          ...textStyle,
          color: "currentColor",
          backgroundClip: "text",
          position: "relative",
          margin: "0",
          fonsSize: "0.5em !important",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: "So lassen sich beispielsweise aus Bildern und Videos eine Tiefenschätzung ableiten und daraus 3D-Modelle generieren. Um ein 3D-Modell aus den generierten Daten abzuleiten benötigt man das Ursprungsbild und die sogenannte Depth Map. Beide Bilder kann man dann mithilfe eines Algorithmuses, der in einen Shader rechnet zu einem 3D-Modell zusammenfügen. Ein Shader ist ein Programm, das auf der Grafikkarte ausgeführt wird und die Berechnungen für die Darstellung von 3D-Objekten übernimmt.",
        "data-aos-delay": 0,
        "data-aos": "fade-right",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "text-6xl md:text-8xl lg:text-10xl",
        style: {
          ...textStyle,
          color: "currentColor",
          backgroundClip: "text",
          margin: "0",
          position: "relative",
          fonsSize: "0.5em !important",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
      }
    ]
  },
  {
    key: generateKey(++index).toString(16),
    style: {
      backgroundImage: "linear-gradient(14deg, rgb(252, 76, 2) 11.2%, rgb(103, 30, 117) 91.1%)",
      boxShadow: "0 0 12em rgba(0, 0, 0, 0.45)",
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "flex-start",
      zIndex: index + 2,
      clipPath: "polygon(0 6%, 100% 0, 100% 105%, 0 100%)"
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
          bottom: "auto",
          position: "relative",
          marginTop: "0",
          left: "auto",
          color: "transparent",
          backgroundClip: "text",
          textAlign: "center",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          backgroundImage: "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)"
        },
        content: "Audio Processing"
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: "Audio Processing ist ein Bereich der künstlichen Intelligenz, der sich mit der Entwicklung von Algorithmen und Technologien befasst, die Computern das Verstehen und Verarbeiten von Audio ermöglichen. Audio Processing-Systeme können Sprache, Musik, Geräusche und andere akustische Signale erkennen, klassifizieren und verarbeiten. Diese Systeme werden in einer Vielzahl von Anwendungen eingesetzt, darunter Spracherkennung, Musikerkennung, Geräuschunterdrückung, Audioanalyse und Sprachsynthese.",
        "data-aos-delay": 0,
        "data-aos": "fade-left",
        "data-aos-anchor-placement": "center-center",
        className: "text-6xl md:text-8xl lg:text-10xl aos-init aos-animate",
        style: {
          ...textStyle,
          color: "currentColor",
          backgroundClip: "text",
          position: "relative",
          fonsSize: "0.5em !important",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: "Abseits der Sprachassistenten, die Sie sicher bereits kennen, gibt es auch noch andere Anwendungen. So lassen sich beispielsweise auch Musikstücke generieren, die von einem KI-Modell komponiert wurden. Hierbei wird das Modell mit einer großen Menge an Musikstücken trainiert und kann dann auf Anfrage ein neues Musikstück generieren. Auch hierbei ist es möglich, dass das Modell aufgrund der Trainingsdaten ein Musikstück generiert, das einem bereits bekannten Stück sehr ähnlich ist. Es lassen sich auch Stimmen von bekannten Persönlichkeiten generieren, da es viele Audio-Dateien gibt, die zum Trainieren der Modelle verwendet werden können.",
        "data-aos-delay": 0,
        "data-aos": "fade-right",
        className: "text-6xl md:text-8xl lg:text-10xl aos-init aos-animate",
        style: {
          ...textStyle,
          color: "currentColor",
          backgroundClip: "text",
          position: "relative",
          fonsSize: "0.5em !important",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4"
        }
      }
    ]
  },
  {
    key: generateKey(++index).toString(16),
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
      zIndex: index + 2,
      gap: "2em",
      boxShadow: "none",
      clipPath: "polygon(0 6%, 100% 0, 100% 105%, 0 100%)"
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
          bottom: "auto",
          position: "relative",
          flex: "1 1 100%",
          marginTop: "0",
          left: "auto",
          alignSelf: "flex-start",
          color: "transparent",
          backgroundClip: "text",
          textAlign: "center",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          backgroundImage: "radial-gradient(circle 763px at 0%, rgb(241 197 194) 0%, rgb(245 215 117) 100%)"
        },
        content: "Stimmensynthese"
      },
      {
        type: TYPE.Audio,
        key: generateKey(++index).toString(16),
        src: "/not_morgan_freeman.mp3",
        "data-aos-delay": 0,
        "data-aos": "zoom-out-up",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "aos-init aos-animate",
        style: {
          mixBlendMode: "overlay",
          backdropFilter: "blur(20px)",
          opacity: "0.25",
          maxWidth: "300px"
        }
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: `"It is particularly easy to generate voices of famous people, as there are many audio files available for training the models. I'm not Morgan Freeman but he still gets a freckle for this explanation."`,
        "data-aos-delay": 0,
        "data-aos": "fade-left",
        className: "text-6xl md:text-8xl lg:text-10xl aos-init aos-animate",
        style: {
          ...textStyle,
          color: "#ffffff",
          backgroundColor: "#00000011",
          fontStyle: "italic",
          fontWeight: "200",
          padding: "1em",
          borderRadius: "1em",
          opacity: "1",
          position: "relative",
          fonsSize: "5em !important",
          margin: "0",
          flex: "1",
          filter: "drop-shadow(rgba(0, 0, 0, 0.3) -6px -3px 8px) drop-shadow(0 0 1em rgba(229 213 189, 1) )",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4, rgb(229 213 189) -0.1em 0.1em 0.8em"
        }
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: "-- not Morgan Freeman",
        "data-aos-delay": 0,
        "data-aos": "fade-right",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "text-6xl md:text-8xl lg:text-10xl aos-init aos-animate",
        style: {
          ...textStyle,
          backgroundClip: "text",
          opacity: "1",
          position: "relative",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4",
          fonsSize: "5em !important",
          color: "#ffffff",
          fontStyle: "italic",
          fontWeight: "200",
          alignSelf: "flex-start",
          bottom: "3em",
          paddingRight: "1em",
          flexBasis: "100%",
          textAlign: "right"
        }
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: `"Listen, folks, the hands? Perfect size, just ask anyone. And the skin? It's a beautiful shade, the best shade, everyone loves it. The people who say otherwise are just jealous, believe me. As for being stupid, that's fake news, okay? No one loves people more than me, nobody."`,
        "data-aos-delay": 0,
        "data-aos": "fade-left",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "text-6xl md:text-8xl lg:text-10xl aos-init aos-animate",
        style: {
          ...textStyle,
          color: "#ffffff",
          backgroundColor: "#00000011",
          fontStyle: "italic",
          fontWeight: "200",
          padding: "1em",
          borderRadius: "1em",
          opacity: "1",
          position: "relative",
          fonsSize: "5em !important",
          margin: "0",
          flex: "1",
          filter: "drop-shadow(rgba(0, 0, 0, 0.3) -6px -3px 8px) drop-shadow(0 0 1em rgba(229 213 189, 1) )",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4, rgb(229 213 189) -0.1em 0.1em 0.8em"
        }
      },
      {
        type: TYPE.Audio,
        key: generateKey(++index).toString(16),
        src: "/trump.mp3",
        "data-aos-delay": 0,
        "data-aos": "zoom-out-up",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "aos-init aos-animate",
        style: {
          mixBlendMode: "overlay",
          backdropFilter: "blur(20px)",
          opacity: "0.25",
          maxWidth: "300px"
        }
      },
      {
        type: TYPE.Paragraph,
        key: generateKey(++index).toString(16),
        content: "-- not Donald Trump",
        "data-aos-delay": 0,
        "data-aos": "fade-right",
        "data-aos-anchor-placement": "bottom-bottom",
        className: "text-6xl md:text-8xl lg:text-10xl",
        style: {
          ...textStyle,
          margin: "0",
          alignSelf: "flex-start",
          backgroundClip: "text",
          opacity: "1",
          bottom: "2em",
          position: "relative",
          filter: "drop-shadow(-6px -3px 8px rgba(0, 0, 0, 0.3))",
          textShadow: "0.1em -0.1em 0.4em #450b0ac4",
          fonsSize: "5em !important",
          color: "#ffffff",
          fontStyle: "italic",
          fontWeight: "200",
          paddingLeft: "3em",
          flexBasis: "100%"
        }
      }
    ]
  }
];
const footer = [
  [
    {
      key: generateKey(++index).toString(16),
      type: LINK_TYPE.Img,
      url: "https://github.com/jibbex",
      content: {
        className: "hover:opacity-100 opacity-40 fill-slate-400 footer-ico",
        src: githubIcon,
        alt: "Github"
      }
    },
    {
      type: TYPE.Paragraph,
      key: generateKey(++index).toString(16),
      className: "w-1/2 p-2 text-center text-sm md:text-lg ml-[20vw]",
      content: "Diese Seite ist Open Source und kann bei Github geklont werden."
    }
  ],
  [
    {
      key: generateKey(++index).toString(16),
      type: LINK_TYPE.Lnk,
      url: "https://michm.de/datenschutz",
      content: "Datenschutz"
    },
    {
      key: generateKey(++index).toString(16),
      type: LINK_TYPE.Lnk,
      url: "https://michm.de/impressum",
      content: "Impressum"
    }
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
  ]
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const MouseEnterContext = createContext(void 0);
const CardContainer = ({
  children,
  className,
  containerClassName
}) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };
  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return /* @__PURE__ */ jsx(MouseEnterContext.Provider, { value: [isMouseEntered, setIsMouseEntered], children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "py-20 flex items-center justify-center",
        containerClassName
      ),
      style: {
        perspective: "1000px"
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: containerRef,
          onMouseEnter: handleMouseEnter,
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
          className: cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          ),
          style: {
            transformStyle: "preserve-3d"
          },
          children
        }
      )
    }
  ) });
};
const CardBody = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      ),
      children
    }
  );
};
const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();
  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);
  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn("w-fit transition duration-200 ease-linear", className),
      ...rest,
      children
    }
  );
};
const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === void 0) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
function ImageItem({ src, alt, style, className, type, content }) {
  switch (type) {
    case TYPE.Img:
      return /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt,
          style,
          className
        }
      );
    case TYPE.Div:
      return /* @__PURE__ */ jsx(
        "div",
        {
          style,
          className,
          children: !!content && content
        }
      );
    case TYPE.Lnk:
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: src,
          style,
          className,
          children: !!content && content
        }
      );
    default:
      return /* @__PURE__ */ jsx(Fragment, {});
  }
}
function ImageCard({ src, alt, style, className, type, content }) {
  return /* @__PURE__ */ jsx(CardContainer, { className: "left-0 md:left-[25vw] md:bottom-[8em] lg:bottom-[10em]", children: /* @__PURE__ */ jsxs(
    CardBody,
    {
      className: "bg-gradient-to-br overflow-visible p-6 to-[#671e75] from-[#fc4d02] relative group shadow-lg hover:shadow-2xl border-white/[0.4] border-2 min-w-[500px] w-full sm:w-[30rem] h-auto rounded-2xl",
      children: [
        /* @__PURE__ */ jsx(
          CardItem,
          {
            translateY: "-10",
            translateX: "-29",
            translateZ: "100",
            rotateZ: -4,
            style,
            children: /* @__PURE__ */ jsx(
              ImageItem,
              {
                src,
                alt,
                style,
                className: `${className} shadow-lg shadow-slate-800 group-hover:shadow-2xl group-hover:shadow-slate-800`,
                type,
                content
              }
            )
          }
        ),
        !!content && /* @__PURE__ */ jsx(
          CardItem,
          {
            translateZ: "160",
            translateY: "56",
            translateX: "-55",
            rotateZ: 2,
            className: "p-6 bg-black/20 group-hover:bg-black/5 backdrop-blur-xl shadow-md shadow-slate-800/50 group-hover:shadow-2xl group-hover:shadow-slate-800/20  rounded-md my-2 mx-auto",
            style: { with: "calc(100% - 0.5rem)" },
            children: /* @__PURE__ */ jsx(
              ImageItem,
              {
                type: TYPE.Div,
                content
              }
            )
          }
        )
      ]
    }
  ) });
}
const CHAR_UPDATE_TIME = 4;
const THIRTY_FPS = 1e3 / 30;
const STEPS = 32;
const CIRCLE_RADIUS = 100;
const CIRCLE_UPDATE_INTERVAL = THIRTY_FPS;
const _TouchMouseEvent = class _TouchMouseEvent {
  /**
   * Creates a new TouchMouseEvent instance.
   * @param {T} event - The event object (either MouseEvent or TouchEvent).
   */
  constructor(event) {
    __publicField(this, "type");
    __publicField(this, "event");
    this.typeCheck(event);
    this.type = event.type;
    this.event = event;
  }
  /**
   * Checks if the event is a MouseEvent.
   * @returns {boolean} - True if it's a MouseEvent, false otherwise.
   */
  get isMouseEvent() {
    return this.type === "mousemove";
  }
  /**
   * Checks if the event is a TouchEvent.
   * @returns {boolean} - True if it's a TouchEvent, false otherwise.
   */
  get isTouchEvent() {
    return !this.isMouseEvent;
  }
  /**
   * Gets the client X coordinate.
   * @returns {number} - The X coordinate.
   */
  get clientX() {
    if (this.isMouseEvent) {
      return this.event.clientX;
    }
    return this.event.touches[0].clientX;
  }
  /**
   * Gets the client Y coordinate.
   * @returns {number} - The Y coordinate.
   */
  get clientY() {
    if (this.isMouseEvent) {
      return this.event.clientY;
    }
    return this.event.touches[0].clientY;
  }
  // || type === 'touchend'
  /**
   * Validates the event type.
   * @param {UIEvent} evt - The event object.
   */
  typeCheck(evt) {
    if (!_TouchMouseEvent.isMoving(evt.type) && !_TouchMouseEvent.isTouching(evt.type)) {
      throw new Error("expecting mousemove|touchmove|touchstart event");
    }
  }
};
__publicField(_TouchMouseEvent, "isMoving", (type) => type === "mousemove");
__publicField(_TouchMouseEvent, "isTouching", (type) => (
  // Touchend produces an exception, because touches[0] can be `null`.
  // Every item in the TouchList represents on touch point on the
  // display. The `touchend` event is triggered, when the user
  // removes the touch point from the surface. It is possible,
  // that multiple touch points on the same time are active.
  //
  // Read: https://w3c.github.io/touch-events/#event-touchend
  type === "touchstart" || type === "touchmove"
));
let TouchMouseEvent = _TouchMouseEvent;
let animationId = null;
const CHAR_SIZE = {
  height: 7.5,
  width: 15
};
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randomChar = () => CHARS[Math.floor(Math.random() * (CHARS.length - 1e-4))];
function randomString(len) {
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = randomChar();
  }
  return arr.join("");
}
function Crypto() {
  const device = React.useContext(DeviceContext);
  const hydrated = React.useContext(HydrationContext);
  const [isMouseMoving, setIsMouseMoving] = React.useState(false);
  const angleRef = React.useRef(0);
  const intervalIdRef = React.useRef(null);
  const idleTimeoutRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const lettersRef = React.useRef(null);
  const [size, setSize] = React.useState({
    width: hydrated ? window.innerWidth : 1920,
    height: hydrated ? window.innerHeight : 951
  });
  const charCount = React.useMemo(
    () => Math.ceil(
      size.width / CHAR_SIZE.width * (size.height * 1.1 / CHAR_SIZE.height)
    ),
    [size]
  );
  const updateCircularMovement = React.useCallback(() => {
    if (lettersRef.current) {
      animationId = requestAnimationFrame(() => {
        if (lettersRef.current !== null) {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const centerX = windowWidth / 2;
          const centerY = windowHeight / 2;
          const currentX = parseFloat(lettersRef.current.style.getPropertyValue("--x") || "0");
          const currentY = parseFloat(lettersRef.current.style.getPropertyValue("--y") || "0");
          const newX = currentX + CIRCLE_RADIUS * Math.cos(angleRef.current);
          const newY = currentY + CIRCLE_RADIUS * Math.sin(angleRef.current);
          const deltaX = newX - centerX;
          const deltaY = newY - centerY;
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            angleRef.current += deltaX > 0 && deltaX < windowWidth ? -0.1 : 0.1;
          } else {
            angleRef.current += deltaY > 0 && deltaY < windowHeight ? -0.1 : 0.1;
          }
          lettersRef.current.style.setProperty("--x", `${newX}px`);
          lettersRef.current.style.setProperty("--y", `${newY}px`);
          lettersRef == null ? void 0 : lettersRef.current.style.setProperty("opacity", "0.3");
          lettersRef.current.textContent = randomString(charCount);
        }
        angleRef.current += 0.1;
        animationId = null;
      });
    }
  }, [lettersRef, angleRef, charCount]);
  const startCircularMovement = React.useCallback(() => {
    if (intervalIdRef.current === null) {
      intervalIdRef.current = setInterval(
        updateCircularMovement,
        CIRCLE_UPDATE_INTERVAL
      );
    }
  }, [intervalIdRef, updateCircularMovement]);
  const stopCircularMovement = React.useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, [intervalIdRef]);
  const handleMouseMove = React.useCallback(
    (event) => {
      var _a, _b, _c;
      let start;
      let mStart;
      let prevTime;
      if (idleTimeoutRef.current !== null) {
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
      idleTimeoutRef.current = setTimeout(() => {
        startCircularMovement();
        setIsMouseMoving(false);
      }, 75);
      setIsMouseMoving(true);
      stopCircularMovement();
      const timeInit = (time) => {
        if (start === void 0) {
          start = time;
          mStart = time;
        }
      };
      if (hydrated && animationId === null) {
        try {
          const e = new TouchMouseEvent(event);
          const moveHighLight = (x, y, time) => {
            if (lettersRef.current) {
              const elapsed = time - mStart;
              lettersRef.current.style.setProperty("--x", `${x}px`);
              lettersRef.current.style.setProperty("--y", `${y}px`);
              if (device.isDesktop || CHAR_UPDATE_TIME < elapsed) {
                mStart = time;
                lettersRef.current.innerHTML = randomString(charCount);
              }
            }
            animationId = null;
          };
          if (e.clientX === void 0 || e.clientY === void 0) {
            return;
          }
          if (device.isDesktop && e.isMouseEvent) {
            animationId = requestAnimationFrame((time) => {
              var _a2;
              const rect = (_a2 = cardRef.current) == null ? void 0 : _a2.getBoundingClientRect();
              const x = e.clientX - ((rect == null ? void 0 : rect.left) ?? 0);
              const y = e.clientY - ((rect == null ? void 0 : rect.top) ?? 0);
              moveHighLight(x, y, time);
            });
          } else {
            const rect = (_a = cardRef.current) == null ? void 0 : _a.getBoundingClientRect();
            const targetPos = {
              x: e.clientX - ((rect == null ? void 0 : rect.left) ?? 0),
              y: e.clientY - ((rect == null ? void 0 : rect.top) ?? 0)
            };
            const pos = {
              x: (_b = lettersRef.current) == null ? void 0 : _b.style.getPropertyValue("--x"),
              y: (_c = lettersRef.current) == null ? void 0 : _c.style.getPropertyValue("--y")
            };
            let x = parseFloat(pos.x ?? "0") ?? 0;
            let y = parseFloat(pos.y ?? "0") ?? 0;
            const smoothMove = (time) => {
              timeInit(time);
              const elapsed = time - start;
              if (prevTime !== time) {
                x += targetPos.x < x ? STEPS * -1 : STEPS;
                y += targetPos.y < y ? STEPS * -1 : STEPS;
                if (x && y) {
                  moveHighLight(x, y, time);
                }
              }
              if (elapsed < 100) {
                prevTime = time;
                if (x !== targetPos.x || y !== targetPos.y) {
                  animationId = requestAnimationFrame(smoothMove);
                }
                animationId = null;
              }
            };
            animationId = requestAnimationFrame(smoothMove);
          }
        } catch (error) {
          console.warn(error.message);
        }
      }
    },
    [charCount, device.isDesktop, hydrated, startCircularMovement, stopCircularMovement]
  );
  React.useEffect(() => {
    if (hydrated) {
      const handleResize = () => {
        setSize(
          () => ({
            width: window.innerWidth,
            height: window.innerHeight
          })
        );
      };
      window.addEventListener("resize", handleResize, { passive: true });
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [setSize, hydrated]);
  React.useEffect(() => {
    if (hydrated && lettersRef.current && device.isMobile && !lettersRef.current.style.opacity) {
      lettersRef.current.style.setProperty("--x", "0px");
      lettersRef.current.style.setProperty("--y", "0px");
      lettersRef.current.style.setProperty("opacity", "0.3");
      lettersRef.current.textContent = randomString(charCount);
    }
  }, [lettersRef, charCount, hydrated, device.isMobile, isMouseMoving]);
  return /* @__PURE__ */ jsx("div", { className: "card-track", children: /* @__PURE__ */ jsx("div", { className: "card-wrapper", children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: cardRef,
      onTouchStart: handleMouseMove,
      onTouchEnd: handleMouseMove,
      onTouchMove: handleMouseMove,
      onMouseMove: handleMouseMove,
      className: "card",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "z-20 bottom-8 absolute",
            "data-aos": "zoom-in-left",
            "data-aos-mirror": true,
            "data-aos-offset": 550,
            "data-aos-duration": 700,
            "data-aos-delay": 800,
            "data-aos-anchor-placement": "bottom-bottom",
            "data-aos-anchor": "#vault-title",
            children: /* @__PURE__ */ jsx(
              ImageCard,
              {
                className: "image-vault",
                src: proxyImage,
                alt: "AI generated Image",
                type: TYPE.Img,
                content: "Entstand bei einer Erläuterung welche Aufgabe ein Reverse Proxy erfüllt."
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { ref: lettersRef, className: "card-letters" })
      ]
    }
  ) }) });
}
function useAos(options) {
  const [aos, setAos] = React.useState();
  const isHydrated = React.useContext(HydrationContext);
  React.useEffect(() => {
    if (isHydrated) {
      setAos((inst) => {
        inst = Aos;
        return { ...inst };
      });
    }
  }, [isHydrated]);
  aos == null ? void 0 : aos.init(options);
  return aos;
}
const Hero = (props) => {
  const aso = useAos();
  React__default.useEffect(() => {
    aso == null ? void 0 : aso.init();
    if (aso) {
      aso.refresh();
    }
  }, [aso]);
  return /* @__PURE__ */ jsxs("section", { id: "hero", style: { minHeight: "90lvh", paddingBottom: "10em" }, children: [
    /* @__PURE__ */ jsx(
      "h1",
      {
        id: "vault-title",
        className: "absolute top-[100px] left-[2vw]",
        "data-aos": "zoom-out-right",
        "data-aos-offset": 0,
        "data-aos-delay": 200,
        "data-aos-duration": 1200,
        "data-aos-anchor-placement": "top-bottom",
        "data-aos-mirror": true,
        children: props.title
      }
    ),
    /* @__PURE__ */ jsx(Crypto, {})
  ] });
};
const AosContext = React.createContext(null);
function AosProvider({
  children
}) {
  const aos = useAos({
    easing: "ease-out-back",
    useClassNames: true,
    duration: 1e3,
    mirror: true
  });
  return /* @__PURE__ */ jsx(AosContext.Provider, { value: aos ?? null, children });
}
const getIndex = (arr) => arr.length === 0 ? 0 : arr.length - 1;
function ElementMapper({ element, index: index2 }) {
  const el = element;
  const keys = [];
  const hasChildren = !!el.content && typeof el.content !== "string";
  let children = [];
  index2++;
  if (hasChildren) {
    children = [...el.content.map(
      (child, idx) => /* @__PURE__ */ jsx(ElementMapper, { element: child, index: index2 + idx }, idx)
    )];
  }
  switch (el.type) {
    case TYPE.H1:
      return /* @__PURE__ */ jsx("h1", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: el.content });
    case TYPE.H2:
      return /* @__PURE__ */ jsx("h2", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: el.content });
    case TYPE.H3:
      return /* @__PURE__ */ jsx("h3", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: el.content });
    case TYPE.H4:
      return /* @__PURE__ */ jsx("h4", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: el.content });
    case TYPE.H5:
      return /* @__PURE__ */ jsx("h5", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: el.content });
    case TYPE.H6:
      return /* @__PURE__ */ jsx("h6", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: el.content });
    case TYPE.Div:
      return /* @__PURE__ */ jsx("div", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: children !== void 0 ? children : el.content });
    case TYPE.Img:
      return /* @__PURE__ */ jsx("img", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, src: el.src, alt: el.alt, style: el.style });
    case TYPE.Audio:
      return /* @__PURE__ */ jsx("audio", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, src: el.src, controls: true, style: el.style });
    default:
      return /* @__PURE__ */ jsx("span", { "data-index": keys[getIndex(keys)] = el.key ?? "", ...delete el.key && el, className: el.className, style: el.style, children: el.content });
  }
}
const Section = ({ id: id2, content }) => {
  return /* @__PURE__ */ jsx("section", { id: id2, style: content.style, className: content.className, children: content.elements.map((el, idx) => /* @__PURE__ */ jsx(ElementMapper, { "data-index": el.key, element: el, index: idx }, el.key)) });
};
const classNth1 = "flex flex-col items-center justify-start mx-2 gap-2";
const classes = "flex items-end justify-end mb-0 mr-8 mt-14";
function getElementType(element) {
  const numType = element.type;
  switch (numType) {
    case 0:
      return "Link<Image>";
    case 1:
      return "ContentElement";
    case 2:
      return "Link<string>";
    default:
      return "ContentElement";
  }
}
function getContainerElement(element) {
  const Div = () => /* @__PURE__ */ jsx("div", { ...{ ...delete element.key && element, content: void 0, type: void 0 }, children: element.content });
  const P = () => /* @__PURE__ */ jsx("p", { ...{ ...delete element.key && element, content: void 0, type: void 0 }, children: element.content });
  const Span = () => /* @__PURE__ */ jsx("span", { ...{ ...delete element.key && element, content: void 0, type: void 0 }, children: element.content });
  switch (element.type) {
    case TYPE.Div:
      return /* @__PURE__ */ jsx(Div, {});
    case TYPE.Paragraph:
      return /* @__PURE__ */ jsx(P, {});
    case TYPE.Span:
      return /* @__PURE__ */ jsx(Span, {});
  }
}
const toImg = (item) => item.content;
const toStr = (item) => item.content;
const id = (seed) => Math.floor(Math.random() * (/* @__PURE__ */ new Date()).getTime() + seed);
function Footer(props) {
  return /* @__PURE__ */ jsx("footer", { children: props.content.map((elems, key) => /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        key === 0 ? classNth1 : classes,
        "flex flex-end"
      ),
      children: elems.map((el, elkey) => {
        let item;
        const typeName = getElementType(el);
        switch (typeName) {
          case "Link<Image>":
            item = el;
            return /* @__PURE__ */ jsx("a", { href: item.url, children: /* @__PURE__ */ jsx("img", { className: cn(toImg(item).className, "size-24 sm:size-32 md:size-46"), src: toImg(item).src, alt: toImg(item).alt }) }, item.key);
          case "Link<string>": {
            item = el;
            const hasSeperator = elkey < elems.length - 1;
            return /* @__PURE__ */ jsxs("div", { className: "m-0", children: [
              /* @__PURE__ */ jsx("a", { className: cn("m-0", hasSeperator ? "mr-2" : "ml-2"), href: item.url, children: toStr(item) }),
              hasSeperator && "| "
            ] }, item.key);
          }
          case "Image":
            item = el;
            return /* @__PURE__ */ jsx("img", { className: "fill-slate-300", src: item.src, alt: item.alt }, item.key);
          default:
            item = el;
            return /* @__PURE__ */ jsx("div", { children: getContainerElement(item) }, item.key);
        }
      })
    },
    id(key)
  )) });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const PlayIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "size-6", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z", clipRule: "evenodd" }) });
const PauseIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "size-6", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z", clipRule: "evenodd" }) });
const ClipSvg = () => /* @__PURE__ */ jsxs("svg", { width: 0, height: 0, children: [
  /* @__PURE__ */ jsx("defs", {}),
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsxs("clipPath", { id: "svgPath", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        id: "rect1",
        style: { opacity: 1, vectorEffect: "none", fill: "transparent", fillRule: "evenodd", strokeWidth: 1.28465, strokeDasharray: 5695.12, stopColor: "#000000", stopOpacity: 1 },
        d: "M 2.0469091,2.0469081 -2.0469076,571.08744 Z"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        id: "path1",
        style: { opacity: 1, vectorEffect: "none", fill: "#ffffff", fillRule: "evenodd", strokeWidth: 1.28465, strokeDasharray: 5695.12, stopColor: "#000000", stopOpacity: 1 },
        d: "M 285,-2.1556503e-7 1922.047,2.0469081 1920,1080 800.50158,1077.9531 C 658.92274,974.85075 717.37261,699.89763 475.90623,489.21111 234.43985,278.52458 -159.70464,49.790476 8.187634,-16.375247 92.766804,-49.707585 285,-2.1556503e-7 285,-2.1556503e-7 Z"
      }
    )
  ] }) })
] });
const WHEEL_TRIGGER_DELAY = 500;
function LandingPage({ interval }) {
  const [isPlaying, setIsPlaying] = React__default.useState(false);
  const sectionRef = React__default.useRef(0);
  const timerRef = React__default.useRef(0);
  const lastScrollRef = React__default.useRef(0);
  const nextSection = React__default.useCallback(() => {
    const sections = document.querySelectorAll("main section");
    if (sectionRef.current < sections.length - 1) {
      sectionRef.current++;
    } else {
      sectionRef.current = 0;
    }
    sections.item(sectionRef.current).scrollIntoView({ behavior: "smooth" });
  }, [sectionRef]);
  const prevSection = React__default.useCallback(() => {
    const sections = document.querySelectorAll("main section");
    if (sectionRef.current > 0) {
      sectionRef.current--;
    } else {
      sectionRef.current = sections.length - 1;
    }
    sections.item(sectionRef.current).scrollIntoView({ behavior: "smooth" });
  }, [sectionRef]);
  const handleWheelEvent = React__default.useCallback((ev) => {
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
  React__default.useEffect(
    function() {
      if (!isPlaying) {
        return;
      }
      timerRef.current = setInterval(nextSection, interval ?? 5e3);
      return () => {
        clearInterval(timerRef.current);
        window.removeEventListener("wheel", handleWheelEvent);
      };
    },
    [sectionRef, interval, nextSection, prevSection, timerRef, handleWheelEvent, isPlaying]
  );
  return /* @__PURE__ */ jsx(AosProvider, { children: /* @__PURE__ */ jsx(DeviceProvider, { children: /* @__PURE__ */ jsxs("main", { className: "section--bg relative z-[1] shadow-md", children: [
    /* @__PURE__ */ jsx(Hero, { title: "Generative AI" }),
    /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-[1300] left-[90%] inline-block", children: /* @__PURE__ */ jsx(Button, { onClick: () => setIsPlaying((active) => !active), size: "icon", variant: "default", className: "border-white/[0.4] rounded-full focus:ring-2 ring-yellow-200 text-black hover:shadow-sm shadow-xl hover:backdrop-blur-lg m-4", children: isPlaying ? /* @__PURE__ */ jsx(PauseIcon, {}) : /* @__PURE__ */ jsx(PlayIcon, {}) }) }),
    body.map((content, key) => /* @__PURE__ */ jsx(Section, { id: `section--${key}`, content }, key)),
    /* @__PURE__ */ jsx(ClipSvg, {}),
    /* @__PURE__ */ jsx(Footer, { content: footer })
  ] }) }) });
}
const FIFTEEN_SECONDS = 15e3;
const render = () => renderToString(
  /* @__PURE__ */ jsxs(HydrationProvider, { children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        keywords: DEFAULT_KEYWORDS,
        shareImage: DEFAULT_SHARE_IMAGE
      }
    ),
    /* @__PURE__ */ jsx(LandingPage, { interval: FIFTEEN_SECONDS })
  ] })
);
const renderStatic = () => renderToStaticMarkup(
  /* @__PURE__ */ jsxs(HydrationProvider, { children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        keywords: DEFAULT_KEYWORDS,
        shareImage: DEFAULT_SHARE_IMAGE
      }
    ),
    /* @__PURE__ */ jsx(LandingPage, { interval: FIFTEEN_SECONDS })
  ] })
);
export {
  render,
  renderStatic
};
