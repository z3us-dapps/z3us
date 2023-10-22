import { QRCodeSVG } from 'qrcode.react'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components/popover'
import { Text } from 'ui/src/components/typography'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

interface IProps {
	address: string
	children: React.ReactNode
}

export const QrPopOver: React.FC<IProps> = props => {
	const { address, children } = props

	return (
		<PopoverRoot>
			<PopoverTrigger asChild>
				<Box>{children}</Box>
			</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent align="center" sideOffset={10} style={{ maxWidth: '300px' }}>
					<Box padding="medium" display="flex" flexDirection="column" gap="small">
						<Box display="flex" alignItems="center" gap="small">
							<Text size="xsmall" weight="medium">
								{getShortAddress(address)}
							</Text>
							<CopyAddressButton
								styleVariant="ghost"
								sizeVariant="xsmall"
								address={address}
								iconOnly
								rounded={false}
								tickColor="white"
								toolTipDisabled
							/>
						</Box>
						<Box>
							<QRCodeSVG value={address} size={180} className={styles.cardButtonsQrCode} />
						</Box>
					</Box>
				</PopoverContent>
			</PopoverPortal>
		</PopoverRoot>
	)
}
