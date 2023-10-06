import { useZdtState } from './zdt/use-zdt'

export const useIsUnlocked = () => {
	const { isWallet, isUnlocked } = useZdtState()
	return !isWallet || isUnlocked
}
