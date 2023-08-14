import { useMemo } from 'react'
import { useMatch } from 'react-router-dom'

export const useResourceType = (): string => {
	const match = useMatch('/accounts/:accountId/:resourceType/*')
	return useMemo(() => match?.params.resourceType || '', [match])
}
