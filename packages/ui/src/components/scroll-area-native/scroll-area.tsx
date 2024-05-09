import clsx from 'clsx'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from '../box'
import { Button } from '../button'
import { ArrowUpIcon } from '../icons'
import { ToolTip } from '../tool-tip'
import { ScrollContext } from './context'
import * as styles from './styles.css'

interface IProps {
	children: React.ReactNode | React.ReactNode[]
	className?: string
	overrideScrollParent?: HTMLElement | null
	showScrollUpButton?: boolean
	isScrollUpButtonVisible?: boolean
	onUpButtonClicked?: () => void
	hideScrollBars?: boolean
}

const messages = defineMessages({
	up: {
		id: 'hJKc5x',
		defaultMessage: 'Go to top',
	},
})

export const ScrollAreaNative = React.forwardRef<HTMLElement, IProps>(
	(
		{
			children,
			className,
			overrideScrollParent,
			showScrollUpButton = false,
			isScrollUpButtonVisible = false,
			hideScrollBars = false,
			onUpButtonClicked,
		},
		ref: React.MutableRefObject<HTMLElement>,
	) => {
		const intl = useIntl()
		const scrollCtx = useMemo(
			() => ({
				scrollableNode: overrideScrollParent ?? undefined,
				isScrolledTop: true,
			}),
			[overrideScrollParent],
		)

		return (
			<Box
				ref={ref}
				className={clsx(
					hideScrollBars ? styles.scrollAreaNativeHiddenScrollBarsWrapper : styles.scrollAreaNativeWrapper,
					className,
				)}
			>
				<ScrollContext.Provider value={scrollCtx}>{children}</ScrollContext.Provider>
				{showScrollUpButton ? (
					<Box
						className={clsx(
							styles.scrolledButtonWrapper,
							isScrollUpButtonVisible && styles.scrolledButtonWrapperVisible,
						)}
					>
						<ToolTip message={intl.formatMessage(messages.up)} side="top">
							<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={onUpButtonClicked}>
								<ArrowUpIcon />
							</Button>
						</ToolTip>
					</Box>
				) : null}
			</Box>
		)
	},
)
