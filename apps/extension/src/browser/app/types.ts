import type { WalletInteractionWithOrigin } from '@radixdlt/radix-connect-schemas'

export enum MessageAction {
	APP_PING = 'v1-app-ping',
	APP_INTERACTION_CANCEL = 'v1-app-interaction-cancel',
}

export type WalletInteractionWithTabId = WalletInteractionWithOrigin & { fromTabId: number; senderURl: string }
