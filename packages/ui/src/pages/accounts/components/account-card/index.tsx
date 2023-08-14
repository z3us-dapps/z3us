/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'

import { AccountCards } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { CardButtons } from 'ui/src/components/card-buttons'
import { ArrowLeftIcon, ArrowRightIcon, Close2Icon } from 'ui/src/components/icons'

import * as styles from './account-card.css'

const CARD_COLORS = [
	{
		// accountId: 'rdx1...ldg0',

		accountId: '__all-accounts__',
		accountName: 'all',
		accountBalance: '$80,043.43',
		// backgroundImage:
		// 	'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
	{
		accountId: 'rdx1b70738833bf701d533e143d8f698c9090f605e677a967eafdfdfdf0a4c69250ce',
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
		accountId: 'rdx1b707388613169bf701d533e143d8f6idfidufidjfidjfidjf',
		accountName: 'Defi',
		accountBalance: '$80,043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
]

export const AccountCard: React.FC = () => {
	const navigate = useNavigate()
	const match = useMatch('/accounts/:accountId/:resourceType/:resourceId')
	const { accountId = '-', resourceType, resourceId } = match?.params || {}
	const [isMounted, setIsMounted] = useState<boolean>(false)
	// const [cards] = useState<Array<any>>(CARD_COLORS)
	const [selectedIndexCard, setSelectedIndexCard] = useState<number>(0)

	const handleGotoNextAccount = () => {
		if (selectedIndexCard === CARD_COLORS.length - 1) return
		const newIndex = selectedIndexCard + 1
		setSelectedIndexCard(newIndex)
		// eslint-disable-next-line
		const cardAccount = CARD_COLORS.find((item, index) => index === newIndex)
		navigate(`/accounts/${cardAccount.accountName.toLowerCase()}/${resourceType}/${resourceId}`)
	}

	const handleGotoPrevAccount = () => {
		if (selectedIndexCard === 0) return
		const newIndex = selectedIndexCard - 1
		setSelectedIndexCard(newIndex)
		// eslint-disable-next-line
		const cardAccount = CARD_COLORS.find((item, index) => index === newIndex)
		navigate(`/accounts/${cardAccount.accountName.toLowerCase()}/${resourceType}/${resourceId}`)
	}

	useEffect(() => {
		if (!isMounted) {
			const cardIndex = CARD_COLORS.findIndex(({ accountName }) => accountName.toLowerCase() === accountId)
			setSelectedIndexCard(cardIndex)
		}

		setIsMounted(true)
	}, [accountId])

	return (
		<Box className={styles.accountCardWrapper}>
			<Box display="flex" gap="small" className={styles.tempyy}>
				<Button
					iconOnly
					styleVariant="ghost"
					sizeVariant="small"
					onClick={handleGotoPrevAccount}
					disabled={selectedIndexCard === 0}
				>
					<ArrowLeftIcon />
				</Button>
				<Button
					iconOnly
					styleVariant="ghost"
					sizeVariant="small"
					onClick={handleGotoNextAccount}
					disabled={selectedIndexCard === CARD_COLORS.length - 1}
				>
					<ArrowRightIcon />
				</Button>
			</Box>
			<Box className={styles.accountCardInnerWrapper}>
				<Box className={styles.accountHeightFlexWrapper}>
					<AccountCards accountCards={CARD_COLORS} selectedCardIndex={selectedIndexCard} />
				</Box>
				<Box className={styles.accountCardButtonWrapper}>
					<CardButtons />
				</Box>
			</Box>
		</Box>
	)
}
