import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useMatches, useOutlet, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ScrollAreaNative, ScrollContext } from 'ui/src/components/scroll-area-native'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { findFieldValue, findMetadataValue } from 'ui/src/services/metadata'

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
	const location = useLocation()
	const outlet = useOutlet()
	const matches = useMatches()
	const accounts = useWalletAccounts()
	const resourceType = useResourceType()
	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined

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
	} = useAccountsScroll(leftRef, rightRef, mainRef, location.pathname)
	const { isExpanded, onExpandAccounts } = useAccountsExpand(mainRef, buttonsRef, location.pathname)

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
				<Box className={styles.panelRight}>
					<ScrollAreaNative
						ref={rightRef}
						onUpButtonClicked={onRightScrollUpBtnClick}
						isScrollUpButtonVisible={isRightScrollUpButtonVisible}
						className={styles.panelRightScroll}
					>
						<ScrollContext.Provider value={rightScrollCtx}>{sidebar}</ScrollContext.Provider>
					</ScrollAreaNative>
				</Box>
				<MobileScrollingButtons ref={buttonsRef} isExpanded={isExpanded} onClick={onExpandAccounts} />
				<Box className={styles.panelLeft}>
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
							{outlet}
						</ScrollContext.Provider>
					</ScrollAreaNative>
				</Box>
			</ScrollAreaNative>
		</>
	)
}

export default Layout
