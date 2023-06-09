/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { forwardRef, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { type FormElement, Input } from 'ui/src/components-v2/input'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronDown3Icon, ChevronLeftIcon, Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { isEmpty } from 'ui/src/utils/assertion'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { AnimatedCard } from '@src/components/animated-card'
import { Button } from '@src/components/button'
import { CardButtons } from '@src/components/card-buttons'
import { Link } from '@src/components/link'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import {
	ACCOUNTS_ALL,
	ASSET_TYPE_BADGES,
	ASSET_TYPE_LP_TOKENS,
	ASSET_TYPE_NFTS,
	ASSET_TYPE_TOKENS,
	SEARCH_ACTIVITY_PARAM,
	routes,
} from '@src/constants'
import { useAccountParams } from '@src/hooks/use-account-params'

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

interface IAccountsHomeMobileHeaderRequiredProps {
	isScrolledPastHeader: boolean
	onClickChevron: () => void
	onSearch: (search: string) => void
	search: string
	isAreaScrollable: boolean
	isActivityRoute: boolean
}

interface IAccountsHomeMobileHeaderOptionalProps {
	className?: ClassValue
	backgroundStyle?: React.CSSProperties
}

interface IAccountsHomeMobileHeaderProps
	extends IAccountsHomeMobileHeaderRequiredProps,
		IAccountsHomeMobileHeaderOptionalProps {}

const defaultProps: IAccountsHomeMobileHeaderOptionalProps = {
	className: undefined,
	backgroundStyle: undefined,
}

export const AccountsHomeMobileHeader = forwardRef<HTMLElement, IAccountsHomeMobileHeaderProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const {
			className,
			isScrolledPastHeader,
			onClickChevron,
			isAreaScrollable,
			isActivityRoute,
			backgroundStyle,
			search,
			onSearch,
		} = props
		const { account, assetType, asset } = useAccountParams()
		const isAllAccount = account === ACCOUNTS_ALL && !asset
		const [cards] = useState<Array<any>>(CARD_COLORS)
		const elementRef = useRef<HTMLDivElement | null>(null)
		const entry = useIntersectionObserver(elementRef, { threshold: [1] })

		const { t } = useTranslation()

		const isSticky = !entry?.isIntersecting

		const generateAccountLink = (isActivity = false, generateAssetLink = false) =>
			`/${routes.ACCOUNTS}${account ? `/${account}` : ''}${assetType ? `/${assetType}` : ''}${
				generateAssetLink && asset ? `/${asset}` : ''
			}${isActivity ? `?${SEARCH_ACTIVITY_PARAM}=true` : ''}`

		const clickBackLink = `/${routes.ACCOUNTS}${account ? `/${account}` : ''}`

		const handleSearch = (event: React.ChangeEvent<FormElement>) => {
			onSearch(event.currentTarget.value || '')
		}

		const handleClearSearch = () => {
			onSearch('')
		}

		const getTabTitle = () => {
			switch (assetType) {
				case ASSET_TYPE_TOKENS: {
					return (
						<>
							{/* TODO: if the asset is XRD, should say `coin` not `token`  */}
							<Translation capitalizeFirstLetter text="accounts.home.assetsTokens" />
							{asset ? ` (${asset.toUpperCase()})` : ''}
						</>
					)
				}
				case ASSET_TYPE_LP_TOKENS: {
					return <Translation capitalizeFirstLetter text="accounts.home.assetsLpTokens" />
				}
				case ASSET_TYPE_NFTS: {
					return <Translation capitalizeFirstLetter text="accounts.home.assetsNfts" />
				}
				case ASSET_TYPE_BADGES: {
					return <Translation capitalizeFirstLetter text="accounts.home.assetsBadges" />
				}
				default:
					return <Translation capitalizeFirstLetter text="global.assets" />
			}
		}

		const generateHeaderSection = () => {
			if (isAllAccount) {
				return (
					<Box className={styles.accountsHomeHeadAll}>
						<Box className={styles.accountsHomeAllChart} />
						<Box marginTop="medium">
							<Text color="strong" align="center" size="xxlarge">
								<Translation capitalizeFirstLetter text="accounts.home.accountBalanceTitle" />
							</Text>
							<Text color="strong" align="center" size="xlarge">
								$13,300
							</Text>
							<Text align="center" size="xlarge">
								+2.43%
							</Text>
						</Box>
					</Box>
				)
			}

			if (asset) {
				return (
					<Box className={styles.accountsHomeHeadAll}>
						<TransactionIcon
							transactionIconSize="large"
							transactionType="deposit"
							transactionIconBorderColor="borderDividerSecondary"
							transactionIconShadow={false}
						/>
						<Box marginTop="medium">
							<Text color="strong" align="center" size="xxlarge">
								Radix (XRD)
							</Text>
							<Text color="strong" align="center" size="xlarge">
								$3.95876
							</Text>
							<Box display="flex" gap="small">
								<Text align="center" size="large">
									+2.43%
								</Text>
								<Text align="center" size="large">
									+2.43%
								</Text>
							</Box>
						</Box>
					</Box>
				)
			}

			return (
				<AnimatePresence initial={false}>
					<Box component="ul" className={styles.cardWrapperAll}>
						{cards.map(({ accountName, accountId, accountBalance }, idx) => (
							<AnimatedCard
								key={accountName}
								selectedCardIndex={1}
								cardIndex={idx}
								accountAddress={accountId}
								accountBalance={accountBalance}
								accountName={accountName}
								showCopyAddressButton
								isAllAccount={accountName === ACCOUNTS_ALL}
							/>
						))}
					</Box>
				</AnimatePresence>
			)
		}

		return (
			<>
				<Box ref={ref} className={clsx(styles.accountsHomeHeaderAccount, className)} style={backgroundStyle}>
					{generateHeaderSection()}
					<Box position="relative" zIndex={1} marginTop="large">
						<CardButtons theme="backgroundSecondary" />
					</Box>
				</Box>
				<Box ref={elementRef} className={styles.accountsHomeHeaderSticky}>
					<Box
						className={clsx(
							styles.accountsColorBackground,
							styles.accountsHomeHeaderStickyScrolled,
							isSticky && styles.accountsHomeHeaderStickyScrolledVisible,
						)}
						style={backgroundStyle}
					/>
					<Box
						className={clsx(
							styles.accountsHomeHeaderStickyVis,
							isSticky && (assetType || isActivityRoute) && styles.accountsHomeHeaderStickyVisIs,
						)}
					>
						<Box className={styles.tabsWrapper}>
							<Link
								underline="never"
								to={generateAccountLink()}
								onClick={handleClearSearch}
								className={clsx(
									styles.tabsWrapperButton,
									styles.tabsWrapperButtonLeft,
									!isActivityRoute && styles.tabsWrapperButtonActive,
								)}
							>
								<Text size="medium" weight="strong" align="center" color={!isActivityRoute ? 'strong' : 'neutral'}>
									{getTabTitle()}
								</Text>
							</Link>
							<Link
								underline="never"
								to={generateAccountLink(true, true)}
								onClick={handleClearSearch}
								className={clsx(
									styles.tabsWrapperButton,
									styles.tabsWrapperButtonRight,
									isActivityRoute && styles.tabsWrapperButtonActive,
								)}
							>
								<Text size="medium" weight="strong" align="center" color={isActivityRoute ? 'strong' : 'neutral'}>
									<Translation capitalizeFirstLetter text="global.activity" />
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
							{assetType ? (
								<Button
									iconOnly
									styleVariant="secondary"
									sizeVariant="small"
									to={clickBackLink}
									onClick={handleClearSearch}
								>
									<ChevronLeftIcon />
								</Button>
							) : null}
							<Input
								sizeVariant="small"
								className={styles.inputSearch}
								value={search}
								placeholder={capitalizeFirstLetter(t('global.search'))}
								rounded
								leftIcon={
									<Box paddingLeft="small" display="flex" alignItems="center">
										<SearchIcon />
									</Box>
								}
								rightIcon={
									!isEmpty(search) ? (
										<Button iconOnly sizeVariant="small" styleVariant="ghost" rounded onClick={handleClearSearch}>
											<Close2Icon />
										</Button>
									) : null
								}
								onChange={handleSearch}
							/>
						</Box>
					</Box>
				</Box>
			</>
		)
	},
)

AccountsHomeMobileHeader.defaultProps = defaultProps