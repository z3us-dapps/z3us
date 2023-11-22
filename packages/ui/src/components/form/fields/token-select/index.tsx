import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ChevronDown2Icon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { findMetadataValue } from 'ui/src/services/metadata'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import { type ITokenSelectorDialogProps, TokenSelectorDialog } from './components/token-selector-dialog'
import * as styles from './styles.css'

interface IAdapterProps extends Omit<ITokenSelectorDialogProps, 'onTokenUpdate' | 'trigger'> {
	value?: string
	onChange?: (value: string) => void
	hasError?: boolean
}

export const SelectAdapter = forwardRef<HTMLButtonElement, IAdapterProps>((props, ref) => {
	const { value, onChange, resourceAddresses, hasError, ...rest } = props

	const selected = resourceAddresses.find(address => address === value)

	const { data } = useEntityMetadata(selected)

	const name = findMetadataValue('name', data)
	const symbol = findMetadataValue('symbol', data)

	return (
		<TokenSelectorDialog
			{...rest}
			tokenAddress={value}
			onTokenUpdate={onChange}
			trigger={
				<Button
					ref={ref}
					className={styles.tokenSelectBtnWrapper}
					styleVariant={hasError ? 'tertiary-error' : 'tertiary'}
					sizeVariant="medium"
					rightIcon={<ChevronDown2Icon />}
					leftIcon={
						<Box marginRight="small">
							<ResourceImageIcon size="small" address={value} />
						</Box>
					}
				>
					<Box display="flex" alignItems="center" width="full" textAlign="left">
						<Text size="medium" color="strong" truncate>
							{symbol || name}
						</Text>
					</Box>
				</Button>
			}
			resourceAddresses={resourceAddresses}
		/>
	)
})

interface IProps extends Omit<IAdapterProps, 'onValueChange' | 'value'>, WrapperProps {}

export const TokenSelect = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
	const { validate, name, label, ...rest } = props

	return (
		<FieldWrapper name={name} label={label} validate={validate}>
			<SelectAdapter {...rest} ref={ref} />
		</FieldWrapper>
	)
})
