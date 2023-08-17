import { ResourceImageIcon } from 'packages/ui/src/components/resource-image-icon'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import type { ResourceBalance } from 'ui/src/types/types'

import * as styles from './styles.css'

const DEFAULT_ITEMS = 4

interface IProps {
	balances: ResourceBalance[]
	accountId: string
	onButtonMouseOver: () => void
}

export const OverlayAssetIcons: React.FC<IProps> = props => {
	const { balances, accountId, onButtonMouseOver } = props

	return (
		<Box className={styles.overlayAssetIconsWrapper}>
			{balances.length > DEFAULT_ITEMS && (
				<Box display="flex" alignItems="center" marginRight="large">
					<Text size="xsmall" weight="medium">
						+{balances.length - DEFAULT_ITEMS}
					</Text>
				</Box>
			)}
			{balances.slice(0, DEFAULT_ITEMS).map(resource => (
				<Button
					key={resource.address}
					className={styles.overlayAssetIconCircleWrapper}
					onMouseOver={onButtonMouseOver}
					href={`/accounts/${accountId}/fungibles`}
					styleVariant="avatar"
					sizeVariant="medium"
					iconOnly
					rounded
				>
					<ResourceImageIcon size="xlarge" address={resource.address} toolTipEnabled />
				</Button>
			))}
			<Box paddingLeft="xsmall">
				<ChevronRightIcon />
			</Box>
		</Box>
	)
}
