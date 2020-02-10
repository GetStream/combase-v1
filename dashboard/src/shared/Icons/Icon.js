import React, { cloneElement, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

const Icon = ({
    children,
    className,
    color,
    size,
    viewBox,
    preserveAspectRatio,
    style,
}) => {
    const theme = useContext(ThemeContext);
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox={viewBox}
            style={style}
            preserveAspectRatio={preserveAspectRatio}
        >
            {cloneElement(children, { fill: theme.color[color] })}
        </svg>
    );
};

Icon.propTypes = {
    color: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
};

Icon.defaultProps = {
    color: 'primary',
    size: 24,
    viewBox: '0 0 24 24',
};

export default memo(Icon);
