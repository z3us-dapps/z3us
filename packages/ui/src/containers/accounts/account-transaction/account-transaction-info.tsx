/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './account-transaction.css'

interface IAccountsTransactionInfoProps {
	leftTitle: React.ReactNode
	rightData: React.ReactNode
}

export const AccountsTransactionInfo: React.FC<IAccountsTransactionInfoProps> = props => {
	const { leftTitle, rightData } = props

	return (
		<Box className={styles.transactionInfoWrapper}>
			<Box display="flex" flexGrow={1} alignItems="flex-end">
				<Text size="small" color="strong">
					<>{leftTitle}</>
				</Text>
				<Box className={styles.transactionRowDotted} />
			</Box>
			<Box display="flex">
				<>{rightData}</>
			</Box>
		</Box>
	)
}
