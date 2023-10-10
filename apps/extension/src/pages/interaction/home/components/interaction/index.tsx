import React from 'react'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'

import { LoginRequest } from './login'
import { TransactionRequest } from './transaction'

interface IProps {
	interaction: WalletInteractionWithTabId
}

export const Interaction: React.FC<IProps> = ({ interaction }) => {
	switch (interaction?.items.discriminator) {
		case 'transaction':
			return <TransactionRequest interaction={interaction} />
		case 'authorizedRequest':
		case 'unauthorizedRequest':
			return <LoginRequest interaction={interaction} />
		default:
			return null
	}
}
