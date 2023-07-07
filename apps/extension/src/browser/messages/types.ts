export enum MessageSource {
	POPUP = 'z3us-popup',
	BACKGROUND = 'z3us-background',
	INPAGE = 'z3us-inpage',
}

export enum MessageAction {
	PING = 'v1-ping',

	VAULT_UNLOCK = 'v1-vault-get',
	VAULT_SAVE = 'v1-vault-store',
	VAULT_REMOVE = 'v1-vault-remove',

	SIGN = 'v1-sign',
	GET_PUBLIC_KEY = 'v1-get-public-key',
}

export type Message = {
	messageId: string
	fromTabId?: number
	action: MessageAction
	source: MessageSource
	target: MessageSource
	payload: any
}

export type ResponseMessage = Message & { payload: any | { code: number; error: any }; request?: any }

export type MessageHandler = (message: Message) => Promise<any>

export type MessageHandlers = { [key: string]: MessageHandler }
