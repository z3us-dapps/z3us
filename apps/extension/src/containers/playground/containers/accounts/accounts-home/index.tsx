import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import Translation from '@src/components/translation'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { ScrollPanel } from '@src/containers/playground/components/scroll-panel'
import { Z3usLoading } from '@src/containers/playground/components/z3us-loading'
import { routes } from '@src/containers/playground/config'
import { AccountActivity } from '@src/containers/playground/containers/accounts/account-activity'
import { AccountIndexAssets } from '@src/containers/playground/containers/accounts/account-index-assets'
import { AccountIndexHeader } from '@src/containers/playground/containers/accounts/account-index-header'
import { AccountSearch } from '@src/containers/playground/containers/accounts/account-search'
import { AccountSwitcher } from '@src/containers/playground/containers/accounts/account-switcher'
import { AccountTransaction } from '@src/containers/playground/containers/accounts/account-transaction'
import { AccountsList } from '@src/containers/playground/containers/accounts/accounts-list'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './accounts-home.css'

export const AccountsHome = () => {
	const location = useLocation()
	const { account, assetType, asset } = useAccountParams()
	const isAllAccount = account === 'all'

	return (
		<Box
			display="flex"
			justifyContent="center"
			paddingX="large"
			paddingBottom="xxlarge"
			paddingTop="xxlarge"
			height="full"
		>
			<Box height="full" width="full" maxWidth="xxlarge">
				<Box className={clsx(styles.panelWrapper)}>
					<ScrollPanel
						className={styles.leftPanel}
						renderPanel={(scrollableNode: HTMLElement | null, scrollTop: number) => (
							<Box position="relative">
								<AnimatePresence initial={false}>
									<Routes location={location} key={location.pathname}>
										{[routes.ACCOUNT].map(path => (
											<Route
												key="assetshome" // to avoid full re-renders when these routes change
												path={path}
												element={
													<AnimatedPage>
														<AccountIndexHeader scrollTop={scrollTop} />
														<AccountIndexAssets scrollableNode={scrollableNode} />
													</AnimatedPage>
												}
											/>
										))}
										{[routes.ACCOUNT_ASSET_TYPE, routes.ACCOUNT_ASSET].map(path => (
											<Route
												key="assetsList" // to avoid full re-renders when these routes change
												path={path}
												element={
													<AnimatedPage>
														<AccountsList scrollableNode={scrollableNode} scrollTop={scrollTop} />
													</AnimatedPage>
												}
											/>
										))}
									</Routes>
								</AnimatePresence>
							</Box>
						)}
					/>
					<ScrollPanel
						className={styles.rightPanel}
						scrollTopOnRoute
						renderPanel={(panelRef: React.Ref<HTMLElement | null>, scrollTop: number) => (
							<Box>
								{isAllAccount && !assetType ? (
									<Box paddingTop="xlarge" paddingX="xlarge">
										<Box padding="large" background="backgroundPrimary" style={{ width: '100%', height: '200px' }}>
											<Z3usLoading message="Loading" />
											{/* <Z3usLoading message="Loading"> */}
											{/* 	<Box> */}
											{/* 		<Text size="xsmall">Loading</Text> */}
											{/* 	</Box> */}
											{/* </Z3usLoading> */}
										</Box>
									</Box>
								) : (
									<AccountSwitcher scrollTop={scrollTop} />
								)}
								<Box
									paddingX="large"
									paddingTop="xlarge"
									paddingBottom="small"
									className={styles.recentActivityWrapper}
								>
									<Box display="flex" alignItems="center" position="relative" gap="large">
										<Box flexShrink={0}>
											{asset ? (
												<Text size="large" weight="medium" color="strong">
													{asset} <Translation text="global.activity" />
												</Text>
											) : null}
											{!asset ? (
												<Text size="large" weight="medium" color="strong">
													{assetType || 'All'} <Translation text="global.activity" />
												</Text>
											) : null}
										</Box>
										<AccountSearch placeholder="search" />
									</Box>
								</Box>
								<Box paddingBottom="medium">
									<AccountActivity ref={panelRef} />
								</Box>
							</Box>
						)}
					/>
				</Box>
			</Box>
			<AccountTransaction />
		</Box>
	)
}
