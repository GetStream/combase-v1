import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: ${({ maxWidth }) => maxWidth}px;
    padding-left: ${({ theme }) => theme.gutter}px;
    padding-right: ${({ theme }) => theme.gutter}px;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding-left: ${({ theme }) => theme.gutter * 1.5}px;
        padding-right: ${({ theme }) => theme.gutter * 1.5}px;
    }
`;

Container.propTypes = {
    maxWidth: PropTypes.number,
};

Container.defaultProps = {
    maxWidth: 1152,
};

export default Container;
