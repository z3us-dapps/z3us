import clsx, { type ClassValue } from 'clsx'
import { t } from 'i18next'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button, type TStyleVariant as TButtonStyleVariant } from 'ui/src/components/button'
import { ChevronDown2Icon, TrashIcon } from 'ui/src/components/icons'
import { type TSizeVariant, type TStyleVariant } from 'ui/src/components/input'
import { NumberInput } from 'ui/src/components/number-input'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { TokenSelectorDialog } from 'ui/src/components/token-selector-dialog'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'
import { getZodError } from 'ui/src/utils/get-zod-error'

import { CurrencySelect } from '../../../components/currency-select'
import type { TTransferSchema, TZodValidation } from '../../types'
import * as styles from './styles.css'

interface IProps {
	balances: ResourceBalance[]
	fromAccount: string
	tokenAddress: string
	tokenValue: number
	sendIndex: number
	tokenIndex: number
	validation: TZodValidation
	onUpdateTokenValue: (tokenValue: number) => void
	onUpdateToken: (token: string) => void
	className?: ClassValue
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
}

export const TokenSelector: React.FC<IProps> = props => {
	const {
		balances,
		fromAccount,
		tokenAddress,
		tokenValue,
		className,
		styleVariant = 'primary',
		sizeVariant = 'large',
		sendIndex,
		tokenIndex,
		validation,
		onUpdateToken,
		onUpdateTokenValue,
	} = props

	const selectedToken = balances.find(b => b.address === tokenAddress)

	const baseErrKey = ['sends', sendIndex, 'tokens', tokenIndex]
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
							<Translation capitalizeFirstLetter text="transfer.group.amount" />:
						</Text>
						{tokenIndex ? (
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
										console.log('trash this token')
									}}
								>
									<TrashIcon />
								</Button>
							</ToolTip>
						) : null}
					</Box>
					{selectedToken?.amount && (
						<Box display="flex" alignItems="center" gap="xsmall">
							<Text inheritColor component="span" size="medium" truncate>
								<Translation capitalizeFirstLetter text="transfer.group.available" />:
							</Text>
							<Link
								to={`/accounts/${fromAccount}`}
								underline="hover"
								className={plainButtonStyles.plainButtonHoverWrapper}
							>
								<Text inheritColor component="span" size="medium" underline="always" truncate>
									{selectedToken?.amount ? formatBigNumber(selectedToken.amount, selectedToken.symbol) : 0}
								</Text>
							</Link>
						</Box>
					)}
				</Box>
			</Box>
			<Box width="full" position="relative">
				<NumberInput
					styleVariant={getAmountInputStyleVariant() as TStyleVariant}
					sizeVariant={sizeVariant}
					value={tokenValue}
					placeholder={capitalizeFirstLetter(t('transfer.group.enterTokenAmount'))}
					onChange={handleTokenValueUpdate}
					precision={18}
				/>
				<TokenSelectorDialog
					tokenAddress={tokenAddress}
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
									{selectedToken?.symbol || selectedToken?.name}
								</Text>
							</Box>
						</Button>
					}
					balances={balances}
				/>
			</Box>
			{selectedToken?.amount && (
				<Box display="flex" paddingTop="small">
					<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
						<Box display="flex" alignItems="center">
							<Text size="small" truncate>
								{tokenValue || 0} {selectedToken?.symbol || selectedToken?.name} =
							</Text>
						</Box>
						<CurrencySelect selectedToken={selectedToken} tokenValue={tokenValue} />
					</Box>
				</Box>
			)}
			<Box display="flex" justifyContent="space-between">
				<ValidationErrorMessage error={amountError} />
				<ValidationErrorMessage error={tokenError} />
			</Box>
		</Box>
	)
}
