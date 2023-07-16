/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
// OLD
// import { AccountIndexAssets } from 'ui/src/containers/accounts/account-index-assets'
// import { AccountIndexHeader } from 'ui/src/containers/accounts/account-index-header'
import { AccountsList } from 'ui/src/containers/accounts/accounts-list'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './account-assets.css'
import { AccountRouteHeader } from './components/account-route-header'
import { AssetsHeader } from './components/assets-header'
import { AssetsTable } from './components/assets-table'
import { MobileScrollingButtons } from './components/mobile-scrolling-buttons'

interface IAccountRoutesProps {
	scrollableNode: HTMLElement
	isScrolledTop: boolean
}

export const AccountAssets: React.FC<IAccountRoutesProps> = props => {
	const { scrollableNode, isScrolledTop } = props

	return (
		<Box className={clsx(styles.accountRoutesWrapper, !isScrolledTop && styles.accountTheadShadow)}>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<Box className={styles.accountRoutesScrollingStickySheet} />
				<MobileScrollingButtons />
				<AssetsHeader isScrolledTop={isScrolledTop} scrollableNode={scrollableNode} />
				<AssetsTable scrollableNode={scrollableNode} />
			</Box>
		</Box>
	)
}
