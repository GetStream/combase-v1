import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AutosizeTextArea, Container } from '@comba.se/ui';
import { SendIcon } from '@comba.se/ui/Icons';
import { useMedia } from '@comba.se/ui/hooks';
import useUploadAttachments from 'stream-chat-hooks/useUploadAttachments';

// Hooks //
import { useChat } from '@comba.se/chat/hooks';

// Components //
// import Actions from '@comba.se/chat/Actions';
// import Composer from '@comba.se/chat/Composer';

const Root = styled(Container)`
    flex-direction: row;
    align-items: center;
    min-height: 64px;
    padding-right: 0px; 
    border-top: 1px solid ${({ theme }) => theme.color.border};
	@media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    	padding-right: 0px; 
    }
`;

const InputWrapper = styled.div`
    flex: 1;
`;

const Input = styled(AutosizeTextArea)`
    width: 100%;
    resize: none;
    margin-right: 16px;
    font-size: 14px;
    line-height: 20px;
    outline: none;
    color: ${({ theme }) => theme.color.alt_text};
    font-weight: 500;
    max-height: 144px;
	padding-top: 12px;
	padding-bottom: 12px;

    &::-webkit-input-placeholder {
        color: ${({ theme }) =>
		theme.colorUtils.fade(theme.color.alt_text, 0.56)};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        margin-right: 0;
        max-height: 288px;
    }
`;

const SendButton = styled.div`
	justify-content: center;
	align-items: center;
	align-self: stretch;
	width: 64px;
	margin-right: 8px;
	margin-left: 16px;
`

const InputToolbar = ({ placeholder }) => {
	const {
		channelId,
		handleSend,
		handleInputChange,
		inputRef,
		setInputToolbarHeight,
		text,
	} = useChat();

	const isMobile = useMedia('sm');

	const [
		attachments,
		{ uploadAttachment, deleteAttachment, clearAttachments },
	] = useUploadAttachments(channelId);


	const onSend = useCallback(
		() => {
			handleSend({ text: text.trim() }, true);
			clearAttachments();
		},
		[clearAttachments, handleSend, text]
	);

	const onKeyDown = useCallback(
		(e) => {
			if (e.keyCode === 13 && !e.shiftKey) {
				e.preventDefault()
				if (text) {
					onSend({ text: text.trim(), attachments }, true);
				}
			}
			return false;
		},
		[attachments, text, onSend]
	);

	const handleChange = useCallback(
		({ target: { value } }) => {
			handleInputChange(value);
		},
		[handleInputChange]
	);

	return (
		<Root maxWidth={840} isMobile={isMobile}>
			<InputWrapper>
				<Input
					rows={1}
					onChange={handleChange}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					value={text}
					ref={inputRef}
				/>
			</InputWrapper>
			<SendButton onClick={!text ? null : onSend}>
				<SendIcon color={text ? "primary" : 'disabled'} />
			</SendButton>
		</Root>
	);
};

InputToolbar.propTypes = {
	inputProps: PropTypes.object,
	onResize: PropTypes.func,
	placeholder: PropTypes.string,
};

InputToolbar.defaultProps = {
	placeholder: 'Type a message',
};

export default InputToolbar;
