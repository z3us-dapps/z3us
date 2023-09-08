import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { EditIcon, TrashIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import type { AddressBookEntry } from 'ui/src/store/types'

import * as styles from './address-table-cell.css'

interface IAddressTableCellProps {
	row: { original: AddressBookEntry }
	onDelete: () => void
	onEdit: () => void
}

export const AddressTableCell: React.FC<IAddressTableCellProps> = props => {
	const { row, onDelete, onEdit } = props

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
				<Translation capitalizeFirstLetter text="settings.address_book.entry.delete" />
			</Button>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<EditIcon />} onClick={onEdit}>
				<Translation capitalizeFirstLetter text="settings.address_book.entry.edit" />
			</Button>
		</Box>
	)
}
