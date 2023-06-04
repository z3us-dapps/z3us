import type { ReactElement } from 'react';
import React from 'react'

import LoaderBars from 'ui/src/components/loader-bars'

import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { useDecryptTransaction } from '@src/hooks/react-query/queries/radix'
import { useSharedStore } from '@src/hooks/use-store'
import type { Action, Transaction } from '@src/types';
import { KeystoreType } from '@src/types'

interface TProps {
	tx?: Transaction
	activity?: Action
}

const defaultProps = {
	tx: undefined,
	activity: undefined,
}

export const TransactionMessage: React.FC<TProps> = ({ tx, activity }: TProps) => {
	const { signingKey, keystore } = useSharedStore(state => ({
		signingKey: state.signingKey,
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
	}))
	const { data: message } = useDecryptTransaction(tx, activity)

	if (keystore.type === KeystoreType.HARDWARE && !signingKey) {
		return <HardwareWalletReconnect />
	}
	if (!message) {
		return <LoaderBars size="1" css={{ mt: '2px' }} />
	}

	const MessageString = () => message as unknown as ReactElement

	return <MessageString />
}

TransactionMessage.defaultProps = defaultProps
