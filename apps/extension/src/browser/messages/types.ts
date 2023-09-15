export enum MessageSource {
	POPUP = 'z3us-popup',
	BACKGROUND = 'z3us-background',
	INPAGE = 'z3us-inpage',
	RADIX = 'radix',
}

export enum MessageAction {
	PING = 'v1-ping',

	VAULT_LOCK = 'v1-vault-lock',
	VAULT_UNLOCK = 'v1-vault-unlock',
	VAULT_SAVE = 'v1-vault-store',
	VAULT_REMOVE = 'v1-vault-remove',
	VAULT_IS_UNLOCKED = 'v1-vault-is-unlocked',

	SIGN = 'v1-sign',
	GET_PUBLIC_KEY = 'v1-get-public-key',

	GET_PERSONAS = 'v1-personas',
	GET_ACCOUNTS = 'v1-accounts',

	RADIX = 'v1-radix',
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
