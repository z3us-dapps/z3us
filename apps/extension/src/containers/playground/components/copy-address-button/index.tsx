import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button, TStyleVariant } from 'ui/src/components-v2/button'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { CopyIcon } from 'ui/src/components/icons'

import Translation from '@src/components/translation'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { getShortAddress } from '@src/utils/string-utils'

import * as styles from './copy-address-button.css'

const CopyIconAnimation = ({ animate, tickColor = 'green400' }: { animate: boolean; tickColor: string }) => (
	<Box className={styles.copiedAnimationWrapper}>
		<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
			<AnimatePresence initial={false}>
				{animate && (
					<Box color={tickColor as any} zIndex={1}>
						<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="CheckIcon">
							<motion.path
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								exit={{ pathLength: 0 }}
								transition={{
									type: 'tween',
									duration: 0.3,
									ease: animate ? 'easeOut' : 'easeIn',
								}}
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7.75 12.75L10 15.25L16.25 8.75"
							/>
						</svg>
					</Box>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{!animate && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
						exit={{ opacity: 0, transition: { delay: 0, duration: 0.1 } }}
					>
						<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
							<CopyIcon />
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	</Box>
)

interface ICopyAddressButtonRequiredProps {
	address: string
}

interface ICopyAddressButtonOptionalProps {
	className?: string
	styleVariant?: TStyleVariant
	tickColor?: string
	iconOnly?: boolean
	rounded?: boolean
	animationTimeout?: number
}

interface ICopyAddressButtonProps extends ICopyAddressButtonRequiredProps, ICopyAddressButtonOptionalProps {}

const defaultProps: ICopyAddressButtonOptionalProps = {
	className: undefined,
	styleVariant: 'tertiary',
	tickColor: 'green400',
	iconOnly: false,
	rounded: true,
	animationTimeout: 1500,
}

export const CopyAddressButton: React.FC<ICopyAddressButtonProps> = props => {
	const { className, address, styleVariant, iconOnly, rounded, tickColor, animationTimeout } = props

	const [copiedAnimate, setCopiedAnimate] = useState<boolean>(false)

	const handleAddressClick = () => {
		copyTextToClipboard(address)
		setCopiedAnimate(true)
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (copiedAnimate) {
				setCopiedAnimate(false)
			}
		}, animationTimeout)

		return () => clearTimeout(timeoutId)
	}, [copiedAnimate])

	return (
		<ToolTip message={address}>
			<Button
				className={clsx(className)}
				sizeVariant="small"
				styleVariant={styleVariant}
				rightIcon={<CopyIconAnimation animate={copiedAnimate} tickColor={tickColor} />}
				onClick={handleAddressClick}
				iconOnly={iconOnly}
				rounded={rounded}
			>
				{!iconOnly ? (
					<Box position="relative">
						<Box transition="slow" opacity={copiedAnimate ? 0 : 1}>
							{getShortAddress(address)}
						</Box>
						<Box
							transition="slow"
							opacity={copiedAnimate ? 1 : 0}
							position="absolute"
							top={0}
							width="full"
							textAlign="center"
							pointerEvents="none"
						>
							<Translation text="global.copied" />
						</Box>
					</Box>
				) : null}
			</Button>
		</ToolTip>
	)
}

CopyAddressButton.defaultProps = defaultProps
