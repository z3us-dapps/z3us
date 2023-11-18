import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { TrashIcon } from 'ui/src/components/icons'
import { AccountSnippet } from 'ui/src/components/snippet/account'
import { Text } from 'ui/src/components/typography'
import type { ApprovedDapps } from 'ui/src/store/types'

import * as styles from './styles.css'

const messages = defineMessages({
	table_cell_dapp_title: {
		id: 'YjOAs/',
		defaultMessage: 'dApp',
	},
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
				<Text size="xxsmall" weight="medium" truncate>
					{intl.formatMessage(messages.table_cell_dapp_title)}
				</Text>
				<AccountSnippet address={row.original.address} />
			</Box>
			<Box className={styles.addressTableCellTextWrapper}>
				<Text size="xxsmall" weight="medium" truncate>
					{intl.formatMessage(messages.persona)}
				</Text>
				<AccountSnippet address={row.original.persona} />
			</Box>
			<Box className={clsx(styles.addressTableCellTextWrapper, styles.addressTableCellAddressWrapper)}>
				<Text size="xxsmall" weight="medium" truncate>
					{intl.formatMessage(messages.accounts)}
				</Text>
				<Text size="xxsmall" weight="medium" truncate>
					{row.original.accounts.map(account => (
						<AccountSnippet key={account} address={account} />
					))}
				</Text>
			</Box>
			<Button sizeVariant="small" styleVariant="secondary" leftIcon={<TrashIcon />} onClick={onDelete}>
				{intl.formatMessage(messages.delete)}
			</Button>
		</Box>
	)
}
