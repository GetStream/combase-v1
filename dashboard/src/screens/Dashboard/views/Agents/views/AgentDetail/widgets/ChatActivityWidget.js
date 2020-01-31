import React from 'react';
import { withTheme } from 'styled-components';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

// Components //
import InfoWidget from 'shared/InfoWidget';

function boxMullerRandom() {
    let phase = false,
        x1,
        x2,
        w,
        z;

    return (function() {
        if ((phase = !phase)) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(30);

const SparklineWidget = withTheme(({ theme }) => {
    return (
        <Sparklines data={sampleData}>
            <SparklinesLine
                style={{
                    strokeWidth: 3,
                    stroke: theme.color.primary,
                    fill: 'none',
                }}
            />
        </Sparklines>
    );
});

const ChatActivityWidget = () => {
    return (
        <InfoWidget widget={SparklineWidget} label="Chat Activity (30 Day)" />
    );
};

export default ChatActivityWidget;
