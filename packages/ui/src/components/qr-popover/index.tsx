import React from 'react'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components/popover'
import { QrStyled } from 'ui/src/components/qr-styled'
import { Text } from 'ui/src/components/typography'
import { getShortAddress } from 'ui/src/utils/string'

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
				<PopoverContent align="center" sideOffset={10} className={styles.qrPopOverWrapper}>
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
							<QrStyled value={address} />
						</Box>
					</Box>
				</PopoverContent>
			</PopoverPortal>
		</PopoverRoot>
	)
}
