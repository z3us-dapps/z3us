/* eslint-disable */
import React, { useState } from 'react'
import { MixerHorizontalIcon, ImageIcon, ListBulletIcon } from '@radix-ui/react-icons'
import { PlusIcon, MagnifyingGlassIcon } from 'ui/src/components/icons'
// import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { AccountsList } from '@src/containers/playground/containers/accounts/components/accounts-list'
import { AccountSwitcher } from '@src/containers/playground/containers/accounts/components/account-switcher'
import { AccountActivity } from '@src/containers/playground/containers/accounts/components/account-activity'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { motion } from 'framer-motion'
import { Button } from 'ui/src/components-v2/button'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './accounts-home.css'

export const AccountsHome = () => {
	const [view, setView] = useState<string>('list')
	// const [view, setView] = useState<string>('tileTwo')

	return (
		<Box
			display="flex"
			justifyContent="center"
			paddingRight="large"
			paddingLeft="large"
			paddingBottom="xxlarge"
			paddingTop="xxlarge"
			height="full"
		>
			<Box width="full" maxWidth="xxlarge">
				<Box display="flex" gap="xlarge" height="full">
					<Box
						background="backgroundSecondary"
						boxShadow="shadowMedium"
						paddingTop="xlarge"
						borderRadius="xlarge"
						flexGrow={1}
						overflow="hidden"
						className={styles.leftPanel}
					>
						<Box paddingX="xlarge">
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
								{/* <Button */}
								{/* 	styleVariant="secondary" */}
								{/* 	onClick={() => { */}
								{/* 		setView('list') */}
								{/* 	}} */}
								{/* > */}
								{/* 	<ListBulletIcon /> */}
								{/* 	List */}
								{/* </Button> */}
								{/* <Button */}
								{/* 	styleVariant="secondary" */}
								{/* 	onClick={() => { */}
								{/* 		setView('tileTwo') */}
								{/* 	}} */}
								{/* > */}
								{/* 	<ImageIcon /> */}
								{/* 	NFT 2 */}
								{/* </Button> */}
								{/* <Button */}
								{/* 	styleVariant="secondary" */}
								{/* 	onClick={() => { */}
								{/* 		setView('tileThree') */}
								{/* 	}} */}
								{/* > */}
								{/* 	<ImageIcon /> */}
								{/* 	NFT 3 */}
								{/* </Button> */}
								<Button styleVariant="secondary">
									<MixerHorizontalIcon />
									Apply filter
								</Button>
							</Box>
						</Box>
						<AccountsList view={view as any} />
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