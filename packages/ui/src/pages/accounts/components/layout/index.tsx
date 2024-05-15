import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useMatch, useMatches, useOutlet, useParams } from 'react-router-dom'

import { ActivityList } from 'ui/src/components/activity-list'
import { Box } from 'ui/src/components/box'
import { ScrollAreaNative } from 'ui/src/components/scroll-area-native'
import { ScrollContext } from 'ui/src/context/scroll'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { findFieldValue, findMetadataValue } from 'ui/src/services/metadata'

import { useIsActivitiesVisible } from '../../hooks/use-is-activities-visible'
import { useResourceType } from '../../hooks/use-resource-type'
import { CardBackground } from './components/background'
import { Breadcrumbs } from './components/breadcrumbs'
import { MobileScrollingButtons } from './components/mobile/scrolling-buttons'
import { AccountTotalValue } from './components/total-value'
import useAccountsExpand from './hooks/use-accounts-expand'
import useAccountsScroll from './hooks/use-accounts-scroll'
import * as styles from './styles.css'

const messages = defineMessages({
	tokens: {
		id: 'P6EE/a',
		defaultMessage: 'Tokens',
	},
	nfts: {
		id: 'nqRscq',
		defaultMessage: 'NFTs',
	},
	lsus: {
		id: 'zspeCR',
		defaultMessage: 'LSUs',
	},
	lpus: {
		id: 'uLpYbE',
		defaultMessage: 'LPUs',
	},
})

const Layout: React.FC = () => {
	const intl = useIntl()
	const outlet = useOutlet()
	const matches = useMatches()
	const accounts = useWalletAccounts()
	const resourceType = useResourceType()
	const isActivitiesVisible = useIsActivitiesVisible()
	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined

	const isNftCollection = useMatch('/accounts/:accountId/nfts/:resourceId')
	const isNftCollectionOrList = !resourceId || !!isNftCollection

	const sidebars = matches
		.filter(match => Boolean((match.handle as any)?.sidebar))
		.map(match => (match.handle as any).sidebar)
	const [sidebar] = sidebars.reverse()

	const { data: resource } = useEntityDetails(resourceId)
	const { data: nft } = useNonFungibleData(resourceId, nftId)

	const mainRef = useRef<HTMLElement>()
	const buttonsRef = useRef<HTMLElement>()
	const rightRef = useRef<HTMLElement>()
	const leftRef = useRef<HTMLElement>()
	const {
		leftScrollCtx,
		rightScrollCtx,
		isLeftScrollUpButtonVisible,
		isMainScrollUpButtonVisible,
		isRightScrollUpButtonVisible,
		onLeftScrollUpBtnClick,
		onRightScrollUpBtnClick,
	} = useAccountsScroll(leftRef, rightRef, mainRef)
	const { isExpanded, onExpandAccounts } = useAccountsExpand(mainRef, buttonsRef)

	useEffect(() => {
		const parts = []

		const accountName = accounts?.[accountId]?.name
		parts.push(accountId !== '-' ? accountName || accountId : '')

		if (resourceType === 'nfts') {
			parts.push(intl.formatMessage(messages.nfts))
		} else if (resourceType === 'tokens') {
			parts.push(intl.formatMessage(messages.tokens))
		} else if (['lsus', 'lp-tokens'].includes(resourceType)) {
			parts.push(intl.formatMessage(messages.lsus))
		} else if (['lpus', 'pool-units'].includes(resourceType)) {
			parts.push(intl.formatMessage(messages.lpus))
		}

		const resourceName = findMetadataValue('name', resource?.metadata?.items)
		const nftName = findFieldValue('name', (nft?.data?.programmatic_json as any)?.fields)

		parts.push(resourceName)
		parts.push(nftName)

		const validParts = parts.filter(part => !!part)

		document.title = validParts.length > 0 ? `Z3US: ${validParts.join(' - ')}` : 'Z3US'

		return () => {
			document.title = 'Z3US'
		}
	}, [resourceType, accountId, resource, nft])

	return (
		<>
			<CardBackground view="mobile" />
			<ScrollAreaNative
				className={styles.mainMobileScroll}
				ref={mainRef}
				hideScrollBars
				onUpButtonClicked={onLeftScrollUpBtnClick}
				isScrollUpButtonVisible={isMainScrollUpButtonVisible}
			>
				<Box className={clsx(styles.panelRight, resourceId && styles.panelRightResourceWrapper)}>
					<ScrollAreaNative
						ref={rightRef}
						onUpButtonClicked={onRightScrollUpBtnClick}
						isScrollUpButtonVisible={isRightScrollUpButtonVisible}
						className={styles.panelRightScroll}
						hideScrollBars
					>
						<ScrollContext.Provider value={rightScrollCtx}>{sidebar}</ScrollContext.Provider>
					</ScrollAreaNative>
				</Box>
				<MobileScrollingButtons
					ref={buttonsRef}
					isExpanded={isExpanded}
					onClick={onExpandAccounts}
					display={[!isNftCollectionOrList ? 'none' : 'block', 'none']}
				/>
				<Box className={clsx(styles.panelLeft, !isNftCollectionOrList && styles.panelLeftResourceWrapper)}>
					<ScrollAreaNative
						ref={leftRef}
						onUpButtonClicked={onLeftScrollUpBtnClick}
						isScrollUpButtonVisible={isLeftScrollUpButtonVisible}
						className={styles.panelLeftScroll}
					>
						<ScrollContext.Provider value={leftScrollCtx}>
							<Box
								className={clsx(
									styles.accountsStickyWrapper,
									!resourceType && !leftScrollCtx.isScrolledTop && styles.accountsStickyBoxShadow,
								)}
							>
								<Breadcrumbs />
								<AccountTotalValue />
							</Box>
							<Box display={[!isActivitiesVisible ? 'block' : 'none', 'block']}>{outlet}</Box>
							<Box display={[isActivitiesVisible ? 'block' : 'none', 'none']}>
								<ActivityList className={styles.activityList} display={['flex', 'none']} />
							</Box>
						</ScrollContext.Provider>
					</ScrollAreaNative>
				</Box>
			</ScrollAreaNative>
		</>
	)
}

export default Layout
