import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { Button, type TStyleVariant as TButtonStyleVariant } from 'ui/src/components/button'
import { ChevronDown2Icon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { getResourceIdByName } from 'ui/src/components/resource-image-icon/resource-image-map'
import { Text } from 'ui/src/components/typography'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import { type ITokenSelectorDialogProps, TokenSelectorDialog } from './components/token-selector-dialog'
import * as styles from './styles.css'

interface IProps extends Omit<ITokenSelectorDialogProps, 'onValueChange' | 'value'>, WrapperProps {
	onChange?: (value: string | number) => void
	trigger: React.ReactElement
}

export const TokenSelectField = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
	const { onChange, validate, name, parentName, label, ...rest } = props

	const tempAddress = getResourceIdByName('radix')

	return (
		<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
			<TokenSelectorDialog
				{...rest}
				tokenAddress={tempAddress}
				// tokenAddress={tokenAddress}
				onTokenUpdate={onChange}
				trigger={
					<Button
						className={styles.tokenSelectBtnWrapper}
						// styleVariant={getTokenInputStyleVariant() as TButtonStyleVariant}
						styleVariant="secondary"
						sizeVariant="medium"
						rightIcon={<ChevronDown2Icon />}
						leftIcon={
							<Box marginRight="small">
								<ResourceImageIcon size="small" address={tempAddress} />
								{/* <ResourceImageIcon size="small" address={selectedToken?.address} /> */}
							</Box>
						}
					>
						<Box display="flex" alignItems="center" width="full" textAlign="left">
							<Text size="medium" color="strong" truncate>
								XRD
								{/* {selectedToken?.symbol || selectedToken?.name} */}
							</Text>
						</Box>
					</Button>
				}
				balances={[]}
				// balances={balances}
			/>
		</FieldWrapper>
	)
})
