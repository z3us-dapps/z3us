import type { WalletInteraction } from '@radixdlt/radix-dapp-toolkit'

export enum MessageAction {
	APP_PING = 'v1-app-ping',
	APP_INTERACTION_CANCEL = 'v1-app-interaction-cancel',
}

export type WalletInteractionWithTabId = WalletInteraction & { fromTabId: number; senderURl: string }
