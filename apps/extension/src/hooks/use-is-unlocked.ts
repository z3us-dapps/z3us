import { usePublicKey } from './use-public-key'

export const useIsUnlocked = (): boolean => {
	const pk = usePublicKey()

	return !!pk
}
