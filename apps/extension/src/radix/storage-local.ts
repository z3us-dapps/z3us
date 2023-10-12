import { ResultAsync } from 'neverthrow'
import browser from 'webextension-polyfill'

export const chromeLocalStore = {
	setItem: (value: Record<string, any>) =>
		ResultAsync.fromPromise(browser.storage.local.set(value), error => error as Error),
	removeItem: (key: string) => ResultAsync.fromPromise(browser.storage.local.remove(key), error => error as Error),
	getItem: (key: string | null) => ResultAsync.fromPromise(browser.storage.local.get(key), error => error as Error),
	setSingleItem: (key: string, value: any) =>
		ResultAsync.fromPromise(browser.storage.local.set({ [key]: value }), error => error as Error),
	getSingleItem: (key: string) =>
		ResultAsync.fromPromise(
			browser.storage.local.get(key).then(result => result[key]),
			error => error as Error,
		),
} as const
