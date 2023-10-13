import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { EditIcon, TrashIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import type { Persona } from 'ui/src/store/types'

import * as styles from './styles.css'

const messages = defineMessages({
	delete: {
		id: 'settings.personas.entry.delete',
		defaultMessage: 'Delete',
	},
	edit: {
		id: 'settings.personas.entry.edit',
		defaultMessage: 'Edit',
	},
})

interface IProps {
	row: { original: Persona }
	onDelete: () => void
	onEdit: () => void
}

export const PersonaCell: React.FC<IProps> = ({ row, onDelete, onEdit }) => {
	const intl = useIntl()

	return (
		<Box key={row.original.identityAddress} className={styles.addressTableCellWrapper}>
			<ResourceImageIcon address={row.original.identityAddress} />
			<Box className={styles.addressTableCellTextWrapper}>
				<Text size="small" color="strong" weight="medium" truncate>
					{row.original.label}
				</Text>
				<Text size="xsmall" truncate>
					{row.original.identityAddress}
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
