import clsx from 'clsx'
import type { CSSProperties } from 'react'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { CARD_COLORS } from '../../constants/account'
import * as imageStyles from './image.css'
import * as styles from './styles.css'

interface IProps {
	name: string
	address?: string
	totalValue?: number
	imageSrc: string
	colorClassName: string
	imgStyles: CSSProperties
}
export const CardDemo: React.FC<IProps> = props => {
	const {
		name,
		imageSrc,
		colorClassName,
		imgStyles,
		totalValue = 9.99,
		address = 'account_xrd1111111111111111111111',
	} = props

	const cardColor = CARD_COLORS[colorClassName]

	return (
		<Box className={clsx(styles.cardAllWrapper)}>
			<Box
				className={clsx(styles.card)}
				style={{
					opacity: 1,
					backgroundImage: `${cardColor}`,
				}}
			>
				<Box className={clsx(styles.cardAccountWrapper)}>
					<Box className={clsx(imageStyles.wrapper, colorClassName, cardColor)}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={imageSrc} alt={name} style={imgStyles} />
					</Box>
					<Box flexGrow={1} paddingTop="xsmall" display="flex" gap="small" position="relative">
						<Text size="large" weight="medium" className={styles.cardAccountTextSpaced}>
							<Box component="span" className={clsx(styles.cardAccountText)}>
								{getShortAddress(address)}
							</Box>
						</Text>
					</Box>
					<Box paddingBottom="xsmall" display="flex" flexDirection="column" position="relative">
						<Text size="xlarge" weight="stronger">
							<Box component="span" className={clsx(styles.cardAccountText)}>
								${totalValue}
							</Box>
						</Text>
						<Text
							color="white"
							size="large"
							weight="strong"
							truncate
							className={clsx(styles.cardAccountText, styles.cardAccountName)}
						>
							{name}
						</Text>
					</Box>
				</Box>
				<Z3usLogo className={styles.accountCardZ3USlogoWrapper} isHoverMaskEnabled={false} />
				<Box className={styles.cardAccountShine} />
			</Box>
		</Box>
	)
}
