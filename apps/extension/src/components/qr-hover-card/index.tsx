import { CopyIcon, Cross2Icon } from '@radix-ui/react-icons'
import { QRCodeSVG } from 'qrcode.react'
import React from 'react'

import { Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { QrCodeIcon } from 'ui/src/components/icons'
import {
	Popover,
	PopoverArrow,
	PopoverClose,
	PopoverContent,
	PopoverPortal,
	PopoverTrigger,
} from 'ui/src/components/popover'
import type { CSS } from 'ui/src/theme'

import { useColorMode } from '@src/hooks/use-color-mode'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { getShortAddress } from '@src/utils/string-utils'

export interface IProps {
	css?: CSS
}

const defaultProps = {
	css: undefined,
}

export const QrHoverCard = ({ css }: IProps): JSX.Element => {
	const isDarkMode = useColorMode()
	const { entry } = useNoneSharedStore(state => ({
		entry: Object.values(state.publicAddresses).find(_account => _account.address === state.getCurrentAddressAction()),
	}))

	const shortAddress = getShortAddress(entry?.address)

	const handleCopyAddress = () => {
		copyTextToClipboard(entry?.address)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size="4" color="ghost" aria-label="current wallet qr code" iconOnly css={{ ...(css as any) }}>
					<QrCodeIcon />
				</Button>
			</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent sideOffset={0} css={{ width: '180px', backgroundColor: '$bgPanel', padding: '$4' }}>
					<Flex css={{ flexDirection: 'column', gap: 7 }}>
						<Flex css={{ flexDirection: 'column', gap: 5 }}>
							<Flex align="start" css={{ flexWrap: 'wrap' }}>
								<Text size="2" bold truncate css={{ maxWidth: '167px', pb: '4px', mr: '4px' }}>
									{entry?.name ? entry.name : 'Address:'}
								</Text>
								<Flex align="start">
									{shortAddress}
									<ButtonTipFeedback tooltip="Copy address">
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
									value={entry?.address}
									size={160}
									fgColor={isDarkMode ? '#a6a6a6' : '#161718'}
									bgColor={isDarkMode ? '#161718' : '#ffffff'}
								/>
							</Flex>
						</Flex>
					</Flex>
					<PopoverArrow offset={14} css={{ fill: '$bgPanel' }} />
				</PopoverContent>
			</PopoverPortal>
		</Popover>
	)
}

QrHoverCard.defaultProps = defaultProps
