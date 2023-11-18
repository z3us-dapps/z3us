import { useParams } from 'react-router-dom'

export const useIsAllAccounts = (): boolean => {
	const { accountId = '-' } = useParams()
	const isAllAccount = accountId === '-'

	return isAllAccount
}
