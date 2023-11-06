import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button, type TSizeVariant, type TStyleVariant } from 'ui/src/components/button'
import { CopyIcon } from 'ui/src/components/icons'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import type * as textStyles from 'ui/src/components/typography/typography.css'
import { copyTextToClipboard } from 'ui/src/utils/copy-to-clipboard'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

const messages = defineMessages({
	copied: {
		id: 'p556q3',
		defaultMessage: 'Copied',
	},
})

const CopyIconAnimation = ({ animate, tickColor }: { animate: boolean; tickColor: TThemeColorKey }) => (
	<Box className={styles.copiedAnimationWrapper}>
		<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
			<AnimatePresence initial={false}>
				{animate && (
					<Box color={tickColor} zIndex={1}>
						<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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

interface ICopyAddressButtonProps {
	address: string
	className?: string
	name?: string
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
	textSize?: keyof typeof textStyles.text
	tickColor?: TThemeColorKey
	iconOnly?: boolean
	rounded?: boolean
	animationTimeout?: number
	toolTipDisabled?: boolean
}

export const CopyAddressButton: React.FC<ICopyAddressButtonProps> = props => {
	const {
		className,
		name,
		address,
		styleVariant = 'tertiary',
		sizeVariant = 'small',
		textSize = 'small',
		iconOnly = false,
		rounded = true,
		tickColor = 'green400',
		animationTimeout = 1500,
		toolTipDisabled = false,
	} = props

	const intl = useIntl()
	const [copiedAnimate, setCopiedAnimate] = useState<boolean>(false)

	const handleAddressClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
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
		<ToolTip message={address} disabled={toolTipDisabled}>
			<Button
				className={clsx(className)}
				sizeVariant={sizeVariant}
				styleVariant={styleVariant}
				rightIcon={<CopyIconAnimation animate={copiedAnimate} tickColor={tickColor} />}
				onClick={handleAddressClick}
				iconOnly={iconOnly}
				rounded={rounded}
			>
				{!iconOnly ? (
					<Box position="relative">
						<Box transition="slow" opacity={copiedAnimate ? 0 : 1}>
							<Text color="inherit" align="center" size={textSize}>
								{name ? <>{name} - </> : null}
								{getShortAddress(address)}
							</Text>
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
							<Text capitalizeFirstLetter color="inherit" align="center">
								{intl.formatMessage(messages.copied)}
							</Text>
						</Box>
					</Box>
				) : null}
			</Button>
		</ToolTip>
	)
}
