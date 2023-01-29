/* eslint-disable */
import React, { useState } from 'react'
import { MagnifyingGlassIcon, MixerHorizontalIcon, ImageIcon, ListBulletIcon } from '@radix-ui/react-icons'
// import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { AccountsList } from '@src/containers/playground/containers/accounts/components/accounts-list'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { motion } from 'framer-motion'
// import { Text } from 'ui/src/components-v2/atoms'
import { Button } from 'ui/src/components-v2/button'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import './accounts-home.css'

export const AccountsHome = () => {
	const [view, setView] = useState<string>('list')

	return (
		<Box>
			<Text size="large">HOHOHOH</Text>
		</Box>
	)
}

// return (
// 	<div className="z3-c-accounts-home">
// 		<div className="z3-c-accounts-home__container">
// 			<div className="z3-c-accounts-home__assets">
// 				<div className="z3-c-accounts-home__assets-header">
// 					<div>
// 						<p>
// 							<span>Savings</span> balance:
// 						</p>
// 					</div>
// 					<p>$40,000</p>
// 					<section>
// 						<div>
// 							<p>All assets</p>
// 						</div>
// 						<Button
// 							intent="secondary"
// 							onClick={() => {
// 								setView('list')
// 							}}
// 						>
// 							<ListBulletIcon />
// 							List
// 						</Button>
// 						<Button
// 							intent="secondary"
// 							onClick={() => {
// 								setView('tileTwo')
// 							}}
// 						>
// 							<ImageIcon />
// 							NFT 2
// 						</Button>
// 						<Button
// 							intent="secondary"
// 							onClick={() => {
// 								setView('tileThree')
// 							}}
// 						>
// 							<ImageIcon />
// 							NFT 3
// 						</Button>
// 						<Button intent="secondary">
// 							<MixerHorizontalIcon />
// 							Filter
// 						</Button>
// 					</section>
// 				</div>
// 				<AccountsList view={view as any} />
// 			</div>
// 			<div className="z3-c-accounts-home__cards">
// 				<div className="p-5">
// 					<p>Accounts</p>
// 				</div>
// 				<div className="p-5" style={{ overflow: 'auto', display: 'none' }}>
// 					<div>
// 						<p>
// 							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
// 							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
// 							scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
// 							into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
// 							release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
// 							software like Aldus PageMaker including versions of Lorem Ipsum.
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// )
