export const reason = 'z3us_message_timeout'
const defaultTimeout = 30 * 1000 // 30 seconds

const timeout = async (promise, time) => {
	let timer
	try {
		return await Promise.race([
			promise,
			new Promise((_, reject) => {
				timer = setTimeout(reject, time, reason)
			}),
		])
	} finally {
		clearTimeout(timer)
	}
}

export default async (p: Promise<any>, after: number = defaultTimeout) => timeout(p, after)
