import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

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
	children?: React.ReactNode
	message?: string
}

interface IZ3usLoadingProps extends IZ3usLoadingRequiredProps, IZ3usLoadingOptionalProps {}

const defaultProps: IZ3usLoadingOptionalProps = {
	className: undefined,
	children: undefined,
	message: 'Loading',
}

export const Z3usLoading: React.FC<IZ3usLoadingProps> = props => {
	const { className, children, message } = props

	const [currentPath, setCurrentPath] = useState<string>('')

	const handleScroll = (e: Event) => {}

	return (
		<Box className={clsx(styles.loaderWrapper, className)}>
			<Box className={styles.logoWrapper}>
				<Box className={styles.logoWrapperInner}>
					<svg x="0px" y="0px" viewBox="0 0 24 24" className={styles.logoSvg}>
						<g>
							<path d="M0,12v12h12C5.4,24,0,18.6,0,12z" />
							<path d="M12,0H0v12C0,5.4,5.4,0,12,0z" />
							<path d="M12,24h12V12C24,18.6,18.6,24,12,24z" />
							<path d="M12,0c6.6,0,12,5.4,12,12V0H12z" />
							<path
								d="M12,1.2C6,1.2,1.2,6,1.2,12C1.2,18,6,22.8,12,22.8c6,0,10.8-4.8,10.8-10.8C22.8,6,18,1.2,12,1.2z M15.5,12.2l-9.9,6.2
	l8.3-2.9c0.2-0.1,0.3,0.1,0.3,0.2v2.3c0,0.2,0.2,0.3,0.3,0.2l6.7-2.3c-1.5,3.5-5.1,6-9.2,6c-4.9,0-8.9-3.5-9.8-8.1l5.6-3.8
	c0.2-0.1,0.4,0,0.4,0.2v1.3c0,0.2,0.2,0.3,0.4,0.2l9.9-6.2l-8.3,2.9C10,8.5,9.9,8.4,9.9,8.2V5.9c0-0.2-0.2-0.3-0.3-0.2L2.8,8
	C4.4,4.5,7.9,2,12,2c4.9,0,8.9,3.5,9.8,8.1l-5.6,3.8c-0.2,0.1-0.4,0-0.4-0.2v-1.3C15.9,12.2,15.7,12.1,15.5,12.2z"
							/>
						</g>
					</svg>
				</Box>
			</Box>
			<Box className={styles.loaderText}>
				{/* {children || null} */}
				{children || (
					<Box display="flex" gap="xsmall" alignItems="flex-end">
						<Text size="xsmall">{message}</Text>
						<Box paddingBottom="xsmall">
							<Text component="span" size="xxsmall">
								<EllipsisAnimation />
							</Text>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	)
}

Z3usLoading.defaultProps = defaultProps
