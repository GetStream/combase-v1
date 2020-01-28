import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Lottie from 'react-lottie';
import getLoaderJSON from './getLoaderJSON';

const Loader = ({ color, size, theme }) => {
    const options = useMemo(
        () => ({
            animationData: getLoaderJSON(
                theme.color[color],
                theme.color.border
            ),
            loop: true,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        }),
        [theme, color]
    );
    return (
        <Lottie
            {...{ options }}
            height={size}
            width={size}
            isStopped={false}
            isPaused={false}
        />
    );
};

Loader.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};

Loader.defaultProps = {
    color: 'primary',
    size: 64,
};

export default withTheme(Loader);
