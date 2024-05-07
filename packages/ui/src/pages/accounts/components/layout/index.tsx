import clsx from 'clsx'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useMatches, useOutlet, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
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
	const key = useMemo(() => location.pathname.split('/')[2] || '-', [location.pathname])

	const { data: resource } = useEntityDetails(resourceId)
	const { data: nft } = useNonFungibleData(resourceId, nftId)

	const mainRef = useRef<HTMLElement>()
	const rightRef = useRef<HTMLElement>()
	const leftRef = useRef<HTMLElement>()
	const {
		leftScrollCtx,
		rightScrollCtx,
		isLeftScrollUpButtonVisible,
		isRightScrollUpButtonVisible,
		onLeftScrollUpBtnClick,
		onRightScrollUpBtnClick,
	} = useAccountsScroll(leftRef, rightRef, mainRef, location.pathname)
	const [isExpanded, setIsExpanded] = useState<boolean>(false)

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

	// TODO: will move to hook
	useEffect(() => {
		const element = mainRef.current
		if (!element) return () => {}
		const listener = () => {
			setIsExpanded(rightRef.current?.clientHeight === rightRef.current?.offsetTop)
		}
		element.addEventListener('scroll', listener)
		return () => {
			element.removeEventListener('scroll', listener)
		}
	}, [leftRef.current, mainRef.current])

	// TODO: will move to hook
	const handleClick = () => {
		if (isExpanded) {
			mainRef.current?.scrollTo({ behavior: 'smooth', top: 0 })
			setIsExpanded(false)
		} else {
			leftRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
			setIsExpanded(true)
		}
	}

	return (
		<>
			<CardBackground view="mobile" />
			<ScrollAreaNative className={styles.mainMobileScroll} ref={mainRef} hideScrollBars>
				<Box className={styles.panelRight}>
					<ScrollAreaNative
						ref={rightRef}
						showScrollUpButton
						onUpButtonClicked={onRightScrollUpBtnClick}
						isScrollUpButtonVisible={isRightScrollUpButtonVisible}
						className={styles.panelRightScroll}
					>
						<ScrollContext.Provider value={rightScrollCtx}>
							<Suspense key={location.pathname} fallback={<FallbackLoading />}>
								<ErrorBoundary fallbackRender={FallbackRenderer}>{sidebar}</ErrorBoundary>
							</Suspense>
						</ScrollContext.Provider>
					</ScrollAreaNative>
				</Box>
				<MobileScrollingButtons isExpanded={isExpanded} onClick={handleClick} />
				<Box
					className={styles.panelLeft}
					borderTopLeftRadius={isExpanded ? undefined : 'xxxlarge'}
					borderTopRightRadius={isExpanded ? undefined : 'xxxlarge'}
				>
					<ScrollAreaNative
						ref={leftRef}
						showScrollUpButton
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
							<Suspense key={key} fallback={<FallbackLoading />}>
								<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
							</Suspense>
						</ScrollContext.Provider>
					</ScrollAreaNative>
				</Box>
			</ScrollAreaNative>
		</>
	)
}

export default Layout
