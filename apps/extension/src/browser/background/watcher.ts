import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const watch = async () => {
	const release = await mutex.acquire()

	release()
}

const BACKGROUND_EVENT = 'z3us.backgroundwatcher'

const triggerWatch = () => dispatchEvent(new CustomEvent(BACKGROUND_EVENT))

export default () => {
	// eslint-disable-next-line no-restricted-globals
	addEventListener(BACKGROUND_EVENT, watch)
	setInterval(triggerWatch, 1000 * 15) // 15 seconds
}
