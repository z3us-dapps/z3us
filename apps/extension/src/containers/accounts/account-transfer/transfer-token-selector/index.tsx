import clsx, { type ClassValue } from 'clsx'
import React, { useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button, type TStyleVariant as TButtonStyleVariant } from 'ui/src/components-v2/button'
import { type TSizeVariant, type TStyleVariant } from 'ui/src/components-v2/input'
import { NumberInput } from 'ui/src/components-v2/number-input'
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
} from 'ui/src/components-v2/select'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronDown2Icon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import * as plainButtonStyles from '@src/components/styles/plain-button-styles.css'
import { TokenImageIcon } from '@src/components/token-image-icon'
import { accountMenuSlugs } from '@src/constants'
// TODO: move to components outside of the containers
import { TokenSelectorDialog } from '@src/containers/accounts/token-selector-dialog'

import { TZodValidation } from '../account-transfer-types'
import { getZodError } from '../account-transfer-utils'
import { ValidationErrorMessage } from '../validation-error-message'
import * as styles from './transfer-token-selector.css'

interface ITransferTokenSelectorRequiredProps {
	tokens: any
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
		tokens,
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

	const [value, setValue] = useState<string>('usd')

	const handleTokenUpdate = (val: string) => {
		onUpdateToken(val)
	}

	const handleTokenValueUpdate = (val: number) => {
		onUpdateTokenValue(val)
	}

	const getAmountInputStyleVariant = () => {
		const isAmountError = getZodError(validation, ['sends', sendIndex, 'tokens', tokenIndex, 'amount'])

		if (isAmountError) {
			return styleVariant === 'primary' ? 'primary-error' : 'secondary-error'
		}

		return styleVariant
	}

	const getTokenInputStyleVariant = () => {
		const isAmountError = getZodError(validation, ['sends', sendIndex, 'tokens', tokenIndex, 'token'])

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
								2.12 BTC
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
									<TokenImageIcon
										imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
										imgAlt="btc token image"
										fallbackText="btc"
									/>
								</Box>
							}
						>
							<Box display="flex" alignItems="center" width="full" textAlign="left">
								<Text size="medium" color="strong" truncate>
									{token}
								</Text>
							</Box>
						</Button>
					}
					tokens={tokens}
				/>
			</Box>
			<Box display="flex" justifyContent="space-between">
				<ValidationErrorMessage validation={validation} path={['sends', sendIndex, 'tokens', tokenIndex, 'amount']} />
				<ValidationErrorMessage validation={validation} path={['sends', sendIndex, 'tokens', tokenIndex, 'token']} />
			</Box>
			<Box display="flex" paddingTop="small">
				<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
					<Box display="flex" alignItems="center">
						<Text size="medium" truncate>
							2.12 BTC =
						</Text>
					</Box>
					{/* TODO: move to own component */}
					<SelectRoot value={value} onValueChange={setValue}>
						<SelectTrigger asChild aria-label="Food">
							<Box
								component="button"
								display="inline-flex"
								alignItems="center"
								className={clsx(
									plainButtonStyles.plainButtonHoverWrapper,
									plainButtonStyles.plainButtonHoverUnderlineWrapper,
								)}
							>
								<SelectValue aria-label={value}>
									<Box display="flex">
										<Box component="span">$70,887&nbsp;</Box>
										<Box component="span" style={{ textTransform: 'uppercase' }}>
											{value}
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
								<SelectItem value="usd">
									<Text truncate size="small" color="strong">
										usd
									</Text>
								</SelectItem>
								<SelectItem value="eur">
									<Text truncate size="small" color="strong">
										eur
									</Text>
								</SelectItem>
								<SelectItem value="eth">
									<Text truncate size="small" color="strong">
										eth
									</Text>
								</SelectItem>
							</SelectGroup>
							<SelectSeparator />
							<SelectGroup>
								<SelectLabel>
									<Text size="small">Rest</Text>
								</SelectLabel>
								{Array.from({ length: 100 }).map((_, i, a) => (
									<SelectItem
										key={`v1.2.0-betav1.2.0-betav1.2.0-betav1.2.0-betav1.2.0-beta.${a.length - i}`}
										value={`v1.2.0-betav1.2.0-betav1.2.0-betav1.2.0-betav1.2.0-beta.${a.length - i}`}
									>
										<Text
											truncate
											size="small"
											color="strong"
										>{`v1.2.0-betav1.2.0-betav1.2.0-betav1.2.0-betav1.2.0-beta.${a.length - i}`}</Text>
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
