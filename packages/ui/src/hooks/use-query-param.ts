import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useQueryParam = () => {
	const [searchParams] = useSearchParams()

	return useMemo(() => searchParams.get('query'), [searchParams])
}
