import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { TrashIcon } from 'ui/src/components/icons'
import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import { Text } from 'ui/src/components/typography'
import type { ApprovedDapps } from 'ui/src/store/types'

import * as styles from './styles.css'

const messages = defineMessages({
	persona: {
		id: 'JGu6zs',
		defaultMessage: 'Persona',
	},
	accounts: {
		id: 'pQOchI',
		defaultMessage: 'Selected accounts',
	},
	delete: {
		id: 'KUFMiM',
		defaultMessage: 'Revoke access',
	},
})

interface IProps {
	row: { original: ApprovedDapps[keyof ApprovedDapps] & { address: string } }
	onDelete: () => void
}

export const DappCell: React.FC<IProps> = ({ row, onDelete }) => {
	const intl = useIntl()

	return (
		<Box key={row.original.address} className={styles.addressTableCellWrapper}>
			<Box className={styles.addressTableCellTextWrapper}>
				<ResourceSnippet address={row.original.address} />
			</Box>
			<Text size="small" weight="medium" color="strong">
				{intl.formatMessage(messages.persona)}
				<ResourceSnippet address={row.original.persona} />
			</Text>
			<Text size="small" weight="medium" color="strong">
				{intl.formatMessage(messages.accounts)}
				{row.original.accounts.map(account => (
					<ResourceSnippet key={account} address={account} />
				))}
			</Text>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<TrashIcon />} onClick={onDelete}>
				{intl.formatMessage(messages.delete)}
			</Button>
		</Box>
	)
}
