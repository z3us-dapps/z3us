import { MessageService } from '@src/services/messanger'
import NewPublicV1 from './v1/inapge'

const messanger = new MessageService('inpage', null, window)

const v1 = NewPublicV1(messanger.sendActionMessageFromInPage)

const z3us = {
	v1,
}

declare global {
	interface Window {
		z3us: typeof z3us
	}
}

window.z3us = z3us
