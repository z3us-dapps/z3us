import React, { ReactElement } from 'react'
import { useDecryptTransaction } from '@src/hooks/react-query/queries/radix'
import { Action, Transaction } from '@src/types'
import LoaderBars from 'ui/src/components/loader-bars'

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
		return <LoaderBars size="1" css={{ mt: '2px' }} />
	}

	const MessageString = () => message as unknown as ReactElement

	return <MessageString />
}

TransactionMessage.defaultProps = defaultProps
