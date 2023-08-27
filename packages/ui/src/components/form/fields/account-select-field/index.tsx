import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { Button, type TSizeVariant, type TStyleVariant } from 'ui/src/components/button'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, DropdownMenuVirtuoso } from 'ui/src/components/dropdown-menu'
import { Check2Icon, ChevronDown2Icon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IProps extends WrapperProps {
	value: string
	onChange?: (value: string | number) => void
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
}

export const AccountSelectField = forwardRef<HTMLElement, IProps>((props, ref) => {
	const {
		onChange,
		validate,
		name,
		parentName,
		value,
		label,
		styleVariant = 'tertiary',
		sizeVariant = 'xlarge',
		...rest
	} = props

	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))
	const knownAddresses = { ...accounts, ...addressBook }
	const accountReadableName = knownAddresses[value]?.name || getShortAddress(value)

	return (
		<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
			<DropdownMenuVirtuoso
				{...rest}
				ref={ref}
				value={value}
				onValueChange={onChange}
				data={Object.values(accounts).map(_account => ({ id: _account.address, title: _account.name }))}
				// eslint-disable-next-line react/no-unstable-nested-components
				itemContentRenderer={(index, { id, title }) => (
					<DropdownMenuRadioItem value={id} key={index}>
						<Box display="flex" alignItems="center" gap="medium">
							<Box flexShrink={0}>
								<ResourceImageIcon address={id} />
							</Box>
							<Box flexGrow={1} minWidth={0}>
								<Text truncate size="small">
									{title}
								</Text>
							</Box>
						</Box>
						<DropdownMenuItemIndicator>
							<Check2Icon />
						</DropdownMenuItemIndicator>
					</DropdownMenuRadioItem>
				)}
				trigger={
					<Button
						styleVariant={styleVariant}
						sizeVariant={sizeVariant}
						fullWidth
						leftIcon={<ResourceImageIcon address={value} />}
						rightIcon={<ChevronDown2Icon />}
					>
						<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
							<Text size="large" color="strong">
								{accountReadableName}
							</Text>
						</Box>
					</Button>
				}
			/>
		</FieldWrapper>
	)
})
