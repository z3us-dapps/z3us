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
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './account-routes.css'

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
			<Box className={styles.accountRoutesMobileAccountHeader}>
				<Text>This is the mobile account info box</Text>
			</Box>
			<Box className={styles.accountRoutesScrollingStickySheet} />
			<Box className={styles.accountRoutesScrollingWrapper}>
				<Box className={styles.accountRoutesScrollingStickyBtnWrapper}>
					<Box className={styles.accountRoutesScrollingStickyBtnInner}>
						<Text>buttons wil live </Text>
					</Box>
				</Box>
				<Box>
					<Box padding="large">
						{Array.from({ length: 2 }, (_, i) => (
							<Text size="xlarge" key={i}>
								Lorum ipsumIn convallis vel neque facilisis est mi in varius gravida eget convallis convallis ut velit
								lacus, eros faucibus odio. Varius dui porttitor eu ac egestas in tempus nisi suscipit fusce urna. Vitae
								semper velit facilisis nunc, suspendisse vivamus duis vestibulum ullamcorper dui lectus sapien tempus
								sit eu dapibus arcu pellentesque.
							</Text>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
