/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js'
import clsx, { type ClassValue } from 'clsx'
import { TokenPrice } from 'packages/ui/src/components/token-price'
import { useSupportedCurrencies } from 'packages/ui/src/hooks/queries/market'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button, type TStyleVariant as TButtonStyleVariant } from 'ui/src/components/button'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, DropdownMenuVirtuoso } from 'ui/src/components/dropdown-menu'
import { Check2Icon, ChevronDown2Icon, TrashIcon } from 'ui/src/components/icons'
import { type TSizeVariant, type TStyleVariant } from 'ui/src/components/input'
import { NumberInput } from 'ui/src/components/number-input'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import {
	SelectContent,
	SelectGroup,
	SelectIcon,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from 'ui/src/components/select'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
// TODO: move to components outside of the containers
// import { TokenSelectorDialog } from 'ui/src/containers/accounts/token-selector-dialog'
import { getZodError } from 'ui/src/utils/get-zod-error'

import type { TTransferSchema, TZodValidation } from '../../types'

interface ITransferNftSelectorProps {
	balances: ResourceBalance[]
	tokenAddress: string
	tokenValue: number
	sendIndex: number
	nftIndex: number
	validation: TZodValidation
	onUpdateTokenValue: (tokenValue: number) => void
	onUpdateToken: (token: string) => void
	className?: ClassValue
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
	placeholder?: string
}

export const TransferNftSelector: React.FC<ITransferNftSelectorProps> = props => {
	const {
		balances,
		tokenAddress,
		tokenValue,
		className,
		styleVariant = 'primary',
		sizeVariant = 'large',
		placeholder = 'enter amount',
		sendIndex,
		nftIndex,
		validation,
		onUpdateToken,
		onUpdateTokenValue,
	} = props

	const { data: currencies } = useSupportedCurrencies()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const [selectedCurrency, setCurrency] = useState<string>(currency)

	const selectedToken = balances.find(b => b.address === tokenAddress)

	const favoriteCurrencies = ['usd', 'eur', 'btc']

	const baseErrKey = ['sends', sendIndex, 'nfts', nftIndex]
	const tokenError =
		getZodError<TTransferSchema>(validation, [...baseErrKey, 'address']) ||
		getZodError<TTransferSchema>(validation, [...baseErrKey, 'name']) ||
		getZodError<TTransferSchema>(validation, [...baseErrKey, 'symbol'])
	const amountError = getZodError<TTransferSchema>(validation, [...baseErrKey, 'amount'])

	const handleTokenUpdate = (val: string) => {
		onUpdateToken(val)
	}

	const handleTokenValueUpdate = (val: number) => {
		onUpdateTokenValue(val)
	}

	const getAmountInputStyleVariant = () => {
		if (amountError.error) {
			return styleVariant === 'primary' ? 'primary-error' : 'secondary-error'
		}

		return styleVariant
	}

	const getTokenInputStyleVariant = () => {
		if (tokenError.error) {
			return styleVariant === 'primary' ? 'secondary-error' : 'tertiary-error'
		}

		return styleVariant === 'primary' ? 'secondary' : 'tertiary'
	}

	return (
		<Box className={clsx(className)}>
			<Box display="flex" paddingBottom="small" paddingTop="large">
				<Box display="flex" alignItems="center" width="full">
					<Box display="flex" alignItems="center" flexGrow={1} gap="small">
						<Text size="medium" color="strong" weight="medium">
							Nft:
						</Text>
						{nftIndex ? (
							<ToolTip
								side="top"
								message={<Translation capitalizeFirstLetter text="transfer.sendTokens.deleteToken" />}
							>
								<Button
									iconOnly
									sizeVariant="small"
									styleVariant="ghost"
									onClick={() => {
										// eslint-disable-next-line
										console.log('trash this nft')
									}}
								>
									<TrashIcon />
								</Button>
							</ToolTip>
						) : null}
					</Box>
				</Box>
			</Box>
			<Box width="full" position="relative">
				<DropdownMenuVirtuoso
					value="1"
					// value={fromAccount}
					// onValueChange={onUpdateFromAccount}
					onValueChange={() => {}}
					// data={accountEntries}
					data={[
						{ id: '1', title: 'hhdh' },
						{ id: 'he', title: 'hhdhfidhf' },
						{ id: 'h7474747', title: 'difudifu' },
					]}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContentRenderer={(index, { id, title }) => (
						<DropdownMenuRadioItem value={id} key={index}>
							<Box display="flex" alignItems="center" gap="medium">
								<Box flexShrink={0}>
									nft
									{/* <ResourceImageIcon address={fromAccount} /> */}
								</Box>
								<Box flexGrow={1} minWidth={0}>
									<Text truncate>{title}</Text>
								</Box>
							</Box>
							<DropdownMenuItemIndicator>
								<Check2Icon />
							</DropdownMenuItemIndicator>
						</DropdownMenuRadioItem>
					)}
					trigger={
						<Button
							styleVariant="tertiary"
							sizeVariant="xlarge"
							fullWidth
							leftIcon={<ChevronDown2Icon />}
							rightIcon={<ChevronDown2Icon />}
						>
							<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
								<Text size="large" color="strong">
									nft
								</Text>
							</Box>
						</Button>
					}
				/>
			</Box>
			<Box display="flex" justifyContent="space-between">
				<ValidationErrorMessage error={amountError} />
				<ValidationErrorMessage error={tokenError} />
			</Box>
			<Box display="flex" paddingTop="small">
				<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
					<Box display="flex" alignItems="center">
						<Text size="medium" truncate>
							{tokenValue || 0} {selectedToken?.symbol || selectedToken?.name} =
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
