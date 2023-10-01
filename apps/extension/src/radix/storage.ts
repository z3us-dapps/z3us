import { ResultAsync } from 'neverthrow'
import browser from 'webextension-polyfill'

export const chromeStorageSync = {
	setItem: (value: Record<string, any>) =>
		ResultAsync.fromPromise(browser.storage.sync.set(value), error => error as Error),
	removeItem: (key: string) => ResultAsync.fromPromise(browser.storage.sync.remove(key), error => error as Error),
	getItem: (key: string | null) => ResultAsync.fromPromise(browser.storage.sync.get(key), error => error as Error),
	setSingleItem: (key: string, value: any) =>
		ResultAsync.fromPromise(browser.storage.sync.set({ [key]: value }), error => error as Error),
	getSingleItem: (key: string) =>
		ResultAsync.fromPromise(
			browser.storage.sync.get(key).then(result => result[key]),
			error => error as Error,
		),
} as const
