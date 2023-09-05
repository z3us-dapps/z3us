import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import type { ResourceBalanceKind } from 'ui/src/types/types'

import * as styles from './styles.css'

const DEFAULT_ITEMS = 3

interface IProps {
	resourceType: 'token' | 'nft'
	balances: ResourceBalanceKind[]
	onButtonMouseOver: () => void
}

export const OverlayAssetIcons: React.FC<IProps> = ({ resourceType, balances, onButtonMouseOver }) => {
	const { accountId } = useParams()

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
					href={`/accounts/${accountId || '-'}/${resourceType}s`}
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
