import { useSearchParams } from 'react-router-dom'

import { SEARCH_ACTIVITY_PARAM } from 'ui/src/constants/routes'

/**
 * A custom React hook that checks if the current route contains the "activity" parameter in the search query.
 *
 * @returns {boolean} True if the "activity" parameter is present in the search query, otherwise false.
 */
export const useIsAccountActivityRoute = (): boolean => {
	const [searchParams] = useSearchParams()

	return !!searchParams.get(SEARCH_ACTIVITY_PARAM)
}
