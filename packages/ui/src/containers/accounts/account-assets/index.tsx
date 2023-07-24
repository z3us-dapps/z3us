/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
// OLD REMOVE
import { AccountIndexAssets } from 'ui/src/containers/accounts/account-index-assets'
// OLD REMOVE
import { AccountIndexHeader } from 'ui/src/containers/accounts/account-index-header'
// OLD REMOVE
import { AccountsList } from 'ui/src/containers/accounts/accounts-list'

import * as styles from './account-assets.css'
import { AssetsHeader } from './components/assets-header'
import { AssetsTable } from './components/assets-table'
import { MobileScrollingBackground } from './components/mobile-scrolling-background'
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
				<MobileScrollingBackground scrollableNode={scrollableNode} />
				<MobileScrollingButtons scrollableNode={scrollableNode} />
				<AssetsHeader isScrolledTop={isScrolledTop} scrollableNode={scrollableNode} />
				<AssetsTable scrollableNode={scrollableNode} />
			</Box>
		</Box>
	)
}
