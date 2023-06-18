/* eslint-disable */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './z3us-loading.css'

const ELLIPSIS_DURATION = 1.2

export const EllipsisAnimation = () => (
	<AnimatePresence initial>
		<motion.span className={styles.ellipsisWrapper}>
			<motion.span
				animate={{ opacity: [0, 1, 0] }}
				transition={{
					duration: ELLIPSIS_DURATION,
					delay: 0,
					repeat: Infinity,
					ease: 'linear',
				}}
				className={styles.ellipsisElement}
			/>
			<motion.span
				animate={{ opacity: [0, 1, 0] }}
				transition={{
					duration: ELLIPSIS_DURATION,
					delay: 0.2,
					repeat: Infinity,
					ease: 'linear',
				}}
				className={styles.ellipsisElement}
			/>

			<motion.span
				animate={{ opacity: [0, 1, 0] }}
				transition={{
					duration: ELLIPSIS_DURATION,
					delay: 0.2,
					repeat: Infinity,
					ease: 'linear',
				}}
				className={styles.ellipsisElement}
			/>
		</motion.span>
	</AnimatePresence>
)

interface IZ3usLoadingRequiredProps {}

interface IZ3usLoadingOptionalProps {
	className?: string
	message?: string
}

interface IZ3usLoadingProps extends IZ3usLoadingRequiredProps, IZ3usLoadingOptionalProps {}

const defaultProps: IZ3usLoadingOptionalProps = {
	className: undefined,
	message: 'Loading',
}

export const Z3usLoading: React.FC<IZ3usLoadingProps> = props => {
	const { className, message } = props

	const [currentPath, setCurrentPath] = useState<string>('')

	const handleScroll = (e: Event) => {}

	return (
		<Box className={clsx(styles.loaderWrapper, className)}>
			<Box className={styles.logoOuterWrapper}>
				<Box className={styles.logoWrapperShineAnimation} />
				<Box className={styles.logoWrapper}>
					<Box className={styles.logoWrapperInner}>
						<svg x="0px" y="0px" viewBox="0 0 17 9" version="1.1" width="17" height="9" className={styles.logoSvgLeft}>
							<g transform="translate(-15.610169,1.5762712)">
								<path d="m 15.78595,6.6737293 5.529297,-3.7500005 c 0.200001,-0.1 0.398438,-7.81e-4 0.398438,0.1992187 v 1.3007813 c 0,0.2 0.20039,0.299218 0.40039,0.199219 l 9.900391,-6.199219 -8.300781,2.9003906 c -0.2,0.1 -0.298829,-0.00117 -0.298829,-0.2011718 0.676227,-4.5231421 -4.456026,-1.09325074 -6.917968,-0.2597657 -0.575103,1.2659755 -0.877228,2.6388487 -0.886719,4.0292969 0.0047,0.5978385 0.06355,1.1940215 0.175781,1.7812505 z" />
							</g>
						</svg>
						<svg x="0px" y="0px" viewBox="0 0 17 9" version="1.1" width="17" height="9" className={styles.logoSvgRight}>
							<g>
								<path d="M 16.121095,0.19403303 10.59961,3.9420801 c -0.2,0.1 -0.400391,7.81e-4 -0.400391,-0.199219 V 2.4420802 c 0.1,-0.2 -0.09883,-0.299219 -0.2988285,-0.199219 L 0,8.4420801 8.3007812,5.5416891 c 0.2,-0.1 0.298828,0.101172 0.298828,0.201172 v 2.298828 c 0,0.2 0.200781,0.301172 0.300781,0.201172 l 6.5703138,-2.255859 c 0.55019,-1.252908 0.834817,-2.606222 0.835937,-3.9746099 -0.0057,-0.610543 -0.06779,-1.21925297 -0.185546,-1.81835917 z M 15.470704,5.9870021 c -14.2903655,-10.3697919 -7.1451828,-5.18489587 0,0 z" />
							</g>
						</svg>
					</Box>
				</Box>
			</Box>
			<Box className={styles.loaderText}>
				<Box display="flex" gap="xsmall" alignItems="flex-end">
					<Text size="xsmall" weight="medium">
						{message}
					</Text>
					<Box paddingBottom="xsmall">
						<Text component="span" size="xxsmall" weight="stronger">
							<EllipsisAnimation />
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

Z3usLoading.defaultProps = defaultProps
