import React, { ReactElement } from 'react'
import { useDecryptTransaction } from '@src/services/react-query/queries/radix'
import { Action, Transaction } from '@src/services/types'

interface TProps {
	tx?: Transaction
	activity?: Action
}

const defaultProps = {
	tx: undefined,
	activity: undefined,
}

export const TransactionMessage: React.FC<TProps> = ({ tx, activity }: TProps) => {
	const { data: message } = useDecryptTransaction(tx, activity)

	if (!message) {
		return null
	}

	const MessageString = () => message as unknown as ReactElement

	return <MessageString />
}

TransactionMessage.defaultProps = defaultProps
