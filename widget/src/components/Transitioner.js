import React, { cloneElement, Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

// Components //
const Page = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`

class LeadTransition extends Component {
	static defaultProps = {
		setAnimating: () => { },
	}
	state = {
		previousChildren: null,
	};

	componentDidMount() {
		const { anim, atParent } = this.props;
		if (atParent) {
			anim.setValue(0);
		} else if (!atParent) {
			anim.setValue(1);
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { anim, atParent, setAnimating, theme } = this.props;
		// figure out what to do with the children
		const navigatingToParent = nextProps.atParent && !atParent;
		const navigatingToChild = !nextProps.atParent && atParent;
		if (navigatingToParent) {
			setAnimating(true);
			this.setState(
				{
					previousChildren: this.props.children,
				},
				() => {
					Animated.timing(anim, {
						toValue: 0,
						duration: 480,
						easing: Easing.bezier(...theme.easing.standard),
					}).start(() => {
						setAnimating(false);
						this.setState({
							previousChildren: null,
						});
					});
				},
			);
		} else if (navigatingToChild) {
			setAnimating(true);
			this.setState(
				{
					previousChildren: this.props.children,
				},
				() => {
					Animated.timing(anim, {
						toValue: 1,
						duration: 480,
						easing: Easing.bezier(...theme.easing.standard),
					}).start(() => {
						setAnimating(false);
						this.setState({
							previousChildren: null,
						});
					});
				},
			);
		}
	}

	render() {
		const { children } = this.props;
		const { previousChildren } = this.state;

		return (
			<>
				<Page>
					{previousChildren ? cloneElement(children, { key: 0 }) : null}
				</Page>
				<Page>
					{previousChildren || cloneElement(children, { key: 0 })}
				</Page>
			</>
		);
	}
}

export default withTheme(LeadTransition);