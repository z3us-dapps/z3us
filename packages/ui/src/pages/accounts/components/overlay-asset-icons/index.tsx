import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import type { ResourceBalanceKind } from 'ui/src/types/types'

import * as styles from './styles.css'

const DEFAULT_ITEMS = 6

interface IProps {
	resourceType: 'token' | 'nft' | 'lp-token' | 'pool-unit'
	balances: ResourceBalanceKind[]
}

export const OverlayAssetIcons: React.FC<IProps> = ({ resourceType, balances }) => {
	const navigate = useNavigate()
	const { accountId } = useParams()
	const isMobile = useIsMobileWidth()

	return (
		<Box className={styles.overlayAssetIconsWrapper}>
			<Box display="flex" alignItems="center">
				{balances.length > DEFAULT_ITEMS && (
					<Text size="xsmall" weight="medium">
						+{balances.length - DEFAULT_ITEMS}
					</Text>
				)}
			</Box>
			<Box display="flex" alignItems="center">
				{balances.slice(0, DEFAULT_ITEMS).map(resource => (
					<Button
						key={resource.address}
						className={styles.overlayAssetIconCircleWrapper}
						onClick={(event: React.MouseEvent<HTMLElement>) => {
							event.preventDefault()
							navigate(`/accounts/${accountId || '-'}/${resourceType}s/${resource.address}`)
						}}
						styleVariant="avatar"
						sizeVariant={isMobile ? 'small' : 'medium'}
						iconOnly
						rounded
					>
						<ResourceImageIcon size="large" sizeTablet="xlarge" address={resource.address} toolTipEnabled />
					</Button>
				))}
				<Box className={styles.overlayAssetChevronWrapper}>
					<ChevronRightIcon />
				</Box>
			</Box>
		</Box>
	)
}
