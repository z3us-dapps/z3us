/* eslint-disable */
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import Translation from '@src/components/translation'
import { AnimatedCard } from '@src/containers/playground/components/animated-card'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { CardButtons } from '@src/containers/playground/components/card-buttons'
import { CopyAddressButton } from '@src/containers/playground/components/copy-address-button'
import { ScrollPanel } from '@src/containers/playground/components/scroll-panel'
import { Z3usLoading } from '@src/containers/playground/components/z3us-loading'
import { routes } from '@src/containers/playground/config'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './accounts-home-mobile.css'

const CARD_COLORS = [
	{
		// accountId: 'rdx1...ldg0',
		accountName: 'all',
		accountBalance: '$80,043.43',
		// backgroundImage:
		// 	'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
	{
		accountId: 'rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce',
		accountName: 'Spend',
		accountBalance: '$1043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
	},
	{
		accountId: 'rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce',
		accountName: 'Savings',
		accountBalance: '$5043.43',
		backgroundImage:
			'url("/images/account-images/z3us-athens.png"), radial-gradient(77.21% 96.45% at 50% 100%, #C0D7EF 0%, #C0D7EF 17.71%, #C0D7EF 50.52%, #C0D7EF 100%)',
	},
	{
		accountId: 'rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce',
		accountName: 'Defi',
		accountBalance: '$80,043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
]

export const AccountsHomeMobileHeader = () => {
	const location = useLocation()
	const [cards] = useState<Array<any>>(CARD_COLORS)
	const elementRef = useRef<HTMLDivElement | null>(null)
	const entry = useIntersectionObserver(elementRef, {
		threshold: [1],
	})
	const isSticky = !entry?.isIntersecting

	return (
		<>
			<Box className={styles.accountsHomeHeaderAccount}>
				<AnimatePresence initial={false}>
					<Box component="ul" className={styles.cardWrapperAll}>
						{cards.map(({ accountName, accountId, accountBalance }, idx) => (
							<AnimatedCard
								key={accountName}
								selectedCardIndex={1}
								cardIndex={idx}
								animateOnScroll={false}
								accountAddress={accountId}
								accountBalance={accountBalance}
								accountName={accountName}
								showCopyAddressButton
							/>
						))}
					</Box>
				</AnimatePresence>
				<Box position="relative" zIndex={1} marginTop="large">
					<CardButtons />
				</Box>
			</Box>
			<Box ref={elementRef} className={styles.accountsHomeHeaderSticky}>
				<Box
					className={clsx(
						styles.accountsHomeHeaderStickyScrolled,
						isSticky && styles.accountsHomeHeaderStickyScrolledIs,
					)}
				>
					<Box className={styles.accountsHomeHeaderStickyScrolledInner}>
						<CopyAddressButton
							styleVariant="white-transparent"
							address="rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce"
						/>
					</Box>
				</Box>
				<Box className={clsx(styles.accountsHomeHeaderStickyVis, isSticky && styles.accountsHomeHeaderStickyVisIs)}>
					header sticky
				</Box>
			</Box>
		</>
	)
}
