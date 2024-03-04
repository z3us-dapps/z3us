import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { DotsHorizontalCircleIcon, InformationIcon, RadixIcon, TrashIcon, Z3usIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'
import { CARD_COLORS } from 'ui/src/constants/account'
import { CURRENCY_STYLES } from 'ui/src/constants/number'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useDashboardUrl, useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useAccountCardSettings } from 'ui/src/hooks/use-account-card-settings'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { type AddressBookEntry, KeystoreType, SCHEME } from 'ui/src/store/types'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { useNonFungibleData, useNonFungibleLocation } from '../../hooks/dapp/use-entity-nft'
import { findFieldValue } from '../../services/metadata'
import { CopyAddressButton } from '../copy-address-button'
import * as styles from './account-cards.css'

const messages = defineMessages({
	legacy: {
		defaultMessage: '(Legacy)',
		id: 'GIGKXJ',
	},
	show_details: {
		defaultMessage: 'Show details',
		id: 's2XIgr',
	},
	delete_account: {
		defaultMessage: 'Delete account',
		id: 'wyxJrL',
	},
	open_radix_dashboard: {
		id: 'xxuT0a',
		defaultMessage: 'Open in Radix Dashboard',
	},
	open_z3us: {
		id: 'WAHvBA',
		defaultMessage: 'Open in Z3US.com',
	},
	confirm: {
		defaultMessage: 'Are you sure you want to delete account {address}?',
		id: 'nusXRL',
	},
})

interface IAccountCardImageProps {
	address: string
	className?: string
	size?: 'small' | 'large'
}

export const AccountCardImage: React.FC<IAccountCardImageProps> = props => {
	const { address, className, size = 'small' } = props

	const { skin, cardColor, colorClassName } = useAccountCardSettings(address)
	const { data: location } = useNonFungibleLocation(skin?.collection, skin?.non_fungible_id)
	const { nonFungibleBalances = [] } = useBalances([address])

	const collection = nonFungibleBalances.find(nft => nft.address === location?.resource_address)
	const vault = collection?.vaults.find(v => v === location?.non_fungible_ids?.[0]?.owning_vault_address)
	const holdsNFT = Boolean(vault)

	const { data } = useNonFungibleData(skin?.collection, skin?.non_fungible_id)

	const dataJson = data?.data.programmatic_json as any
	const name = findFieldValue('name', dataJson?.fields)
	const imageSrc = findFieldValue('key_image_url', dataJson?.fields)

	const isSizeLarge = size === 'large'

	if (!skin || !holdsNFT) return null

	return (
		<Box
			className={clsx(
				styles.cardAccountImageWrapper,
				colorClassName,
				cardColor,
				isSizeLarge && styles.cardAccountLarge,
				className,
			)}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={imageSrc} alt={name} />
		</Box>
	)
}

interface IAccountCardIconProps {
	address: string
	className?: string
}

export const AccountCardIcon: React.FC<IAccountCardIconProps> = props => {
	const { address, className } = props

	const { cardColor } = useAccountCardSettings(address)

	return (
		<Box className={clsx(styles.accountCardIconWrapper, className)} style={{ backgroundImage: `${cardColor}` }}>
			<AccountCardImage address={address} />
		</Box>
	)
}

interface IAccountCardProps {
	address: string
	isAllAccount?: boolean
	visible?: boolean
	showCopyAddressButton?: boolean
	showAccountOptions?: boolean
	enableClick?: boolean
	className?: string
}

export const AccountCard: React.FC<IAccountCardProps> = props => {
	const {
		address,
		isAllAccount = false,
		visible = true,
		showCopyAddressButton = true,
		showAccountOptions = true,
		enableClick = false,
		className,
	} = props

	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const networkId = useNetworkId()
	const dashboardUrl = useDashboardUrl()
	const { isWallet, confirm } = useZdtState()
	const accounts = useWalletAccounts()
	const accountIndexes = useAccountIndexes()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { currency, removeAccount } = useNoneSharedStore(state => ({
		currency: state.currency,
		removeAccount: state.removeAccountAction,
	}))
	const { totalValue = 0 } = useBalances([address])

	const account = accounts[address]
	const isLegacy = accountIndexes[address]?.scheme === SCHEME.BIP440OLYMPIA
	const canRemoveAccount = isWallet && keystore?.type !== KeystoreType.RADIX_WALLET

	const handleRemoveAccount = event => {
		event.stopPropagation()
		confirm({
			title: intl.formatMessage(messages.delete_account),
			content: intl.formatMessage(messages.confirm, { address: getShortAddress(address) }),
			buttonTitle: intl.formatMessage(messages.delete_account),
			buttonStyleVariant: 'destructive',
			ignorePassword: true,
		}).then(() => removeAccount(networkId, address))
	}

	const handleShowDetails = event => {
		event.stopPropagation()
		searchParams.delete('tx')
		searchParams.set('query', `${address}`)
		navigate(`${location.pathname}?${searchParams}`)
	}

	const handleShowInDashboard = event => {
		event.stopPropagation()
		window.open(`${dashboardUrl}/account/${address}`, '_blank', 'noreferrer')
	}

	const handleShowInZ3US = event => {
		event.stopPropagation()
		window.open(`https://z3us.com/#/accounts/${address}`, '_blank', 'noreferrer')
	}

	const handleClick = () => {
		if (!enableClick) return
		navigate(`/accounts/${address}?${searchParams}`)
	}

	return (
		<Box
			key={address}
			className={clsx(styles.card, isAllAccount && styles.cardAllWrapper, className)}
			style={{
				opacity: visible ? 1 : 0,
				...(account?.cardColor ? { backgroundImage: `${CARD_COLORS[account?.cardColor]}` } : {}),
			}}
		>
			<Box className={clsx(styles.cardAccountWrapper)} onClick={handleClick}>
				<AccountCardImage address={address} size="large" />
				<Box flexGrow={1} paddingTop="xsmall" display="flex" gap="small" position="relative">
					<Text size="large" weight="medium" className={styles.cardAccountTextSpaced}>
						<Box component="span" className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}>
							{getShortAddress(address)}
						</Box>
					</Text>
					{showCopyAddressButton ? (
						<Box className={styles.copyAddressButtonWrapper}>
							<CopyAddressButton
								styleVariant="white-transparent"
								address={address}
								iconOnly
								rounded={false}
								tickColor="white"
							/>
						</Box>
					) : null}
				</Box>
				<Box paddingBottom="xsmall" display="flex" flexDirection="column" position="relative">
					<Text size="xlarge" weight="stronger">
						<Box component="span" className={clsx(styles.cardAccountText, isAllAccount && styles.cardAccountTextAll)}>
							{intl.formatNumber(totalValue, { currency, ...CURRENCY_STYLES })}
						</Box>
					</Text>
					<Text
						color="white"
						size="large"
						weight="strong"
						truncate
						className={clsx(styles.cardAccountText, styles.cardAccountName, isAllAccount && styles.cardAccountTextAll)}
					>
						{`${account?.name || getShortAddress(address)} ${isLegacy ? intl.formatMessage(messages.legacy) : ``}`}
					</Text>
				</Box>
			</Box>

			<Z3usLogo className={styles.accountCardZ3USlogoWrapper} isHoverMaskEnabled={false} />

			{showAccountOptions && (
				<Box className={styles.accountDropdownWrapper}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button iconOnly sizeVariant="small" styleVariant="white-transparent">
								<DotsHorizontalCircleIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuPortal>
							<DropdownMenuContent align="end" sideOffset={2} className={styles.accountDropdownContentWrapper}>
								<DropdownMenuItem onSelect={handleShowDetails}>
									<DropdownMenuLeftSlot>
										<InformationIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											{intl.formatMessage(messages.show_details)}
										</Text>
									</Box>
								</DropdownMenuItem>
								{canRemoveAccount && (
									<DropdownMenuItem onSelect={handleRemoveAccount}>
										<DropdownMenuLeftSlot>
											<TrashIcon />
										</DropdownMenuLeftSlot>
										<Box display="flex" marginLeft="small">
											<Text size="xsmall" truncate>
												{intl.formatMessage(messages.delete_account)}
											</Text>
										</Box>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem onSelect={handleShowInDashboard}>
									<DropdownMenuLeftSlot>
										<RadixIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											{intl.formatMessage(messages.open_radix_dashboard)}
										</Text>
									</Box>
								</DropdownMenuItem>
								{isWallet && (
									<DropdownMenuItem onSelect={handleShowInZ3US}>
										<DropdownMenuLeftSlot>
											<Z3usIcon />
										</DropdownMenuLeftSlot>
										<Box display="flex" marginLeft="small">
											<Text size="xsmall" truncate>
												{intl.formatMessage(messages.open_z3us)}
											</Text>
										</Box>
									</DropdownMenuItem>
								)}
								<DropdownMenuArrow />
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>
				</Box>
			)}
			<Box className={styles.cardAccountShine} />
		</Box>
	)
}

interface IAccountCardsProps {
	className?: ClassValue
	isAllAccount?: boolean
	enableClick?: boolean
	showCopyAddressButton?: boolean
	accounts: AddressBookEntry[]
	selectedCardIndex: number
	isCardShadowVisible?: boolean
}

export const AccountCards: React.FC<IAccountCardsProps> = props => {
	const {
		className,
		isAllAccount = false,
		accounts,
		selectedCardIndex = 0,
		showCopyAddressButton = false,
		enableClick = false,
		isCardShadowVisible = true,
	} = props

	return (
		<Box className={clsx(styles.cardWrapperAll, isCardShadowVisible && styles.cardShadow, className)}>
			{accounts.map(({ address }, cardIndex: number) => (
				<AccountCard
					key={address}
					address={address}
					isAllAccount={isAllAccount}
					visible={selectedCardIndex === cardIndex}
					showCopyAddressButton={showCopyAddressButton}
					enableClick={enableClick}
				/>
			))}
		</Box>
	)
}
