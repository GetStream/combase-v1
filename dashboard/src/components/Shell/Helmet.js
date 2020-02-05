import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { ThemeContext } from 'styled-components';

export default () => {
	const theme = useContext(ThemeContext);
	return (
		<Helmet title="Combase • Customer Support Dashboard">
			<meta name="theme-color" content={theme.color.primary} />
		</Helmet>
	);
};
