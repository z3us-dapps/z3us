import BigNumber from 'bignumber.js'
import clsx, { type ClassValue } from 'clsx'
import { Amount } from 'packages/ui/src/components/amount'
import { Price } from 'packages/ui/src/components/price'
import { useSupportedCurrencies } from 'packages/ui/src/hooks/queries/market'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button, type TStyleVariant as TButtonStyleVariant } from 'ui/src/components/button'
import { ChevronDown2Icon } from 'ui/src/components/icons'
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
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { accountMenuSlugs } from 'ui/src/constants/accounts'
// TODO: move to components outside of the containers
import { TokenSelectorDialog } from 'ui/src/containers/accounts/token-selector-dialog'
import { getZodError } from 'ui/src/utils/get-zod-error'

import type { TTransferSchema, TZodValidation } from '../account-transfer-types'
import * as styles from './transfer-token-selector.css'

interface ITransferTokenSelectorRequiredProps {
	balances: ResourceBalance[]
	token: string
	tokenValue: number
	sendIndex: number
	tokenIndex: number
	validation: TZodValidation
	onUpdateTokenValue: (tokenValue: number) => void
	onUpdateToken: (token: string) => void
}

interface ITransferTokenSelectorOptionalProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
	placeholder?: string
}

interface ITransferTokenSelectorProps
	extends ITransferTokenSelectorRequiredProps,
		ITransferTokenSelectorOptionalProps {}

const defaultProps: ITransferTokenSelectorOptionalProps = {
	className: undefined,
	styleVariant: 'primary',
	sizeVariant: 'large',
	placeholder: 'Enter amount',
}

export const TransferTokenSelector: React.FC<ITransferTokenSelectorProps> = props => {
	const {
		balances,
		token,
		tokenValue,
		className,
		styleVariant,
		sizeVariant,
		placeholder,
		sendIndex,
		tokenIndex,
		validation,
		onUpdateToken,
		onUpdateTokenValue,
	} = props

	const { data: currencies } = useSupportedCurrencies()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const [selectedCurrency, setCurrency] = useState<string>(currency)

	const selectedToken = balances.find(b => b.address === token)

	const handleTokenUpdate = (val: string) => {
		onUpdateToken(val)
	}

	const handleTokenValueUpdate = (val: number) => {
		onUpdateTokenValue(val)
	}

	const getAmountInputStyleVariant = () => {
		const isAmountError = getZodError<TTransferSchema>(validation, [
			'sends',
			sendIndex,
			'tokens',
			tokenIndex,
			'amount',
		]).error

		if (isAmountError) {
			return styleVariant === 'primary' ? 'primary-error' : 'secondary-error'
		}

		return styleVariant
	}

	const getTokenInputStyleVariant = () => {
		const isAmountError = getZodError<TTransferSchema>(validation, [
			'sends',
			sendIndex,
			'tokens',
			tokenIndex,
			'token',
		]).error

		if (isAmountError) {
			return styleVariant === 'primary' ? 'secondary-error' : 'tertiary-error'
		}

		return styleVariant === 'primary' ? 'secondary' : 'tertiary'
	}

	return (
		<Box className={clsx(className)}>
			<Box display="flex" paddingBottom="medium" paddingTop="large">
				<Box display="flex" alignItems="center" width="full">
					<Box display="flex" alignItems="center" flexGrow={1}>
						<Text size="medium" color="strong">
							Amount:
						</Text>
					</Box>
					<Box display="flex" alignItems="center" gap="xsmall">
						<Text inheritColor component="span" size="medium" truncate>
							Available:
						</Text>
						<Link
							to={accountMenuSlugs.ACCOUNTS}
							underline="hover"
							className={plainButtonStyles.plainButtonHoverWrapper}
						>
							<Text inheritColor component="span" size="medium" underline="always" truncate>
								<Amount value={selectedToken?.amount} currency={selectedToken?.symbol} />
							</Text>
						</Link>
					</Box>
				</Box>
			</Box>
			<Box width="full" position="relative">
				<NumberInput
					styleVariant={getAmountInputStyleVariant() as TStyleVariant}
					sizeVariant={sizeVariant}
					value={tokenValue}
					placeholder={placeholder}
					onChange={handleTokenValueUpdate}
					precision={9}
				/>
				<TokenSelectorDialog
					token={token}
					onTokenUpdate={handleTokenUpdate}
					trigger={
						<Button
							className={styles.tokenSelectBtnWrapper}
							styleVariant={getTokenInputStyleVariant() as TButtonStyleVariant}
							sizeVariant="medium"
							rightIcon={<ChevronDown2Icon />}
							leftIcon={
								<Box marginRight="small">
									<ResourceImageIcon size="small" address={selectedToken?.address} />
								</Box>
							}
						>
							<Box display="flex" alignItems="center" width="full" textAlign="left">
								<Text size="medium" color="strong" truncate>
									{selectedToken?.symbol}
								</Text>
							</Box>
						</Button>
					}
					balances={balances}
				/>
			</Box>
			<Box display="flex" justifyContent="space-between">
				<ValidationErrorMessage
					error={getZodError<TTransferSchema>(validation, ['sends', sendIndex, 'tokens', tokenIndex, 'amount'])}
				/>
				<ValidationErrorMessage
					error={getZodError<TTransferSchema>(validation, ['sends', sendIndex, 'tokens', tokenIndex, 'token'])}
				/>
			</Box>
			<Box display="flex" paddingTop="small">
				<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
					<Box display="flex" alignItems="center">
						<Text size="medium" truncate>
							{tokenValue} {selectedToken?.symbol} =
						</Text>
					</Box>
					{/* TODO: move to own component */}
					<SelectRoot value={selectedCurrency} onValueChange={setCurrency}>
						<SelectTrigger asChild aria-label="Currency">
							<Box
								component="button"
								display="inline-flex"
								alignItems="center"
								className={clsx(
									plainButtonStyles.plainButtonHoverWrapper,
									plainButtonStyles.plainButtonHoverUnderlineWrapper,
								)}
							>
								<SelectValue aria-label={selectedCurrency}>
									<Box display="flex">
										<Box component="span">
											<Price value={new BigNumber(tokenValue || 0)} currency={selectedCurrency} />
											&nbsp;
										</Box>
										<Box component="span" style={{ textTransform: 'uppercase' }}>
											{selectedCurrency}
										</Box>
									</Box>
								</SelectValue>
								<SelectIcon style={{ height: '24px' }}>
									<ChevronDown2Icon />
								</SelectIcon>
							</Box>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>
									<Text truncate size="small">
										Favorite
									</Text>
								</SelectLabel>
								<SelectItem value="USD">
									<Text truncate size="small" color="strong">
										USD
									</Text>
								</SelectItem>
								<SelectItem value="eur">
									<Text truncate size="small" color="strong">
										EUR
									</Text>
								</SelectItem>
							</SelectGroup>
							<SelectSeparator />
							<SelectGroup>
								<SelectLabel>
									<Text size="small">Rest</Text>
								</SelectLabel>
								{currencies.map(c => (
									<SelectItem key={c} value={c}>
										<Text truncate size="small" color="strong">
											{c.toUpperCase()}
										</Text>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</SelectRoot>
				</Box>
			</Box>
		</Box>
	)
}

TransferTokenSelector.defaultProps = defaultProps
