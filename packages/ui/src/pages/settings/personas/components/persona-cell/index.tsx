import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { EditIcon, TrashIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import type { Persona } from 'ui/src/store/types'

import * as styles from './styles.css'

const messages = defineMessages({
	delete: {
		id: 'K3r6DQ',
		defaultMessage: 'Delete',
	},
	edit: {
		id: 'wEQDC6',
		defaultMessage: 'Edit',
	},
})

interface IProps {
	row: { original: Persona }
	onEdit: (address: string) => void
	onDelete: (address: string) => void
}

export const PersonaCell: React.FC<IProps> = ({ row, onDelete, onEdit }) => {
	const intl = useIntl()

	const handleEdit = () => {
		onEdit(row.original.identityAddress)
	}

	const handleDelete = () => {
		onDelete(row.original.identityAddress)
	}

	return (
		<Box key={row.original.identityAddress} className={styles.addressTableCellWrapper}>
			<Box className={styles.addressTableCellTextWrapper}>
				<Text size="small" color="strong" weight="medium" truncate>
					{row.original.label}
				</Text>
				<Text size="xsmall" truncate>
					{row.original.identityAddress}
				</Text>
			</Box>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<TrashIcon />} onClick={handleDelete}>
				{intl.formatMessage(messages.delete)}
			</Button>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<EditIcon />} onClick={handleEdit}>
				{intl.formatMessage(messages.edit)}
			</Button>
		</Box>
	)
}
