import { routes } from './routes'

export const settingsMenuPaths = {
	GENERAL: 'general',
	ACCOUNTS: 'accounts',
	ADDRESS_BOOK: 'address-book',
}

export const settingsMenuSlugs = {
	HOME: `/${routes.ACCOUNTS}/${routes.SETTINGS}`,
	GENERAL: `/${routes.ACCOUNTS}/${routes.SETTINGS}/${settingsMenuPaths.GENERAL}`,
	ACCOUNTS: `/${routes.ACCOUNTS}/${routes.SETTINGS}/${settingsMenuPaths.ACCOUNTS}`,
	ADDRESS_BOOK: `/${routes.ACCOUNTS}/${routes.SETTINGS}/${settingsMenuPaths.ADDRESS_BOOK}`,
}
