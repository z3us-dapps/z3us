import clsx from 'clsx'
import React from 'react'

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
	className?: string
	content: string
}

const Code: React.FC<SProps> = ({ className, content }) => (
	<ScrollAreaRoot className={clsx(styles.wrapper, className)}>
		<ScrollAreaScrollbar orientation="vertical">
			<ScrollAreaThumb />
		</ScrollAreaScrollbar>
		<ScrollAreaViewport>
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
)

export default Code
