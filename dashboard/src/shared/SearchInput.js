import React from 'react';
import styled from 'styled-components';

// Components //
import { SearchIcon } from 'shared/Icons';

const Root = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius * 1.5}px;
    background-color: ${({ theme }) => theme.color.border};
    height: 40px;
    flex-direction: row;
    overflow: hidden;
`;

const IconWrapper = styled.div`
    padding: 0px 12px;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    flex: 1;
    padding-right: 12px;
`;

const SearchInput = () => {
    return (
        <Root>
            <IconWrapper>
                <SearchIcon color="gray" />
            </IconWrapper>
            <Input placeholder="Search..." />
        </Root>
    );
};

export default SearchInput;