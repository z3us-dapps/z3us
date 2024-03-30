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
import { CURRENCY_STYLES } from 'ui/src/constants/number'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useDashboardUrl, useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useAccountCardSettings } from 'ui/src/hooks/use-account-card-settings'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { type AddressBookEntry, KeystoreType, SCHEME } from 'ui/src/store/types'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { CopyAddressButton } from '../copy-address-button'
import { Image } from './image'
import * as styles from './styles.css'

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

interface IAccountCardProps {
	address: string
	isAllAccount?: Boolean
	showCopyAddressButton?: boolean
	showAccountOptions?: boolean
	enableClick?: boolean
	className?: string
}

export const AccountCard: React.FC<IAccountCardProps> = props => {
	const {
		address,
		isAllAccount = false,
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
	const accountIndexes = useAccountIndexes()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { currency, removeAccount } = useNoneSharedStore(state => ({
		currency: state.currency,
		removeAccount: state.removeAccountAction,
	}))
	const { name, skin, cardColor, colorClassName } = useAccountCardSettings(address)
	const { totalValue = 0 } = useBalances([address])

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
			className={clsx(styles.card, isAllAccount && styles.cardAllWrapper, className)}
			style={{
				backgroundImage: `${cardColor}`,
			}}
		>
			<Box className={clsx(styles.cardAccountWrapper)} onClick={handleClick}>
				<Image address={address} className={clsx(colorClassName, cardColor)} skin={skin} />
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
						{`${name || getShortAddress(address)} ${isLegacy ? intl.formatMessage(messages.legacy) : ``}`}
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
	accounts: AddressBookEntry[]
	showCopyAddressButton?: boolean
	showAccountOptions?: boolean
	isAllAccount?: boolean
	enableClick?: boolean
	className?: ClassValue
}

export const AccountCards: React.FC<IAccountCardsProps> = props => {
	const {
		accounts,
		className,
		isAllAccount = false,
		showCopyAddressButton = false,
		showAccountOptions = false,
		enableClick = false,
	} = props

	return (
		<Box className={clsx(styles.cardWrapperAll, className)}>
			{accounts.map(({ address }, index) => (
				<Box
					style={{
						paddingTop: index === 0 ? undefined : `45px`,
					}}
				>
					<AccountCard
						key={address}
						address={address}
						isAllAccount={isAllAccount}
						showCopyAddressButton={showCopyAddressButton}
						showAccountOptions={showAccountOptions}
						enableClick={enableClick}
					/>
				</Box>
			))}
		</Box>
	)
}
