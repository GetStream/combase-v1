import React, { useCallback, memo } from 'react';
import styled from 'styled-components';

// Components //
import { SearchIcon } from 'shared/Icons';

const Root = styled.div`
    height: 64px;
    flex-direction: row;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    padding: 0px 12px;
`;

const IconWrapper = styled.div`
    padding: 0px 12px;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    flex: 1;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    &::placeholder {
        color: ${({ theme }) => theme.color.gray};
    }
`;

const SearchHeader = ({ onChange }) => {
    const handleChange = useCallback(
        ({ target: { value } }) => {
            onChange(value);
        },
        [onChange]
    );
    return (
        <Root>
            <IconWrapper>
                <SearchIcon color="gray" size={24} />
            </IconWrapper>
            <Input placeholder="Search" onChange={handleChange} />
        </Root>
    );
};

export default memo(SearchHeader);
