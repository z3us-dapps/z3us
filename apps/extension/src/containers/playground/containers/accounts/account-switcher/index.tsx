/* eslint-disable  @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { ArrowLeftIcon, ArrowRightIcon, Close2Icon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import { AnimatedCard } from '@src/containers/playground/components/animated-card'
import { CardButtons } from '@src/containers/playground/components/card-buttons'
import { ACCOUNTS_ALL } from '@src/containers/playground/constants'
import { useAccountParams } from '@src/hooks/use-account-params'

import * as styles from './account-switcher.css'

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

interface IAccountSwitcherRequiredProps {}

interface IAccountSwitcherOptionalProps {}

interface IAccountSwitcherProps extends IAccountSwitcherRequiredProps, IAccountSwitcherOptionalProps {}

const defaultProps: IAccountSwitcherOptionalProps = {}

export const AccountSwitcher: React.FC<IAccountSwitcherProps> = props => {
	const navigate = useNavigate()
	const { account, assetType, asset } = useAccountParams()
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [cards] = useState<Array<any>>(CARD_COLORS)
	const [selectedIndexCard, setSelectedIndexCard] = useState<number>(0)

	const handleGotoNextAccount = () => {
		if (selectedIndexCard === CARD_COLORS.length - 1) return
		const newIndex = selectedIndexCard + 1
		setSelectedIndexCard(newIndex)
		// eslint-disable-next-line
		const cardAccount = CARD_COLORS.find((item, index) => index === newIndex)
		navigate(`/accounts/${cardAccount.accountName.toLowerCase()}${assetType ? `/${assetType}` : ''}`)
	}

	const handleGotoPrevAccount = () => {
		if (selectedIndexCard === 0) return
		const newIndex = selectedIndexCard - 1
		setSelectedIndexCard(newIndex)
		// eslint-disable-next-line
		const cardAccount = CARD_COLORS.find((item, index) => index === newIndex)
		navigate(`/accounts/${cardAccount.accountName.toLowerCase()}${assetType ? `/${assetType}` : ''}`)
	}

	useEffect(() => {
		if (!isMounted) {
			const cardIndex = CARD_COLORS.findIndex(({ accountName }) => accountName.toLowerCase() === account)
			setSelectedIndexCard(cardIndex)
		}

		setIsMounted(true)
	}, [account])

	return asset ? (
		<Box borderBottom={1} borderColor="borderDivider" borderStyle="solid" flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box className={styles.assetCloseBtnWrapper}>
					<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.back" />}>
						<Button iconOnly styleVariant="ghost" sizeVariant="small" to={`/accounts/${account}/${assetType}`}>
							<Close2Icon />
						</Button>
					</ToolTip>
				</Box>
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<Box paddingBottom="small">
						<TransactionIcon transactionIconSize="large" />
					</Box>
					<Text size="large" color="strong">
						Bitcoin
					</Text>
					<Text size="xxxlarge" weight="medium" color="strong">
						$12,424
					</Text>
					<Text size="xlarge">+4,345 (13.3%)</Text>
				</Box>
				<Box display="flex" paddingTop="large" gap="large" position="relative" paddingBottom="large">
					<CardButtons />
				</Box>
				<Box className={styles.tempBg}>TODO: Chart goes here</Box>
				<Box className={styles.assetChartBtnsWrapper}>
					{[
						{ id: '1W', title: '1W' },
						{ id: '1M', title: '1M' },
						{ id: '3M', title: '3M' },
						{ id: '6M', title: '6M' },
						{ id: '1Y', title: '1Y' },
						{ id: 'all', title: 'All' },
					].map(({ id, title }) => (
						<Button
							key={id}
							rounded
							styleVariant={id === 'all' ? 'secondary' : 'tertiary'}
							sizeVariant="small"
							onClick={() => {}}
						>
							{title}
						</Button>
					))}
				</Box>
			</Box>
		</Box>
	) : (
		<Box className={clsx(styles.accountCardWrapper)}>
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
			<Box display="flex" flexDirection="column" alignItems="center">
				<AnimatePresence initial={false}>
					<motion.ul
						key="cards"
						initial={{ opacity: 0, y: 0 }}
						animate={{
							opacity: 1,
							y: 0,
							x: 0,
						}}
						exit={{ opacity: 0, y: 0 }}
						transition={{ duration: 0.3 }}
						className={styles.cardWrapperAll}
					>
						{cards.map(({ backgroundImage, accountName, accountId, accountBalance }, idx) => (
							<AnimatedCard
								key={accountName}
								backgroundImage={backgroundImage}
								selectedCardIndex={selectedIndexCard}
								cardIndex={idx}
								accountAddress={accountId}
								accountBalance={accountBalance}
								accountName={accountName}
								isAllAccount={accountName === ACCOUNTS_ALL}
							/>
						))}
					</motion.ul>
					<motion.div
						key="buttons"
						initial={{ opacity: 0, x: 0, y: 0, height: 48 }}
						animate={{
							opacity: 1,
							x: 0,
							y: 0,
							height: 48,
						}}
						exit={{ opacity: 0, x: 0, y: 0, height: 48 }}
						transition={{ duration: 0.3 }}
						className={styles.accountCardButtonWrapper}
					>
						<CardButtons />
					</motion.div>
				</AnimatePresence>
			</Box>
		</Box>
	)
}

AccountSwitcher.defaultProps = defaultProps
