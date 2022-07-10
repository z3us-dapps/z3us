import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

export const sendAPDU = async (
	cla: number,
	ins: number,
	p1: number,
	p2: number,
	data?: Buffer,
	statusList?: number[],
): Promise<Buffer> => {
	const release = await mutex.acquire()
	const transport = await TransportWebHID.openConnected()
	try {
		const result = await transport.send(cla, ins, p1, p2, data, statusList)
		await transport.close()
		release()
		return result
	} catch (e) {
		await transport.close()
		release()
		throw e
	}
}

export const useAPDU = () => sendAPDU
