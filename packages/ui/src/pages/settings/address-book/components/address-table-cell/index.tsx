import React from 'react'

// import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { EditIcon, TrashIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import * as styles from './address-table-cell.css'

interface IAddressTableCellProps {
	id: string
	name: string
	address: string
	onDelete: () => void
	onEdit: () => void
}

export const AddressTableCell: React.FC<IAddressTableCellProps> = props => {
	const { id, name, address, onDelete, onEdit } = props

	return (
		<Box key={id} id={id} className={styles.addressTableCellWrapper}>
			{/* <Avatar
				src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
				alt="this is the image"
				fallback="df"
			/> */}
			<Box className={styles.addressTableCellTextWrapper}>
				<Text size="small" color="strong" weight="medium" truncate>
					{name}
				</Text>
				<Text size="xsmall" truncate>
					{address}
				</Text>
			</Box>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<TrashIcon />} onClick={onDelete}>
				Delete
			</Button>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<EditIcon />} onClick={onEdit}>
				Edit
			</Button>
		</Box>
	)
}
