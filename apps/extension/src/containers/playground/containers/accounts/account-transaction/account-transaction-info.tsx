/* eslint-disable react/jsx-no-useless-fragment, @typescript-eslint/no-unused-vars */
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './account-transaction.css'

interface IAccountsTransactionInfoRequiredProps {
	leftTitle: React.ReactNode
	rightData: React.ReactNode
}

interface IAccountsTransactionInfoOptionalProps {}

interface IAccountsTransactionInfoProps
	extends IAccountsTransactionInfoRequiredProps,
		IAccountsTransactionInfoOptionalProps {}

const defaultProps: IAccountsTransactionInfoOptionalProps = {}

export const AccountsTransactionInfo = (props: IAccountsTransactionInfoProps): JSX.Element => {
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

AccountsTransactionInfo.defaultProps = defaultProps
