import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { EditIcon, TrashIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import type { AddressBookEntry } from 'ui/src/store/types'

import * as styles from './address-table-cell.css'

const messages = defineMessages({
	delete: {
		id: 'settings.address_book.entry.delete',
		defaultMessage: 'Delete',
	},
	edit: {
		id: 'settings.address_book.entry.edit',
		defaultMessage: 'Edit',
	},
})

interface IAddressTableCellProps {
	row: { original: AddressBookEntry }
	onDelete: () => void
	onEdit: () => void
}

export const AddressTableCell: React.FC<IAddressTableCellProps> = ({ row, onDelete, onEdit }) => {
	const intl = useIntl()

	return (
		<Box key={row.original.address} className={styles.addressTableCellWrapper}>
			<ResourceImageIcon address={row.original.address} />
			<Box className={styles.addressTableCellTextWrapper}>
				<Text size="small" color="strong" weight="medium" truncate>
					{row.original.name}
				</Text>
				<Text size="xsmall" truncate>
					{row.original.address}
				</Text>
			</Box>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<TrashIcon />} onClick={onDelete}>
				{intl.formatMessage(messages.delete)}
			</Button>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<EditIcon />} onClick={onEdit}>
				{intl.formatMessage(messages.edit)}
			</Button>
		</Box>
	)
}
