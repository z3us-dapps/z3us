import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { EditIcon, TrashIcon } from 'ui/src/components/icons'

interface IAddressEditButtonsCellProps {
	id: string
	onDelete: () => void
	onEdit: () => void
}

export const AddressEditButtonsCell: React.FC<IAddressEditButtonsCellProps> = props => {
	const { id, onDelete, onEdit } = props

	return (
		<Box key={id} id={id} display="flex" justifyContent="flex-end" flexShrink={0} gap="small">
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<TrashIcon />} onClick={onDelete}>
				Delete
			</Button>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<EditIcon />} onClick={onEdit}>
				Edit
			</Button>
		</Box>
	)
}
