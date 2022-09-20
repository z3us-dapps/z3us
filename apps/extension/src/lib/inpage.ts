import { MessageService } from '@src/services/messanger'
import NewPublicV1 from '@src/lib/v1/inapge'
import { INIT } from '@src/lib/v1/events'

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

window.dispatchEvent(new CustomEvent(INIT, { detail: z3us }))
