import clsx from 'clsx'
import { QRCodeSVG } from 'qrcode.react'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { QrCode2Icon, UpRight2Icon } from 'ui/src/components/icons'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components/popover'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

interface IProps {
	className?: string
}

const messages = defineMessages({
	send: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
	address: {
		id: 'f4sJ8p',
		defaultMessage: 'Address QR',
	},
})

export const CardButtons: React.FC<IProps> = props => {
	const { className } = props
	const { accountId } = useParams()
	const intl = useIntl()

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={intl.formatMessage(messages.send)}>
				<Button
					iconOnly
					rounded
					styleVariant="inverse"
					sizeVariant={{ mobile: 'medium', tablet: 'large' }}
					to={`/transfer?accountId=${accountId}`}
				>
					<UpRight2Icon />
				</Button>
			</ToolTip>

			<PopoverRoot>
				<PopoverTrigger asChild>
					<Box>
						<ToolTip message={intl.formatMessage(messages.address)}>
							<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'medium', tablet: 'large' }}>
								<QrCode2Icon />
							</Button>
						</ToolTip>
					</Box>
				</PopoverTrigger>
				<PopoverPortal>
					<PopoverContent align="center" sideOffset={10} style={{ maxWidth: '300px' }}>
						<Box padding="medium" display="flex" flexDirection="column" gap="small">
							<Box display="flex" alignItems="center" gap="small">
								<Text size="xsmall" weight="medium">
									{getShortAddress(accountId)}
								</Text>
								<CopyAddressButton
									styleVariant="ghost"
									sizeVariant="xsmall"
									address={accountId}
									iconOnly
									rounded={false}
									tickColor="white"
									toolTipDisabled
								/>
							</Box>
							<Box>
								<QRCodeSVG value={accountId} size={180} className={styles.cardButtonsQrCode} />
							</Box>
						</Box>
					</PopoverContent>
				</PopoverPortal>
			</PopoverRoot>
		</Box>
	)
}
