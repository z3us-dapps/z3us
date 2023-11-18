import { DataRequestBuilder, RadixDappToolkit, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'
import { useEffect } from 'react'

// @ts-ignore
import demoScript from '../lib/demo?url'
import './App.css'

declare global {
	interface Window {
		rdt?: RadixDappToolkit
	}
}

const rdt = RadixDappToolkit({
	dAppDefinitionAddress: 'account_tdx_e_128uml7z6mqqqtm035t83alawc3jkvap9sxavecs35ud3ct20jxxuhl',
	networkId: RadixNetwork.Mainnet,
	applicationName: 'Radix Web3 dApp',
	applicationVersion: '1.0.0',
})
rdt.walletApi.setRequestData(DataRequestBuilder.persona(), DataRequestBuilder.accounts().exactly(1))

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'radix-connect-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

const App = () => {
	useEffect(() => {
		window.rdt = rdt

		const script = document.createElement('script')
		script.src = demoScript
		script.type = 'module'
		script.async = true

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
			window.rdt = undefined
		}
	}, [])

	return (
		<div>
			<radix-connect-button />
			<div className="z3us-demo" data-theme="dark" data-rdt="rdt" />
		</div>
	)
}

export default App
