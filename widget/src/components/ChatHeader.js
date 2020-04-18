import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { animated } from 'react-spring';
import { Container, IconButton } from '@comba.se/ui';
import { ArrowBackIcon } from '@comba.se/ui/Icons';

// Hooks //
import { useAuth } from 'contexts/Auth';

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


const ChatHeader = ({ channelId, style }) => {
	const history = useHistory();
	const { organization, user } = useAuth();
	return (
		<Root style={style}>
			<Container>
				{user && channelId && channelId !== 'new' ? (
					<IconButton
						onClick={history.goBack}
						icon={ArrowBackIcon}
					/>
				) : null}
				<UserBlock avatar={organization.meta.branding.logo} name={organization.name} last_active={null} online />
			</Container>
		</Root>
	)
}

ChatHeader.propTypes = {
	channelId: PropTypes.string,
	style: PropTypes.object,
}

export default ChatHeader;