import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { type ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

const DEFAULT_ITEMS = 6

interface IProps {
	resourceType: 'token' | 'nft' | 'lsu' | 'lpu'
	balances: ResourceBalanceKind[]
}

export const OverlayAssetIcons: React.FC<IProps> = ({ resourceType, balances }) => {
	const navigate = useNavigate()
	const { accountId } = useParams()
	const [searchParams] = useSearchParams()

	const handleClick = (address: string) => (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		navigate(`/accounts/${accountId || '-'}/${resourceType}s/${address}?${searchParams}`)
	}

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
						className={
							resource.type === ResourceBalanceType.NON_FUNGIBLE
								? styles.overlayAssetIconSquareWrapper
								: styles.overlayAssetIconCircleWrapper
						}
						onClick={handleClick(resource.address)}
						styleVariant="avatar"
						sizeVariant={{ mobile: 'small', tablet: 'medium' }}
						iconOnly
						rounded
					>
						<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={resource.address} toolTipEnabled />
					</Button>
				))}
				<Box className={styles.overlayAssetChevronWrapper}>
					<ChevronRightIcon />
				</Box>
			</Box>
		</Box>
	)
}
