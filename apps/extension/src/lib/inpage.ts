import { INIT } from '@src/lib/v1/events'
import NewPublicV1 from '@src/lib/v1/inapge'
import { MessageService } from '@src/services/messanger'

declare global {
	interface Window {
		z3us: {
			v1: ReturnType<typeof NewPublicV1>
		}
	}
}

if (!window.z3us) {
	const messanger = new MessageService('inpage', null, window)

	const v1 = NewPublicV1(messanger.sendActionMessageFromInPage)

	const z3us = {
		v1,
	}

	window.z3us = z3us
	window.dispatchEvent(new CustomEvent(INIT, { detail: z3us }))
}
