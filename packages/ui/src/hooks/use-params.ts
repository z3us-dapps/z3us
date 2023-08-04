import { useSearchParams } from 'react-router-dom'

export const useSearchParam = (): string | null => {
	const [searchParams] = useSearchParams()
	return searchParams.get('query')
}

export const useAccountParam = (): string | null => {
	const [searchParams] = useSearchParams()
	return searchParams.get('account')
}

export const useAssetParam = (): string | null => {
	const [searchParams] = useSearchParams()
	return searchParams.get('asset')
}

export const useTransactionParam = (): string | null => {
	const [searchParams] = useSearchParams()
	return searchParams.get('tx')
}

export const useIsActivity = (): boolean => {
	const [searchParams] = useSearchParams()
	return !!searchParams.get('activity')
}
