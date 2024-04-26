import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useMatches, useOutlet, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { findFieldValue, findMetadataValue } from 'ui/src/services/metadata'

import { useResourceType } from '../../hooks/use-resource-type'
import { Breadcrumbs } from './components/breadcrumbs'
import { MobileBackground } from './components/mobile/background'
import { MobileScrollingButtons } from './components/mobile/scrolling-buttons'
import { AccountTotalValue } from './components/total-value'
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

	useEffect(() => {
		setIsExpanded(rightRef.current?.offsetTop > 0)
	}, [rightRef.current])

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
		<Box className={styles.main} ref={mainRef}>
			<MobileBackground />
			<Box className={styles.panelRight} ref={rightRef}>
				<Suspense key={location.pathname} fallback={<FallbackLoading />}>
					<ErrorBoundary fallbackRender={FallbackRenderer}>{sidebar}</ErrorBoundary>
				</Suspense>
			</Box>
			<Box className={styles.panelLeft} ref={leftRef}>
				<Box className={styles.accountsStickyWrapper}>
					<Breadcrumbs />
					<AccountTotalValue />
				</Box>
				<MobileScrollingButtons resourceId={resourceId} isExpanded={isExpanded} onClick={handleClick} />
				<Suspense key={key} fallback={<FallbackLoading />}>
					<ErrorBoundary fallbackRender={FallbackRenderer}>
						<Box className={styles.outletWrapper}>{outlet}</Box>
					</ErrorBoundary>
				</Suspense>
			</Box>
		</Box>
	)
}

export default Layout
