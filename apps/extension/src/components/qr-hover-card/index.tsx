import React from 'react'
import Button from 'ui/src/components/button'
import { useStore } from '@src/store'
import { QRCodeSVG } from 'qrcode.react'
import { CSS } from 'ui/src/theme'
import { getShortAddress } from '@src/utils/string-utils'
import { CopyIcon, Cross2Icon } from '@radix-ui/react-icons'
import { QrCodeIcon } from 'ui/src/components/icons'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { Text, Flex } from 'ui/src/components/atoms'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger, PopoverClose } from 'ui/src/components/popover'
import { useColorMode } from '@src/hooks/use-color-mode'

export interface IProps {
	css?: CSS
}

const defaultProps = {
	css: undefined,
}

export const QrHoverCard = ({ css }: IProps): JSX.Element => {
	const isDarkMode = useColorMode()
	const { accountAddress, addressBook } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		addressBook: state.addressBook,
	}))

	const entry = addressBook[accountAddress]
	const shortAddress = getShortAddress(accountAddress)

	const handleCopyAddress = () => {
		copyTextToClipboard(accountAddress)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size="4" color="ghost" aria-label="current wallet qr code" iconOnly css={{ ...(css as any) }}>
					<QrCodeIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent sideOffset={0} css={{ width: '180px', backgroundColor: '$bgPanel', padding: '$4' }}>
				<Flex css={{ flexDirection: 'column', gap: 7 }}>
					<Flex css={{ flexDirection: 'column', gap: 5 }}>
						<Flex align="start" css={{ flexWrap: 'wrap' }}>
							<Text size="2" bold truncate css={{ maxWidth: '167px', pb: '4px', mr: '4px' }}>
								{entry?.name ? entry.name : 'Address:'}
							</Text>
							<Flex align="start">
								{shortAddress}

								<ButtonTipFeedback tooltip="Copy address" bgColor="$bgPanel">
									<Button size="1" iconOnly color="ghost" onClick={handleCopyAddress} css={{ mt: '-5px' }}>
										<CopyIcon />
									</Button>
								</ButtonTipFeedback>
							</Flex>
							<PopoverClose aria-label="Close">
								<Cross2Icon />
							</PopoverClose>
						</Flex>
						<Flex
							align="center"
							justify="center"
							css={{ border: '1px solid', borderColor: '$borderPanel2', height: '180px', br: '$1' }}
						>
							<QRCodeSVG
								value={accountAddress}
								size={160}
								fgColor={isDarkMode ? '#a6a6a6' : '#161718'}
								bgColor={isDarkMode ? '#161718' : '#ffffff'}
							/>
						</Flex>
					</Flex>
				</Flex>
				<PopoverArrow offset={14} css={{ fill: '$bgPanel' }} />
			</PopoverContent>
		</Popover>
	)
}

QrHoverCard.defaultProps = defaultProps
