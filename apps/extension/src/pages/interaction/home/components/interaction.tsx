import React from 'react'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'

import { RequestInteraction } from './request-interaction'
import { TransactionInteraction } from './transaction-interaction'

interface IProps {
	interaction: WalletInteractionWithTabId
}

export const Interaction: React.FC<IProps> = ({ interaction }) => {
	switch (interaction?.items.discriminator) {
		case 'transaction':
			return <TransactionInteraction interaction={interaction} />
		case 'authorizedRequest':
		case 'unauthorizedRequest':
			return <RequestInteraction interaction={interaction} />
		default:
			return null
	}
}
