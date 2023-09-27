import { MessageAction as AppMessageAction } from '@src/browser/app/types'
import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { MessageAction as ContentScriptMessageAction } from '@src/browser/content-script/types'

export enum MessageSource {
	BACKGROUND = 'z3us-background',
	INPAGE = 'z3us-inpage',
	POPUP = 'z3us-popup',
	RADIX = 'radix',
}

export type MessageAction = AppMessageAction | BackgroundMessageAction | ContentScriptMessageAction

export type Message = {
	messageId: string
	fromTabId?: number
	action: MessageAction
	source: MessageSource
	target: MessageSource
	payload: any
}

export type ResponseMessage = Message & ({ payload: any } | { error: string })

export type MessageHandler = (message: Message) => Promise<any>

export type MessageHandlers = { [key: string]: MessageHandler }
