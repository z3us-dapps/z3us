import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from 'ui/src/components/scroll-area-radix'

import { CopyAddressButton } from '../../copy-address-button'
import Text from '../text'
import * as styles from './styles.css'

interface SProps {
	content: string
	className?: string
	onChange?: (e: React.ChangeEvent<HTMLDivElement>) => void
	style?: React.CSSProperties
}

const Code: React.FC<SProps> = ({ className, content, style, onChange }) => {
	const isContentEditable = !!onChange

	return (
		<Box className={clsx(styles.scrollOuterWrapper, className)} style={style}>
			<Box className={styles.scrollAbsoluteWrapper}>
				<ScrollAreaRoot className={styles.scrollWrapper}>
					<ScrollAreaScrollbar orientation="vertical">
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
					<ScrollAreaViewport
						contentEditable={isContentEditable}
						onInput={onChange}
						className={styles.scrollViewPortWrapper}
					>
						<Text size="xxsmall" className={styles.textWrapper}>
							<CopyAddressButton
								className={styles.copyButton}
								styleVariant="ghost"
								sizeVariant="xsmall"
								address={content}
								iconOnly
								rounded={false}
								tickColor="colorStrong"
								toolTipDisabled
							/>
							{content}
						</Text>
					</ScrollAreaViewport>
					<ScrollAreaScrollbar orientation="horizontal">
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
				</ScrollAreaRoot>
			</Box>
		</Box>
	)
}

export default Code
