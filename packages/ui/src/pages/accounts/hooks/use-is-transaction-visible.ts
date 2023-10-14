import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useIsTransactionVisible = (): boolean => {
	const [searchParams] = useSearchParams()

	return useMemo(() => !!searchParams.get('tx'), [searchParams])
}
