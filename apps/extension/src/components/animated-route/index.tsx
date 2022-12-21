import React, { useRef } from 'react'
import { useRoute, Route } from 'wouter'
import { Transition } from 'react-transition-group'

interface IProps {
	path: any
	component: any
}

export const AnimatedRoute = ({ path, component }: IProps): JSX.Element => {
	const nodeRef = useRef(null)
	const [match, params] = useRoute(path)
	const duration = 150

	const defaultStyle = {
		transition: `opacity ${duration}ms ease-in-out`,
		opacity: 0,
	}

	const transitionStyles = {
		entering: { opacity: 1 },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0 },
	}

	const RouteComponent = component

	return (
		<Transition nodeRef={nodeRef} in={match} timeout={duration}>
			{state => (
				<div
					ref={nodeRef}
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					{/* <Route component={RouteComponent} /> */}
					<RouteComponent params={params} />
				</div>
			)}
		</Transition>
	)
}
