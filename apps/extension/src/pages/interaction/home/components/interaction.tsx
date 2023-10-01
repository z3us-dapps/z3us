import React from 'react'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'

import { AuthorizedRequestInteraction } from './authorized-request-interaction'
import { TransactionInteraction } from './transaction-interaction'
import { UnauthorizedRequestInteraction } from './unauthorized-request-interaction'

interface IProps {
	interaction: WalletInteractionWithTabId
}

export const Interaction: React.FC<IProps> = ({ interaction }) => {
	switch (interaction?.items.discriminator) {
		case 'transaction':
			return <TransactionInteraction interaction={interaction} />
		case 'authorizedRequest':
			return <AuthorizedRequestInteraction interaction={interaction} />
		case 'unauthorizedRequest':
			return <UnauthorizedRequestInteraction interaction={interaction} />
		default:
			return null
	}
}
