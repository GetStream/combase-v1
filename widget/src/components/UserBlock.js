import React from 'react';
import styled from 'styled-components';
import { Avatar, Text } from '@comba.se/ui';
import moment from 'moment';

// Components //

const Root = styled.div`
	margin-left: 8px;
    flex-direction: row;
    align-items: center;
`;

const Content = styled.div`
    margin-left: 12px;
`;

const UserBlock = ({ avatar, last_active, name, online }) => {
	return (
		<Root>
			<Avatar
				src={avatar}
				name={name}
				size={32}
				showStatus={online}
				status={online ? 'online' : 'offline'}
			/>
			<Content>
				<Text weight="500">{name}</Text>
				<Text size={12} faded>
					{online
						? 'Active Now'
						: last_active
							? `Last active: ${moment(last_active).fromNow()}`
							: 'Offline'}
				</Text>
			</Content>
		</Root>
	);
}

export default UserBlock;