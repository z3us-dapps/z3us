import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useIsActivitiesVisible = (): boolean => {
	const [searchParams] = useSearchParams()

	return useMemo(() => !!searchParams.get('acts'), [searchParams])
}
