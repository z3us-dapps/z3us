import type { LOCALE } from 'ui/src/store/types'

import { useNoneSharedStore } from './use-store'

export const useLocale = (): LOCALE => {
	const { locale } = useNoneSharedStore(state => ({
		locale: state.locale,
	}))

	return locale
}
