export enum MessageSource {
	POPUP = 'z3us-popup',
	BACKGROUND = 'z3us-background',
	INPAGE = 'z3us-inpage',
	OFFSCREEN = 'z3us-offscreen',
}

export enum MessageAction {
	PING = 'v1-ping',
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
