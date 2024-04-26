import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useMatch, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ChevronDown3Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { useIsActivitiesVisible } from 'ui/src/pages/accounts/hooks/use-is-activities-visible'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import { findMetadataValue } from 'ui/src/services/metadata'

import * as styles from './styles.css'

const messages = defineMessages({
	assets: {
		id: 'd1uESJ',
		defaultMessage: 'Assets',
	},
	tokens: {
		id: 'iyKLWv',
		defaultMessage: 'Tokens {symbol}',
	},
	nfts: {
		id: 'nqRscq',
		defaultMessage: 'NFTs',
	},
	activity: {
		id: 'ZmlNQ3',
		defaultMessage: 'Activity',
	},
	back: {
		id: 'cyR7Kh',
		defaultMessage: 'Back',
	},
	clear: {
		id: '/GCoTA',
		defaultMessage: 'Clear',
	},
	search: {
		id: '0BUTMv',
		defaultMessage: 'Search...',
	},
})

const TabTitle: React.FC = () => {
	const intl = useIntl()
	const { resourceId } = useParams()
	const resourceType = useResourceType()

	const { data } = useEntityMetadata(resourceId)

	const name = findMetadataValue('name', data)
	const symbol = findMetadataValue('symbol', data) || name

	switch (resourceType) {
		case 'tokens':
			return <>{intl.formatMessage(messages.tokens, { symbol: symbol ? ` (${symbol.toUpperCase()})` : '' })}</>
		case 'nfts':
			return <>{intl.formatMessage(messages.nfts)}</>
		default:
			return <>{intl.formatMessage(messages.assets)}</>
	}
}

interface IProps {
	resourceId: string
	isExpanded: boolean
	onClick: () => void
}

export const MobileScrollingButtons: React.FC<IProps> = ({ resourceId, isExpanded, onClick }) => {
	const intl = useIntl()
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const isActivitiesVisible = useIsActivitiesVisible()
	const isNftCollection = useMatch('/accounts/:accountId/nfts/:resourceId')
	const isNftCollectionOrList = !resourceId || !!isNftCollection

	const queryWithActs = new URLSearchParams(searchParams)
	queryWithActs.set('acts', `true`)
	const queryWithoutActs = new URLSearchParams(searchParams)
	queryWithoutActs.delete('acts')

	if (!isNftCollectionOrList) return null

	return (
		<Box
			className={clsx(
				styles.accountRoutesScrollingStickyBtnWrapper,
				!isExpanded && styles.accountRoutesScrollingStickyShadow,
				styles.accountRoutesScrollingStickyBtnCollectionWrapper,
			)}
		>
			<Box className={styles.accountRoutesScrollingStickyBtnInner}>
				<Box className={styles.tabsWrapper}>
					<Link
						underline="never"
						to={`${location.pathname}?${queryWithoutActs}`}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonLeft,
							!isActivitiesVisible && styles.tabsWrapperButtonActive,
							!isExpanded && styles.tabsWrapperButtonSticky,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={!isActivitiesVisible ? 'strong' : 'neutral'}>
							<TabTitle />
						</Text>
					</Link>
					<Link
						underline="never"
						to={`${location.pathname}?${queryWithActs}`}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonRight,
							isActivitiesVisible && styles.tabsWrapperButtonActive,
							!isExpanded && styles.tabsWrapperButtonSticky,
						)}
					>
						<Text size="small" weight="strong" align="center" color={isActivitiesVisible ? 'strong' : 'neutral'}>
							{intl.formatMessage(messages.activity)}
						</Text>
					</Link>
					<Button
						styleVariant="ghost"
						sizeVariant="small"
						iconOnly
						className={clsx(styles.tabsWrapperScrollBtn, !isExpanded && styles.tabsWrapperScrollBtnScrolled)}
						onClick={onClick}
					>
						<ChevronDown3Icon />
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
