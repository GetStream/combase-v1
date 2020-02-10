import React, { memo } from 'react';
import styled from 'styled-components';
import { Link, Route } from 'react-router-dom';

// Components //
const Root = styled.div`
    justify-content: center;
    align-items: center;
    padding: 24px 0px;
`;

const NavLink = styled(Link)`
    pointer-events: ${({ active }) => (active ? 'none' : 'auto')};
`;

export default memo(({ icon: Icon, isExact, path }) => {
    return (
        <Route
            {...{ path, isExact }}
            children={({ match: active }) => (
                <NavLink {...{ active }} to={path}>
                    <Root>
                        <Icon color={active ? 'primary' : 'gray'} />
                    </Root>
                </NavLink>
            )}
        />
    );
});
