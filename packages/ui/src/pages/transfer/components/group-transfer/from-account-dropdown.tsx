import type { AddressBookEntry } from 'packages/ui/src/store/types'
import React from 'react'

import { Box } from 'ui/src/components/box'
import type { IDropdownMenuVirtuosoRequiredProps } from 'ui/src/components/dropdown-menu'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { AccountDropdown } from 'ui/src/containers/accounts/account-dropdown'

import type { TZodValidation } from '../../types'
import { getError } from '../../utils/get-transfer-form-error'

interface IProps {
	onUpdate: (account: string) => void
	fromAccount: string
	accountEntries: IDropdownMenuVirtuosoRequiredProps['data']
	knownAddresses: { [key: string]: AddressBookEntry }
	validation: TZodValidation
}

export const FromAccountDropdown: React.FC<IProps> = props => {
	const { knownAddresses, accountEntries, fromAccount, validation, onUpdate } = props

	return (
		<Box paddingBottom="medium">
			<Box display="flex" paddingBottom="small" flexGrow={1} alignItems="center">
				<Text size="medium" color="strong" weight="medium">
					<Translation capitalizeFirstLetter text="transfer.group.from" />:
				</Text>
			</Box>
			<AccountDropdown
				account={fromAccount}
				knownAddresses={knownAddresses}
				onUpdateAccount={onUpdate}
				accounts={accountEntries}
				styleVariant={getError(validation, ['from']).error ? 'tertiary-error' : 'tertiary'}
			/>
			<ValidationErrorMessage error={getError(validation, ['from'])} />
		</Box>
	)
}
