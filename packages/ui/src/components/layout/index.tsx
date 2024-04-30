import clsx from 'clsx'
import React, { Suspense, useEffect, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { HeaderNav, MobileFooterNavigation } from 'ui/src/components/navigation'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { BalancesProvider } from 'ui/src/context/balances/provider'
import { RnsProvider } from 'ui/src/context/rns-provider'
import TokensProvider from 'ui/src/context/tokens/provider'
import { useTextDirection } from 'ui/src/hooks/use-text-direction'

import { QueryResult } from './query-result'
import * as styles from './styles.css'
import { Transaction } from './transaction'

const Layout: React.FC = () => {
	const [dir] = useTextDirection()
	const location = useLocation()
	const outlet = useOutlet()

	const key = useMemo(() => location.pathname.split('/')[1], [location.pathname])

	useEffect(() => {
		document.dir = dir
	}, [dir])

	return (
		<RnsProvider>
			<TokensProvider>
				<BalancesProvider>
					<Box className={styles.layoutWrapper}>
						<HeaderNav />
						<Box height="full" className={clsx(containerStyles.containerWrapper)}>
							<Box height="full" className={clsx(containerStyles.containerInnerWrapper)}>
								<Suspense key={key} fallback={<FallbackLoading />}>
									<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
								</Suspense>
							</Box>
						</Box>
						<MobileFooterNavigation />
						<Transaction />
						<QueryResult />
					</Box>
				</BalancesProvider>
			</TokensProvider>
		</RnsProvider>
	)
}

export default Layout
