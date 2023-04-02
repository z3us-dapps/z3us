/* eslint-disable */
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'

import { Link } from '@src/components/link'
import React, { forwardRef, useRef, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { Box } from 'ui/src/components-v2/box'
import { Input } from 'ui/src/components-v2/input'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronDown3Icon, SearchIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import Translation from '@src/components/translation'
import { AnimatedCard } from '@src/containers/playground/components/animated-card'
import { CardButtons } from '@src/containers/playground/components/card-buttons'
import { routes, ACCOUNTS_ALL } from '@src/containers/playground/config'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './accounts-home-mobile.css'
import { SEARCH_ACTIVITY_PARAM } from './constants'

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

interface IAccountsHomeMobileHeaderRequiredProps {
	isScrolledPastHeader: boolean
	onClickChevron: () => void
	isAreaScrollable: boolean
	isActivityRoute: boolean
}

interface IAccountsHomeMobileHeaderOptionalProps {
	className?: number
}

interface IAccountsHomeMobileHeaderProps
	extends IAccountsHomeMobileHeaderRequiredProps,
		IAccountsHomeMobileHeaderOptionalProps {}

const defaultProps: IAccountsHomeMobileHeaderOptionalProps = {
	className: undefined,
}

export const AccountsHomeMobileHeader = forwardRef<HTMLElement, IAccountsHomeMobileHeaderProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, isScrolledPastHeader, onClickChevron, isAreaScrollable, isActivityRoute } = props
		const { account, assetType, asset } = useAccountParams()
		const isAllAccount = account === ACCOUNTS_ALL
		const [cards] = useState<Array<any>>(CARD_COLORS)
		const elementRef = useRef<HTMLDivElement | null>(null)
		const entry = useIntersectionObserver(elementRef, { threshold: [1] })
		const isSticky = !entry?.isIntersecting

		const generateAccountLink = (isActivity: boolean) =>
			`/${routes.ACCOUNTS}${account ? `/${account}` : ''}${assetType ? `/${assetType}` : ''}${
				asset ? `/${asset}` : ''
			}${isActivity ? `?${SEARCH_ACTIVITY_PARAM}=true` : ''}`

		return (
			<>
				<Box
					ref={ref}
					className={clsx(styles.accountsHomeHeaderAccount, className)}
					style={{
						backgroundImage: !isAllAccount
							? 'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)'
							: '',
					}}
				>
					{isAllAccount ? (
						<Box className={styles.accountsHomeHeadAll}>
							<Box className={styles.accountsHomeAllChart}></Box>
							<Box marginTop="medium">
								<Text color="strong" align="center" size="xxlarge">
									Total balance
								</Text>
								<Text color="strong" align="center" size="xlarge">
									$13,300
								</Text>
								<Text align="center" size="xlarge">
									+2.43%
								</Text>
							</Box>
						</Box>
					) : (
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
					)}
					<Box position="relative" zIndex={1} marginTop="large">
						<CardButtons theme="backgroundSecondary" />
					</Box>
				</Box>
				<Box ref={elementRef} className={styles.accountsHomeHeaderSticky}>
					<Box
						className={clsx(
							styles.accountsHomeHeaderStickyScrolled,
							isSticky && styles.accountsHomeHeaderStickyScrolledIs,
						)}
						style={{
							backgroundImage: !isAllAccount
								? 'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)'
								: '',
						}}
					/>
					<Box className={clsx(styles.accountsHomeHeaderStickyVis, isSticky && styles.accountsHomeHeaderStickyVisIs)}>
						<Box className={styles.tabsWrapper}>
							<Link
								underline="never"
								to={generateAccountLink(false)}
								className={clsx(
									styles.tabsWrapperButton,
									styles.tabsWrapperButtonLeft,
									!isActivityRoute && styles.tabsWrapperButtonActive,
								)}
							>
								<Text size="medium" weight="strong" align="center" color={!isActivityRoute ? 'strong' : 'neutral'}>
									Assets
								</Text>
							</Link>
							<Link
								underline="never"
								to={generateAccountLink(true)}
								className={clsx(
									styles.tabsWrapperButton,
									styles.tabsWrapperButtonRight,
									isActivityRoute && styles.tabsWrapperButtonActive,
								)}
							>
								<Text size="medium" weight="strong" align="center" color={isActivityRoute ? 'strong' : 'neutral'}>
									Activity
								</Text>
							</Link>
							<Button
								styleVariant="ghost"
								sizeVariant="small"
								iconOnly
								className={clsx(
									styles.tabsWrapperScrollBtn,
									isScrolledPastHeader && styles.tabsWrapperScrollBtnScrolled,
									!isAreaScrollable && styles.tabsWrapperScrollBtnHidden,
								)}
								onClick={onClickChevron}
							>
								<ChevronDown3Icon />
							</Button>
						</Box>
						<Box className={styles.inputSearchWrapper}>
							<Input
								sizeVariant="small"
								className={styles.inputSearch}
								value=""
								placeholder="Search"
								rounded
								leftIcon={<SearchIcon />}
								// className={styles.inputElement}
								// placeholder={placeholder}
								// onChange={handleOnChange}
							/>
						</Box>
					</Box>
				</Box>
			</>
		)
	},
)

AccountsHomeMobileHeader.defaultProps = defaultProps
