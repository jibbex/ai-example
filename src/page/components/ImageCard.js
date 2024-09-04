"use strict";
exports.__esModule = true;
exports.ImageCard = void 0;
var content_1 = require("@/../content");
var _3d_card_1 = require("@/components/ui/3d-card");
var react_1 = require("react");
function ImageItem(_a) {
    var src = _a.src, alt = _a.alt, style = _a.style, className = _a.className, type = _a.type, content = _a.content;
    switch (type) {
        case content_1.TYPE.Img:
            return (react_1["default"].createElement("img", { src: src, alt: alt, style: style, className: className }));
        case content_1.TYPE.Div:
            return (react_1["default"].createElement("div", { style: style, className: className }, !!content && content));
        case content_1.TYPE.Lnk:
            return (react_1["default"].createElement("a", { href: src, style: style, className: className }, !!content && content));
        default:
            return react_1["default"].createElement(react_1["default"].Fragment, null);
    }
}
/**
 * This component represents an image card with content.
 *
 * @param {ImageCardProps} props - The properties of the image card.
 * @returns {React.JSX.Element} The image card component.
 */
function ImageCard(_a) {
    var src = _a.src, alt = _a.alt, style = _a.style, className = _a.className, type = _a.type, content = _a.content;
    return (react_1["default"].createElement(_3d_card_1.CardContainer, { className: 'left-0 md:left-[25vw] md:bottom-[8em] lg:bottom-[10em]' },
        react_1["default"].createElement(_3d_card_1.CardBody, { className: "bg-gradient-to-br overflow-visible p-6 to-[#671e75] from-[#fc4d02] relative group shadow-lg hover:shadow-2xl border-white/[0.4] border-2 min-w-[500px] w-full sm:w-[30rem] h-auto rounded-2xl" },
            react_1["default"].createElement(_3d_card_1.CardItem, { translateY: "-10", translateX: "-29", translateZ: "100", rotateZ: -4, style: style },
                react_1["default"].createElement(ImageItem, { src: src, alt: alt, style: style, className: className + " shadow-lg shadow-slate-800 group-hover:shadow-2xl group-hover:shadow-slate-800", type: type, content: content })),
            !!content &&
                react_1["default"].createElement(_3d_card_1.CardItem, { translateZ: "160", translateY: "56", translateX: "-55", rotateZ: 2, className: "p-6 bg-black/20 group-hover:bg-black/5 backdrop-blur-xl shadow-md shadow-slate-800/50 group-hover:shadow-2xl group-hover:shadow-slate-800/20  rounded-[2em] m-4", style: { "with": 'calc(100% - 0.5rem)' } },
                    react_1["default"].createElement(ImageItem, { type: content_1.TYPE.Div, content: content })))));
}
exports.ImageCard = ImageCard;
