import React from "react"; // eslint-disable-line no-unused-vars
import { css } from "styled-components";

// Realtime //
import CerebriSansLightEOT from "./cerebri/CerebriSansPro-Light.eot";
import CerebriSansLightWOFF2 from "./cerebri/CerebriSansPro-Light.woff2";
import CerebriSansLightWOFF from "./cerebri/CerebriSansPro-Light.woff";

import CerebriSansRegularEOT from "./cerebri/CerebriSansPro-Regular.eot";
import CerebriSansRegularWOFF2 from "./cerebri/CerebriSansPro-Regular.woff2";
import CerebriSansRegularWOFF from "./cerebri/CerebriSansPro-Regular.woff";

import CerebriSansMediumEOT from "./cerebri/CerebriSansPro-Medium.eot";
import CerebriSansMediumWOFF2 from "./cerebri/CerebriSansPro-Medium.woff2";
import CerebriSansMediumWOFF from "./cerebri/CerebriSansPro-Medium.woff";

import CerebriSansSemiboldEOT from "./cerebri/CerebriSansPro-SemiBold.eot";
import CerebriSansSemiboldWOFF2 from "./cerebri/CerebriSansPro-SemiBold.woff2";
import CerebriSansSemiboldWOFF from "./cerebri/CerebriSansPro-SemiBold.woff";

import CerebriSansBoldEOT from "./cerebri/CerebriSansPro-Bold.eot";
import CerebriSansBoldWOFF2 from "./cerebri/CerebriSansPro-Bold.woff2";
import CerebriSansBoldWOFF from "./cerebri/CerebriSansPro-Bold.woff";

import CerebriSansExtraBoldEOT from "./cerebri/CerebriSansPro-ExtraBold.eot";
import CerebriSansExtraBoldWOFF2 from "./cerebri/CerebriSansPro-ExtraBold.woff2";
import CerebriSansExtraBoldWOFF from "./cerebri/CerebriSansPro-ExtraBold.woff";

export default css`
    @font-face {
        font-family: "Cerebri Sans";
        src: url(${CerebriSansLightEOT});
        src: url(${`${CerebriSansLightEOT}?#iefix`})
                format("embedded-opentype"),
            url(${CerebriSansLightWOFF2}) format("woff2"),
            url(${CerebriSansLightWOFF}) format("woff");
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Cerebri Sans";
        src: url(${CerebriSansRegularEOT});
        src: url(${`${CerebriSansRegularEOT}?#iefix`})
                format("embedded-opentype"),
            url(${CerebriSansRegularWOFF2}) format("woff2"),
            url(${CerebriSansRegularWOFF}) format("woff");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Cerebri Sans";
        src: url(${CerebriSansMediumEOT});
        src: url(${CerebriSansMediumEOT}?#iefix) format("embedded-opentype"),
            url(${CerebriSansMediumWOFF2}) format("woff2"),
            url(${CerebriSansMediumWOFF}) format("woff");
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Cerebri Sans";
        src: url(${CerebriSansSemiboldEOT});
        src: url(${`${CerebriSansSemiboldEOT}?#iefix`})
                format("embedded-opentype"),
            url(${CerebriSansSemiboldWOFF2}) format("woff2"),
            url(${CerebriSansSemiboldWOFF}) format("woff");
        font-weight: 600;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Cerebri Sans";
        src: url(${CerebriSansBoldEOT});
        src: url(${`${CerebriSansBoldEOT}?#iefix`}) format("embedded-opentype"),
            url(${CerebriSansBoldWOFF2}) format("woff2"),
            url(${CerebriSansBoldWOFF}) format("woff");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Cerebri Sans";
        src: url(${CerebriSansExtraBoldEOT});
        src: url(${`${CerebriSansExtraBoldEOT}?#iefix`})
                format("embedded-opentype"),
            url(${CerebriSansExtraBoldWOFF2}) format("woff2"),
            url(${CerebriSansExtraBoldWOFF}) format("woff");
        font-weight: 800;
        font-style: normal;
        font-display: swap;
    }
`;
