import React from 'react'; // eslint-disable-line no-unused-vars
import { Icon } from '@comba.se/ui';

const Logo = props => (
    <Icon {...props} viewBox="0 0 320 320">
        <g>
            <circle
                id="Oval"
                stroke="#4D7CFE"
                strokeWidth="16"
                fill="#4D7CFE"
                cx="160"
                cy="160"
                r="150"
            ></circle>
            <path
                d="M216,215 C216,154.248678 166.751322,105 106,105 C45.2486775,105 -4,154.248678 -4,215"
                id="Oval-Copy"
                stroke="#FFFFFF"
                strokeWidth="32"
                opacity="0.18468657"
                strokeLinecap="round"
                transform="translate(106.000000, 160.000000) rotate(-90.000000) translate(-106.000000, -160.000000) "
            ></path>
            <path
                d="M224,223 C224,153.412122 167.587878,97 98,97 C28.4121215,97 -28,153.412122 -28,223"
                id="Oval"
                stroke="#FFFFFF"
                strokeWidth="32"
                strokeLinecap="round"
                transform="translate(98.000000, 160.000000) rotate(-90.000000) translate(-98.000000, -160.000000) "
            ></path>
            <circle id="Oval" fill="#FFFFFF" cx="206" cy="160" r="24"></circle>
        </g>
    </Icon>
);

export default Logo;
