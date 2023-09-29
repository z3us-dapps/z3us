export const reason = 'z3us_message_timeout'
const defaultTimeout = 30 * 1000 // 30 seconds

const timeout = async <T>(promise: Promise<T>, time: number = defaultTimeout) => {
	let timer
	try {
		return await Promise.race([
			promise,
			new Promise<T>((_, reject) => {
				timer = setTimeout(reject, time, reason)
			}),
		])
	} finally {
		clearTimeout(timer)
	}
}

export default timeout
