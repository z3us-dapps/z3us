/* eslint-disable */
import React, { useState } from 'react'
import { MixerHorizontalIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { PlusIcon, MagnifyingGlassIcon, ArrowLeftIcon } from 'ui/src/components/icons'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Routes, Route, useLocation, Link as LinkRouter, useNavigate } from 'react-router-dom'
import { AccountsList } from '@src/containers/playground/containers/accounts/accounts-list'
import { AccountSwitcher } from '@src/containers/playground/containers/accounts/account-switcher'
import { AccountActivity } from '@src/containers/playground/containers/accounts/account-activity'
// TODO: remove??
// import { AccountTransaction } from '@src/containers/playground/containers/accounts/account-transaction'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { Button } from '@src/components/button'
import { Avatar, AvatarImage, AvatarFallback } from 'ui/src/components-v2/avatar'
import { Input } from 'ui/src/components-v2/input'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
// inone { Button as ButtonLink } from '@src/components/button'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { Link } from '@src/components/link'

import * as styles from './accounts-home.css'

export const AccountsHome = () => {
	const location = useLocation()
	const { account, assetType, asset } = useAccountParams()
	const [view, setView] = useState<'list' | 'two-col' | 'three-col'>('list')

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
					<Box
						background="backgroundSecondary"
						boxShadow="shadowMedium"
						borderRadius="xlarge"
						flexGrow={1}
						overflow="hidden"
						className={styles.leftPanel}
					>
						<AccountsRouteWrapper view={view} setView={setView} />
						<Box position="relative">
							<AnimatePresence initial={false}>
								<Routes location={location} key={location.pathname}>
									<Route
										path="/:account"
										element={
											<AnimatedPage>
												<AccountsIndexAssets />
											</AnimatedPage>
										}
									/>

									{['/:account/:assetType', '/:account/:assetType/:asset'].map(path => (
										<Route
											key="Assets" // optional: avoid full re-renders on route changes
											path={path}
											element={
												<AnimatedPage>
													<AccountsList view={view as any} />
												</AnimatedPage>
											}
										/>
									))}
								</Routes>
							</AnimatePresence>
						</Box>
					</Box>
					<Box
						background="backgroundSecondary"
						boxShadow="shadowMedium"
						borderRadius="xlarge"
						className={clsx(styles.rightPanel, assetType && styles.rightPanelAssetType)}
					>
						<AccountSwitcher />
						<Box paddingX="large" paddingTop="xlarge" paddingBottom="small" className={styles.recentActivityWrapper}>
							<Box display="flex" alignItems="center" position="relative">
								<Box flexGrow={1}>
									{asset ? (
										<Text size="large" weight="medium" color="strong">
											{asset} activity
										</Text>
									) : null}
									{!asset ? (
										<Text size="large" weight="medium" color="strong">
											Account {assetType ? assetType : ''} activity
										</Text>
									) : null}
								</Box>
								<Button
									styleVariant="ghost"
									sizeVariant="small"
									onClick={() => {
										console.log(99, 'search')
									}}
									iconOnly
								>
									<MagnifyingGlassIcon />
								</Button>
							</Box>
						</Box>
						<AccountActivity flexGrowWrapper={!assetType} />{' '}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export const AccountsRouteWrapper = ({ setView, view }: any) => {
	const { account, assetType, asset } = useAccountParams()
	const navigate = useNavigate()

	return (
		<Box position="relative">
			<Box paddingX="xlarge" paddingY="xlarge" display="flex">
				<Box flexGrow={1}>
					<Box display="flex" alignItems="center" paddingBottom="xsmall">
						{/* account */}
						{assetType ? (
							<Box>
								<Link to={`/accounts/${account}`}>
									<Text size="large">Overview{account ? `: ${account}` : ''}</Text>
								</Link>
							</Box>
						) : (
							<Box>
								<Text size="large">Account balance</Text>
								{/* <Text size="large">Accounts{account ? `: ${account}` : ''}</Text> */}
							</Box>
						)}
						{/* asset type */}
						{assetType ? (
							<Box display="flex" alignItems="center">
								<Box paddingX="small">
									<ChevronRightIcon />
								</Box>
								{asset ? (
									<Link to={`/accounts/${account}/${assetType}`}>
										<Text size="large">{assetType}</Text>
									</Link>
								) : (
									<Text size="large" color="strong">
										{assetType}
									</Text>
								)}
							</Box>
						) : null}
						{/* asset  */}
						{asset ? (
							<Box display="flex" alignItems="center">
								<Box paddingX="small">
									<ChevronRightIcon />
								</Box>
								<Text size="large" color="strong">
									{asset}
								</Text>
							</Box>
						) : null}
					</Box>
					<Text weight="strong" size="xxxlarge" color="strong">
						$4,440,206.25
					</Text>
				</Box>

				{/* TODO: create class to hide with css */}
				{assetType || asset ? (
					<Box>
						<Button
							styleVariant="ghost"
							iconOnly
							onClick={() => {
								console.log(99, 'header search')
							}}
						>
							<MagnifyingGlassIcon />
						</Button>
					</Box>
				) : null}
			</Box>
			<Box paddingX="xlarge" paddingBottom="xlarge" paddingTop="large" display="none" alignItems="center">
				<Box display="flex" gap="small">
					<Input placeholder="Search the tokens" />
					<Button
						styleVariant="secondary"
						onClick={() => {
							console.log(99, 'search')
						}}
					>
						<MagnifyingGlassIcon />
						Search
					</Button>
					{/* <ToolTip message="Yoooooo"> */}
					{/* 	<Button styleVariant="secondary"> */}
					{/* 		<MixerHorizontalIcon /> */}
					{/* 		Apply filter */}
					{/* 	</Button> */}
					{/* </ToolTip> */}
				</Box>
			</Box>
		</Box>
	)
}

export const AccountsIndexAssets = () => {
	return (
		<>
			<Box paddingBottom="xlarge" borderTop={1} borderColor="borderDivider" borderStyle="solid">
				<Box display="flex" paddingBottom="small" paddingTop="xlarge" paddingX="xlarge" alignItems="center">
					<Box flexGrow={1}>
						<Text size="xlarge" color="strong" weight="medium">
							Assets and badges
						</Text>
					</Box>
					<Box>
						<Button
							styleVariant="ghost"
							iconOnly
							onClick={() => {
								console.log(99, 'header search')
							}}
						>
							<MagnifyingGlassIcon />
						</Button>
					</Box>
				</Box>
				<Box className={styles.indexAssetsWrapper}>
					{[{ name: 'Tokens' }, { name: 'NFTs' }, { name: 'LP Tokens' }, { name: 'Badges' }].map(({ name }) => (
						<Box key={name} className={styles.indexAssetWrapper}>
							<Link to="/accounts/all/tokens" underline="never" className={styles.indexAssetLinkRow}>
								<Box flexGrow={1} paddingY="large" position="relative">
									<Box display="flex" alignItems="center">
										<Text size="medium" color="strong" weight="medium">
											{name}
										</Text>
										<Box paddingLeft="xsmall">
											<Text size="medium" weight="medium">
												(12)
											</Text>
										</Box>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong" weight="medium">
											$12,401
										</Text>
										<Box paddingLeft="xsmall">
											<Text size="small" color="green">
												+1.23%
											</Text>
										</Box>
									</Box>
								</Box>
							</Link>
							<Box className={styles.indexAssetRowOverlay}>
								<Box display="flex" alignItems="center" marginRight="large">
									<Text size="xsmall" weight="medium">
										+7
									</Text>
								</Box>

								{[...Array(4)].map((x, i) => (
									<Link key={i} to="/accounts/all/tokens" className={styles.indexAssetCircle}>
										<Avatar>
											<AvatarImage
												className="AvatarImage"
												src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
												alt="Colm Tuite"
											/>
											<AvatarFallback className="AvatarFallback" delayMs={600}>
												CT
											</AvatarFallback>
										</Avatar>
									</Link>
								))}

								<Box paddingLeft="xsmall">
									<PlusIcon />
								</Box>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</>
	)
}
