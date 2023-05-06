const defaultTimeout = 3 * 60 * 1000
const timeoutError = new Error('Timeout')

const timeout = async (promise, time) => {
	let timer
	try {
		return await Promise.race([
			promise,
			new Promise((_, reject) => {
				timer = setTimeout(reject, time, timeoutError)
			}),
		])
	} finally {
		clearTimeout(timer)
	}
}

export default async (p: Promise<any>) => timeout(p, defaultTimeout)
