import { useLocation } from 'wouter'
import { useSharedStore } from '@src/store'
import { popupHtmlMap } from '@src/config'

export const useConnectHardwareWallet = () => {
	const [, setLocation] = useLocation()
	const { theme } = useSharedStore(state => ({
		theme: state.theme,
	}))

	const connectHardwareWallet = () => {
		window.open(`${window.location.origin}/${popupHtmlMap[theme]}#/hardware-wallet`)
		setLocation('#/hardware-wallet')
	}

	return [connectHardwareWallet]
}
