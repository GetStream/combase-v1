import React from 'react';
import styled from 'styled-components';
import { Text } from '@comba.se/ui';

// Components //
import StreamLogo from 'components/StreamLogo';

const Root = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.color.surface};
	z-index: 10;
	user-select: none;
`

const Bubble = styled.a`
	cursor: pointer;
	display: flex;
	padding: 2px 12px;
	border-radius: 999px;
	justify-content: center;
	align-items: center;
	text-align: center;
	& > ${Text} {
		margin-left: 8px;
	}

	&:hover {
		background-color: ${({ theme }) => theme.colorUtils.fade(theme.color.blue, .08)};
	}
`

const Credit = () => <Root><Bubble href="https://getstream.io/chat" target="_blank" rel="noopener noreferrer"><StreamLogo color="blue" size={28} /><Text size={12} color="blue">Powered by Stream</Text></Bubble></Root>;

export default Credit;