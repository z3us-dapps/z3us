import type { MessageAction as AppMessageAction } from '@src/browser/app/types'
import type { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import type { MessageAction as ContentScriptMessageAction } from '@src/browser/content-script/types'
import type { MessageAction as InPageMessageAction } from '@src/browser/inpage/types'

export enum MessageSource {
	BACKGROUND = 'z3us-background',
	INPAGE = 'z3us-inpage',
	POPUP = 'z3us-popup',
	RADIX = 'radix',
}

export type MessageAction =
	| AppMessageAction
	| BackgroundMessageAction
	| ContentScriptMessageAction
	| InPageMessageAction

export type Message = {
	messageId: string
	fromTabId?: number
	action: MessageAction
	source: MessageSource
	target: MessageSource
	payload: any
}

export type ResponseMessageData = { payload?: any; error?: string }

export type ResponseMessage = {
	messageId: string
	fromTabId?: number
	action: MessageAction
	source: MessageSource
	target: MessageSource
} & ResponseMessageData

export type MessageHandler = (message: Message) => Promise<any>

export type MessageHandlers = { [key: string]: MessageHandler }

export interface Z3USEvent<T = any>
	extends CustomEvent<{
		data?: T
		error?: string
	}> {}
