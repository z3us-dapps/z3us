import React from 'react'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'radix-connect-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

const ConnectButton: React.FC = () => <radix-connect-button />

export default ConnectButton