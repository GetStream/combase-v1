import React, { useCallback } from 'react';
import styled, { withTheme } from 'styled-components';
import moment from 'moment';
import ContentLoader from 'react-content-loader';
import { Route, Link } from 'react-router-dom';
import { Avatar, Badge, Chip, Fill, Text } from '@comba.se/ui';
import { useChannelListener } from '@comba.se/chat/hooks';

// Styles //
import listItemInteractions from '@comba.se/ui/styles/css/listItemInteractions';

// Components //
const Root = styled.div`
    padding: 4px 8px;
    position: relative;
    display: flex;
    align-items: stretch;
`;

const Wrapper = styled.div`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    cursor: pointer;
    ${listItemInteractions}
`;

const Content = styled.div`
    margin-left: 16px;
    flex: 1;
`;

const Row = styled.div`
    flex-direction: row;
    align-items: center;
`;

const LatestMessage = styled(Text)``;

const renderText = text => {
	if (text.length >= 32) {
		return `${text.slice(0, 32)}...`;
	}
	return text;
};

const ChatItem = ({ active, id, partner, statusBorder, theme }) => {
	const [channel, unread, latestMessage] = useChannelListener(id, active);

	const { data, partner: { online } } = channel;

	const renderItem = useCallback(({ match }) => {
		const active = !!match;
		return (
			<Link to={`/inbox/${id}`}>
				<Root>
					<Wrapper {...{ active }}>
						<Avatar
							name={partner.name.first}
							src={partner.image}
							size={48}
							showStatus={unread > 0 || online}
							statusComponent={unread > 0 ? Badge : null}
							statusProps={{ count: unread }}
							{...{ statusBorder }}
						/>
						<Content>
							<Row>
								<Text weight="500">{`${partner.name.first} ${partner.name.last.charAt(0)}.`}</Text>
								<Fill />
								<Text color="gray" size={12}>
									{moment(latestMessage
										? latestMessage.created_at
										: data.created_at).calendar(null, {
											sameDay: 'hh:mma',
											nextDay: '[Tomorrow]',
											nextWeek: 'ddd',
											lastDay: '[Yesterday]',
											lastWeek: 'ddd',
											sameElse: 'MM/DD/YYYY'
										})}
								</Text>
							</Row>
							<Row>
								<LatestMessage
									faded={unread === 0}
									color="slate"
									size={12}
									weight="500"
								>
									{latestMessage
										? renderText(latestMessage.text)
										: 'No Messages'}
								</LatestMessage>
								<Fill />
								<Chip label="OPEN" color="green" size={8} />
							</Row>
						</Content>
					</Wrapper>
				</Root>
			</Link>
		)
	}, []);

	if (!channel) {
		return (
			<ContentLoader
				speed={2}
				width={375}
				height={80}
				viewBox="0 0 375 80"
				backgroundColor={theme.color.placeholder}
				foregroundColor={theme.color.placeholder_shimmer}
			>
				<circle cx="48" cy="40" r="24" />
				<rect x="88" y="24" rx="4" ry="4" width="134" height="16" />
				<rect x="88" y="44" rx="4" ry="4" width="120" height="12" />
			</ContentLoader>
		);
	}

	return <Route path={`/inbox/${id}`} children={renderItem} />;
};

export default withTheme(ChatItem);
