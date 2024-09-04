"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CryptoBackground_1 = require("@/page/components/CryptoBackground");
var useAos_1 = require("@/hooks/useAos");
var Hero = function (props) {
    var aso = useAos_1["default"]({
        mirror: true
    });
    react_1["default"].useEffect(function () {
        aso === null || aso === void 0 ? void 0 : aso.init();
        if (aso) {
            aso.refresh();
        }
    }, [aso]);
    return (react_1["default"].createElement("section", { id: "hero" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("h1", { id: "vault-title", className: "color-transparent absolute top-[40%] left-[2vw] text-5xl font-bold text-white min-h-[80lvh]", "data-aos": "zoom-out-right", "data-aos-offset": 0, "data-aos-delay": 200, "data-aos-duration": 1200, "data-aos-anchor-placement": "top-bottom", "data-aos-mirror": true, style: {
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 100
                } }, props.title),
            react_1["default"].createElement(CryptoBackground_1["default"], null))));
};
exports["default"] = Hero;
