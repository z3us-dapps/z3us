/* eslint-disable */
import React, { useState } from 'react'

import { MixerHorizontalIcon, ImageIcon, ListBulletIcon } from '@radix-ui/react-icons'
import { PlusIcon, MagnifyingGlassIcon } from 'ui/src/components/icons'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
// import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation, Link as LinkRouter } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/dropdown-profile'
import { AccountsList } from '@src/containers/playground/containers/accounts/accounts-list'
import { AccountSwitcher } from '@src/containers/playground/containers/accounts/account-switcher'
import { AccountActivity } from '@src/containers/playground/containers/accounts/account-activity'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { motion } from 'framer-motion'
import { Button } from 'ui/src/components-v2/button'
import { Button as ButtonLink } from '@src/components/button'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { Link } from '@src/components/link'

import * as styles from './accounts-home.css'

export const AccountsHome = () => {
	const location = useLocation()
	const [view, setView] = useState<string>('list')

	return (
		<Box
			display="flex"
			justifyContent="center"
			paddingX="large"
			paddingBottom="xxlarge"
			paddingTop="xxlarge"
			height="full"
		>
			<Box width="full" maxWidth="xxlarge">
				<Box display="flex" gap="xlarge" height="full">
					<Box
						background="backgroundSecondary"
						boxShadow="shadowMedium"
						borderRadius="xlarge"
						flexGrow={1}
						overflow="hidden"
						className={styles.leftPanel}
					>
						<AnimatePresence initial={false}>
							<Routes location={location} key={location.pathname}>
								<Route
									path="/:account"
									element={
										<AnimatedPage>
											<AccountsRouteWrapper>
												<AccountsIndexAssets />
											</AccountsRouteWrapper>
										</AnimatedPage>
									}
								/>
								<Route
									path="/:account/:assetType"
									element={
										<AnimatedPage>
											<AccountsRouteWrapper>
												<AccountsList view={view as any} />
											</AccountsRouteWrapper>
										</AnimatedPage>
									}
								/>

								{/* <Route */}
								{/* 	path="/:account/:assetType" */}
								{/* 	element={ */}
								{/* 		<AnimatedPage> */}
								{/* 			<AccountsRouteWrapper> */}
								{/* 				<Box>asset type</Box> */}
								{/* 			</AccountsRouteWrapper> */}
								{/* 		</AnimatedPage> */}
								{/* 	} */}
								{/* /> */}
								{/**/}
								{/* <Route */}
								{/* 	path="/:account/:assetType/:asset" */}
								{/* 	element={ */}
								{/* 		<AnimatedPage> */}
								{/* 			<AccountsRouteWrapper> */}
								{/* 				<Box>asset btc in ( account or all )</Box> */}
								{/* 			</AccountsRouteWrapper> */}
								{/* 		</AnimatedPage> */}
								{/* 	} */}
								{/* /> */}
								{/* <Route */}
								{/* 	path="*" */}
								{/* 	element={ */}
								{/* 		<AnimatedPage> */}
								{/* 			<NotFound404 /> */}
								{/* 		</AnimatedPage> */}
								{/* 	} */}
								{/* /> */}
							</Routes>
						</AnimatePresence>
					</Box>
					<Box
						background="backgroundSecondary"
						boxShadow="shadowMedium"
						borderRadius="xlarge"
						className={styles.rightPanel}
					>
						<Box paddingTop="large" paddingX="large" display="flex" alignItems="center">
							<Box flexGrow={1}>
								<Text size="xlarge" weight="medium" color="strong">
									Accounts
								</Text>
							</Box>
							<Button
								styleVariant="ghost"
								sizeVariant="small"
								onClick={() => {
									console.log(99, 'search')
								}}
							>
								<PlusIcon />
								Select account
							</Button>
						</Box>
						<Box
							padding="xlarge"
							borderBottom={1}
							borderColor="borderDivider"
							borderStyle="solid"
							flexShrink={0}
							style={{ height: '280px' }}
						>
							<AccountSwitcher />
						</Box>
						<Box paddingX="large" paddingTop="xlarge">
							<Box display="flex" alignItems="center">
								<Box flexGrow={1}>
									<Text size="large" weight="medium" color="strong">
										Recent activity
									</Text>
								</Box>
								<Button
									styleVariant="ghost"
									sizeVariant="small"
									onClick={() => {
										console.log(99, 'search')
									}}
									iconOnly
								>
									<PlusIcon />
								</Button>
							</Box>
						</Box>
						<AccountActivity />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export const AccountsRouteWrapper = ({ children }) => {
	return (
		<>
			<Box paddingX="xlarge" paddingTop="xlarge">
				<Text size="medium">Account balance</Text>
				<Text weight="strong" size="xxxlarge" color="strong">
					$40,206.25
				</Text>
			</Box>
			<Box paddingX="xlarge" paddingBottom="xlarge" paddingTop="large" display="flex" alignItems="center">
				<Box flexGrow={1} display="flex" alignItems="center">
					<Text size="large" color="strong" weight="medium">
						Assets
					</Text>
				</Box>
				<Box display="flex" gap="small" paddingBottom="large">
					<Button
						styleVariant="ghost"
						iconOnly
						onClick={() => {
							console.log(99, 'search')
						}}
					>
						<MagnifyingGlassIcon />
					</Button>
					<Button styleVariant="secondary">
						<MixerHorizontalIcon />
						Apply filter
					</Button>
				</Box>
			</Box>
			{children}
		</>
	)
}

export const AccountsIndexAssets = () => {
	return (
		<>
			<Box paddingX="xlarge" paddingBottom="xlarge">
				<Box className={styles.indexAssetsWrapper}>
					{[{ name: 'Tokens' }, { name: 'NFTs' }, { name: 'LP Tokens' }, { name: 'Badges' }].map(({ name }) => (
						<Box key={name} className={styles.indexAssetWrapper}>
							<Box flexGrow={1}>
								<Box display="flex" alignItems="center">
									<Text size="large" color="strong" weight="medium">
										{name}
									</Text>
									<Box paddingLeft="xsmall">
										<Text size="large" weight="medium">
											(12)
										</Text>
									</Box>
								</Box>
								<Box display="flex" alignItems="center">
									<Text size="medium" color="strong" weight="medium">
										$12,401
									</Text>
									<Box paddingLeft="xsmall">
										<Text size="small" color="green">
											+1.23%
										</Text>
									</Box>
								</Box>
							</Box>
							<Box>
								<Box display="flex" alignItems="center">
									<Text size="medium" color="strong" weight="medium">
										+7
									</Text>
									<Box display="flex" marginLeft="small">
										<Link to="/">
											<Box className={styles.indexAssetCircle} />
										</Link>
										<Link to="/">
											<Box className={styles.indexAssetCircle} />
										</Link>
									</Box>
									<Box paddingLeft="xsmall">
										<ButtonLink styleVariant="ghost" sizeVariant="small" iconOnly to="/accounts/all/tokens">
											<PlusIcon />
										</ButtonLink>
									</Box>
								</Box>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</>
	)
}
