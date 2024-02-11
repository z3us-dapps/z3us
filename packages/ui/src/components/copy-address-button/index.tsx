import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

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

const CopyIconAnimation = ({ animate, tickColor }: { animate: boolean; tickColor: TThemeColorKey }) => (
	<Box className={styles.copiedAnimationWrapper}>
		<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
			{animate && (
				<Box color={tickColor} zIndex={1}>
					<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M7.75 12.75L10 15.25L16.25 8.75" />
					</svg>
				</Box>
			)}

			{!animate && (
				<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
					<CopyIcon />
				</Box>
			)}
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
						<Box>
							<Text color="inherit" align="center" size={textSize} truncate>
								{name ? <>{name} - </> : null}
								{getShortAddress(address)}
							</Text>
						</Box>
					</Box>
				) : null}
			</Button>
		</ToolTip>
	)
}
