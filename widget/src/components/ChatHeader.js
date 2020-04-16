import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { Container, IconButton } from '@comba.se/ui';
import { ArrowBackIcon } from '@comba.se/ui/Icons';

// Hooks //
import { useAuth } from 'contexts/Auth';

import { useStore } from 'contexts/Store';

// Components //
import UserBlock from 'components/UserBlock';

const Root = styled(animated.div)`
	flex: 0 0 64px;
	& > ${Container} {
		flex: 1;
		flex-direction: row;
		align-items: center;

		@media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
			padding-left: 16px;
			padding-right: 16px;
		}
	}
`;


const ChatHeader = ({ style }) => {
	const { organization } = useAuth();
	const [_, { clearActiveChannel }] = useStore();
	return (
		<Root style={style}>
			<Container>
				<IconButton
					onClick={clearActiveChannel}
					icon={ArrowBackIcon}
				/>
				<UserBlock avatar={organization.meta.branding.logo} name={organization.name} last_active={null} online />
			</Container>
		</Root>
	)
}

export default ChatHeader;