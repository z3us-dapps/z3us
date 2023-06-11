import React from 'react'

import { Box } from 'ui/src/components-v2/box'

import '@src/browser/content-script'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'radix-connect-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

const ConnectButton: React.FC = () => (
	<Box>
		<radix-connect-button />
	</Box>
)

export default ConnectButton
