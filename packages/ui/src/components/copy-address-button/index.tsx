// @ts-nocheck
// TODO: fix ts
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button, type TSizeVariant, type TStyleVariant } from 'ui/src/components/button'
import { CopyIcon } from 'ui/src/components/icons'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { type TTheme, ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { copyTextToClipboard } from 'ui/src/utils/copy-to-clipboard'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './copy-address-button.css'

const CopyIconAnimation = ({ animate, tickColor }: { animate: boolean; tickColor: TThemeColorKey }) => (
	<Box className={styles.copiedAnimationWrapper}>
		<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
			<AnimatePresence initial={false}>
				{animate && (
					<Box color={tickColor} zIndex={1}>
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
	sizeVariant?: TSizeVariant
	tickColor?: TThemeColorKey
	iconOnly?: boolean
	rounded?: boolean
	animationTimeout?: number
	toolTipDisabled?: boolean
	toolTipTheme?: TTheme
}

interface ICopyAddressButtonProps extends ICopyAddressButtonRequiredProps, ICopyAddressButtonOptionalProps {}

const defaultProps: ICopyAddressButtonOptionalProps = {
	className: undefined,
	styleVariant: 'tertiary',
	sizeVariant: 'small',
	tickColor: 'green400',
	iconOnly: false,
	rounded: true,
	animationTimeout: 1500,
	toolTipDisabled: false,
	toolTipTheme: 'backgroundSecondary',
}

export const CopyAddressButton: React.FC<ICopyAddressButtonProps> = props => {
	const {
		className,
		address,
		styleVariant,
		sizeVariant,
		iconOnly,
		rounded,
		tickColor,
		animationTimeout,
		toolTipDisabled,
		toolTipTheme,
	} = props

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
		<ToolTip theme={toolTipTheme} message={address} disabled={toolTipDisabled}>
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
							<Text align="center" color="strong">
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
							<Text capitalizeFirstLetter color="strong" align="center">
								<Translation text="global.copied" />
							</Text>
						</Box>
					</Box>
				) : null}
			</Button>
		</ToolTip>
	)
}

CopyAddressButton.defaultProps = defaultProps
