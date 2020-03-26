import React, { useMemo } from 'react';

// Returns a single child component based
// on an active prop on the child component 
// (Similar to react-router's <Switch />)
export default ({ children }) => {
	const component = useMemo(() => {
		let component;
		React.Children.forEach(children, (child) => {
			if (!child.props.active) {
				return null;
			}
			component = child;
		});

		return component || null;
	}, [children]);

	return component ? React.cloneElement(component) : component;
}