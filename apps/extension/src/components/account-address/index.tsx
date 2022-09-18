import React from 'react'
import { useSharedStore, useStore } from '@src/store'
import { CSS } from 'ui/src/theme'
import { CopyIcon } from '@radix-ui/react-icons'
import { Flex, Text } from 'ui/src/components/atoms'
import { ToolTip } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { getShortAddress } from '@src/utils/string-utils'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'

interface IProps {
	address: string
	isCopyButtonVisible?: boolean
	css: CSS
}

const defaultProps = {
	isCopyButtonVisible: true,
}

export const AccountAddress: React.FC<IProps> = ({ address, isCopyButtonVisible, css }) => {
	const { accounts } = useStore(state => ({
		accounts: Object.values(state.publicAddresses),
	}))
	const { addressBook } = useSharedStore(state => ({
		addressBook: state.addressBook,
	}))

	const entry = addressBook[address] || accounts.find(_account => _account.address === address)
	const shortAddress = getShortAddress(address)

	const handleCopyAddress = () => {
		copyTextToClipboard(address)
	}

	return (
		<Flex align="center">
			<ToolTip message={address} css={{ maxWidth: '220px', wordWrap: 'break-word' }}>
				<Text size="5" truncate medium css={{ lineHeight: '20px', maxWidth: '240px', ...(css as any) }}>
					{entry?.name ? `${entry.name} (${shortAddress})` : shortAddress}
				</Text>
			</ToolTip>
			{isCopyButtonVisible ? (
				<ButtonTipFeedback tooltip="Copy address" delay={500} bgColor="$bgPanel">
					<Button size="1" iconOnly color="ghost" onClick={handleCopyAddress} css={{ ml: '2px', ...(css as any) }}>
						<CopyIcon />
					</Button>
				</ButtonTipFeedback>
			) : null}
		</Flex>
	)
}

AccountAddress.defaultProps = defaultProps
