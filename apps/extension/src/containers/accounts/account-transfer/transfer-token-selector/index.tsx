/* eslint-disable  @typescript-eslint/no-unused-vars */
import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Checkbox } from 'ui/src/components-v2/checkbox'
import { Input, type TSizeVariant, type TStyleVariant } from 'ui/src/components-v2/input'
import { NumberInput } from 'ui/src/components-v2/number-input'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronDown2Icon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import * as plainButtonStyles from '@src/components/styles/plain-button-styles.css'
import { TokenImageIcon } from '@src/components/token-image-icon'
import { accountMenuSlugs } from '@src/constants'
// TODO: move to components outside of the containers
import { TokenSelectorDialog } from '@src/containers/accounts/token-selector-dialog'

import * as styles from './transfer-token-selector.css'

interface ITransferTokenSelectorRequiredProps {
	tokens: any,
	token: string
	tokenValue: number
	onTokenUpdate: any
	onTokenValueUpdate: any
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
		onTokenUpdate,
		onTokenValueUpdate,
		className,
		styleVariant,
		sizeVariant,
		placeholder,
	} = props

	const handleTokenUpdate = (val: string) => {
		onTokenUpdate(val)
	}

	const handleTokenValueUpdate = (val: number) => {
		onTokenValueUpdate(val)
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
					styleVariant={styleVariant}
					sizeVariant={sizeVariant}
					value={tokenValue}
					placeholder={placeholder}
					onChange={handleTokenValueUpdate}
				/>
				<TokenSelectorDialog
					token={token}
					onTokenUpdate={handleTokenUpdate}
					trigger={
						<Button
							className={styles.tokenSelectBtnWrapper}
							styleVariant="tertiary"
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
			<Box display="flex" paddingTop="small">
				<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
					<Box display="flex" alignItems="center">
						<Text size="medium" truncate>
							2.12 BTC =
						</Text>
					</Box>
					<Link to={accountMenuSlugs.ACCOUNTS} underline="hover" className={plainButtonStyles.plainButtonHoverWrapper}>
						<Box display="flex" alignItems="center">
							$70,887 USD
							<ChevronDown2Icon />
						</Box>
					</Link>
				</Box>
			</Box>
		</Box>
	)
}

TransferTokenSelector.defaultProps = defaultProps
