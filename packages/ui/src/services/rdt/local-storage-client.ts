import type { StorageProvider } from '@radixdlt/radix-dapp-toolkit'
import type { Result } from 'neverthrow'
import { ResultAsync, err, ok } from 'neverthrow'

const errorIdentity = (e: unknown) => e as Error

const parseJSON = <T = Record<string, any>>(text: string): Result<T, Error> => {
	try {
		return ok(JSON.parse(text))
	} catch (error) {
		return err(errorIdentity(error))
	}
}

export const getLocalStorageClient = (keystoreId: string): StorageProvider => {
	const getData = (key: string): Promise<string | undefined> =>
		new Promise((resolve, reject) => {
			try {
				const data = localStorage.getItem(`z3us:rdt:${keystoreId}:${key}`)
				resolve(data || undefined)
			} catch (error) {
				reject(error)
			}
		})

	const setData = (key: string, data: any): Promise<void> =>
		new Promise((resolve, reject) => {
			try {
				localStorage.setItem(`z3us:rdt:${keystoreId}:${key}`, JSON.stringify(data))
				resolve()
			} catch (error) {
				reject(error)
			}
		})

	return {
		getData: <T = any>(key: string) =>
			ResultAsync.fromPromise(getData(key), errorIdentity).andThen(data => (data ? parseJSON<T>(data) : ok(undefined))),
		setData: (key: string, data: any) => ResultAsync.fromPromise(setData(key, data), errorIdentity),
	}
}
