import React, { useMemo } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { Text } from '@comba.se/ui';

// Components //
import StreamLogo from 'components/StreamLogo';

const Root = styled(animated.div)`
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

const Credit = ({ hasShadow }) => {
	const { value: anim } = useSpring({ value: hasShadow ? 1 : 0 })
	const style = useMemo(() => ({
		boxShadow: anim.interpolate({
			range: [0, 1],
			output: [0, 0.04]
		}).interpolate(v => `0px -8px 16px rgba(0, 0, 0, ${v})`)
	}), [anim]);
	return <Root><Bubble href="https://getstream.io/chat" target="_blank" rel="noopener noreferrer"><StreamLogo color="blue" size={28} /><Text size={12} color="blue" weight="500">Powered by Stream</Text></Bubble></Root>
};

export default Credit;