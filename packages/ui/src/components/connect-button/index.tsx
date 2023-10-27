import React from 'react'

import { Box } from 'ui/src/components/box'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './styles.css'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'radix-connect-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

export const ConnectButton = () => {
	const isMobile = useIsMobileWidth()
	const buttonRadius = isMobile ? 12 : 40
	const buttonWidth = isMobile ? 40 : 138
	const buttonHeight = isMobile ? 32 : 32

	return (
		<Box className={styles.radixConnectButtonWrapper}>
			<style
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{
					__html: `radix-connect-button { --radix-connect-button-border-radius: ${buttonRadius}px; --radix-connect-button-width: ${buttonWidth}px; --radix-connect-button-height: ${buttonHeight}px}`,
				}}
			/>
			<radix-connect-button />
		</Box>
	)
}
