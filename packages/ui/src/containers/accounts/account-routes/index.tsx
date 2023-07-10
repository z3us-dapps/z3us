/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
// OLD
import { AccountIndexAssets } from 'ui/src/containers/accounts/account-index-assets'
import { AccountIndexHeader } from 'ui/src/containers/accounts/account-index-header'
import { AccountsList } from 'ui/src/containers/accounts/accounts-list'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './account-routes.css'
import { AccountRouteHeader } from './components/account-route-header'
import { AccountTable } from './components/account-table'
import { MobileScrollingButtons } from './components/mobile-scrolling-buttons'

export const hash = () => Math.random().toString(36).substring(7)

interface IAccountRoutesProps {
	scrollableNode: HTMLElement
}

export const AccountRoutes: React.FC<IAccountRoutesProps> = props => {
	const { scrollableNode } = props
	const [items, setItems] = useState<any>([])

	// TODO: demo data fetching
	useEffect(() => {
		setItems(Array.from({ length: 40 }, _ => ({ id: hash(), name: hash(), loaded: false, symbol: 'xrd' })))
	}, [])

	return (
		<Box className={styles.accountRoutesWrapper}>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<Box className={styles.accountRoutesScrollingStickySheet} />
				<MobileScrollingButtons />
				<AccountTable scrollableNode={scrollableNode} />
			</Box>
		</Box>
	)
}

// return (
// 	<>
// 		<AccountIndexHeader />
// 		<AccountIndexAssets scrollableNode={scrollableNode} />
// 	</>
// )
