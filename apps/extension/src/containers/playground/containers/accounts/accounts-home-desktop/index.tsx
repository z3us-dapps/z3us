import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'

import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { ScrollPanel } from '@src/containers/playground/components/scroll-panel'
import { Z3usLoading } from '@src/containers/playground/components/z3us-loading'
import { ACCOUNTS_ALL, routes } from '@src/containers/playground/constants'
import { AccountActivity } from '@src/containers/playground/containers/accounts/account-activity'
import { AccountIndexAssets } from '@src/containers/playground/containers/accounts/account-index-assets'
import { AccountIndexHeader } from '@src/containers/playground/containers/accounts/account-index-header'
import { AccountSearch } from '@src/containers/playground/containers/accounts/account-search'
import { AccountSwitcher } from '@src/containers/playground/containers/accounts/account-switcher'
import { AccountsList } from '@src/containers/playground/containers/accounts/accounts-list'
import { useAccountParams } from '@src/hooks/use-account-params'

import * as styles from './accounts-home-desktop.css'

export const AccountsHomeDesktop = () => {
	const location = useLocation()
	const { t } = useTranslation()
	const { account, assetType, asset } = useAccountParams()
	const isAllAccount = account === ACCOUNTS_ALL

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
						renderPanel={(scrollableNode: HTMLElement | null, scrollTop: number) => (
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
								<AccountSearch
									scrollableNode={scrollableNode}
									searchTitle={
										asset
											? `${asset} ${t('global.activity')}`
											: `${assetType || t('global.all')} ${t('global.activity')}`
									}
									onChange={(search: string) => {
										// eslint-disable-next-line
										console.log('search:', search)
									}}
								/>
								<Box position="relative" paddingBottom="medium" background="backgroundSecondary">
									<AccountActivity scrollableNode={scrollableNode} />
								</Box>
							</Box>
						)}
					/>
				</Box>
			</Box>
		</Box>
	)
}
