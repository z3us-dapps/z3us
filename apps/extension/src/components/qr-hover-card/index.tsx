import React from 'react'
import Button from 'ui/src/components/button'
import { useStore } from '@src/store'
import { QRCodeSVG } from 'qrcode.react'
import { getShortAddress } from '@src/utils/string-utils'
import { CopyIcon, Cross2Icon } from '@radix-ui/react-icons'
import { QrCodeIcon } from 'ui/src/components/icons'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { Text, Flex } from 'ui/src/components/atoms'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger, PopoverClose } from 'ui/src/components/popover'
import { useColorMode } from '@src/hooks/use-color-mode'

export const QrHoverCard: React.FC = () => {
	const isDarkMode = useColorMode()
	const { account, addressBook } = useStore(state => ({
		account: state.account,
		addressBook: state.addressBook,
	}))

	const addtString = account?.address.toString()
	const entry = addressBook[addtString]
	const shortAddress = getShortAddress(addtString)

	const handleCopyAddress = () => {
		copyTextToClipboard(addtString)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size="4" color="ghost" aria-label="current wallet qr code" iconOnly>
					<QrCodeIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent sideOffset={0} css={{ width: '180px', backgroundColor: '$bgPanel', padding: '$4' }}>
				<Flex css={{ flexDirection: 'column', gap: 7 }}>
					<Flex css={{ flexDirection: 'column', gap: 5 }}>
						<Text>
							<Flex align="center">
								<Text size="2" bold>
									{entry?.name ? entry.name : 'Address:'}
								</Text>
								<Text size="2" css={{ ml: '$1', mr: '$1' }}>
									{shortAddress}
								</Text>
								<ButtonTipFeedback feedback="Address copied" delay={500} css={{ backgroundColor: '$bgPanel' }}>
									<Button size="1" iconOnly color="ghost" onClick={handleCopyAddress}>
										<CopyIcon />
									</Button>
								</ButtonTipFeedback>
								<PopoverClose aria-label="Close">
									<Cross2Icon />
								</PopoverClose>
							</Flex>
						</Text>
						<Flex
							align="center"
							justify="center"
							css={{ border: '1px solid', borderColor: '$borderPanel2', height: '180px', br: '$1' }}
						>
							<QRCodeSVG
								value={addtString}
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
