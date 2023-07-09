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

import * as styles from './mobile-scrolling-button.css'

export const hash = () => Math.random().toString(36).substring(7)

interface IMobileScrollingButtonsProps {
	scrollableNode?: HTMLElement
}

export const MobileScrollingButtons: React.FC<IMobileScrollingButtonsProps> = props => {
	const { scrollableNode } = props
	const [items, setItems] = useState<any>([])

	return (
		<Box className={styles.accountRoutesScrollingStickyBtnWrapper}>
			<Box className={styles.accountRoutesScrollingStickyBtnInner}>
				<Text>buttons wil live </Text>
			</Box>
		</Box>
	)
}