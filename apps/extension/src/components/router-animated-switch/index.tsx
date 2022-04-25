import React from 'react'
import { MotionBox } from 'ui/src/components/atoms/motion-box'
import { CSS } from 'ui/src/theme'
import { AnimatePresence } from 'framer-motion'
import { useLocation, Switch } from 'wouter'

export const AnimatedSwitch = ({ children, css }: { children: any; css?: CSS }) => {
	const [location = ''] = useLocation()
	return (
		<AnimatePresence exitBeforeEnter>
			<MotionBox
				key={location}
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 0 }}
				exit={{ opacity: 0, y: 0 }}
				transition={{ duration: 0.2 }}
				css={{ ...(css as any) }}
			>
				<Switch key={location} location={location}>
					{children}
				</Switch>
			</MotionBox>
		</AnimatePresence>
	)
}

AnimatedSwitch.defaultProps = {
	css: undefined,
}
