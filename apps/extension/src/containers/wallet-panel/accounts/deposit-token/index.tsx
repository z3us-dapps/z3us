import BigNumber from 'bignumber.js'
import { QRCodeSVG } from 'qrcode.react'
import React, { useState } from 'react'
import { useRoute } from 'wouter'

import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'

import { AccountSelector } from '@src/components/account-selector'
import { SendReceiveHeader } from '@src/components/send-receive-header'
import { TokenSelector } from '@src/components/token-selector'
import { XRD_RRI } from '@src/config'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { useColorMode } from '@src/hooks/use-color-mode'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { formatBigNumber } from '@src/utils/formatters'
import { getShortAddress } from '@src/utils/string-utils'
import { getParamString } from '@src/utils/url-utils'

export const DepositToken: React.FC = () => {
	const [isDepositTokenRoute, params] = useRoute('/account/deposit/:rri')
	const [rri, setRRI] = useState<string>(getParamString(params, 'rri') || XRD_RRI)

	const isDarkMode = useColorMode()
	const { accountAddress, selectAccount } = useNoneSharedStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		selectAccount: state.selectAccountAction,
	}))

	const { data: token } = useTokenInfo(rri)
	const { data: balances } = useTokenBalances()

	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === rri)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const shortAddress = getShortAddress(accountAddress)

	const handleCopyAddressToClipboard = () => {
		copyTextToClipboard(accountAddress)
	}

	const handleSelectedTokenChange = (tokenRRI: string) => {
		setRRI(tokenRRI)
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex)
	}

	return (
		<Flex
			direction="column"
			css={{
				bg: '$bgPanel',
				height: '600px',
				position: 'absolute',
				zIndex: '1',
				left: '0',
				right: '0',
				bottom: '0',
			}}
		>
			<SendReceiveHeader backLocation={isDepositTokenRoute ? `/account/token/${rri}` : '/account'} />
			<Box css={{ pt: '20px', px: '23px', flex: '1' }}>
				<Box>
					<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Deposit</Text>
					<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>
						Deposit {token?.name}.
					</Text>
				</Box>
				<AccountSelector
					shortAddress={shortAddress}
					tokenAmount={formatBigNumber(selectedTokenAmmount)}
					tokenSymbol={token?.symbol.toUpperCase()}
					onAccountChange={handleAccountChange}
				/>
				{token && (
					<TokenSelector
						token={token}
						tokens={liquidBalances.map(balance => balance.rri)}
						onTokenChange={handleSelectedTokenChange}
					/>
				)}
				<Flex justify="center" css={{ mt: '24px' }}>
					<Flex
						align="center"
						justify="center"
						css={{ border: '1px solid', borderColor: '$borderPanel2', width: '200px', height: '200px', br: '$2' }}
					>
						<QRCodeSVG
							value={accountAddress}
							size={180}
							fgColor={isDarkMode ? '#a6a6a6' : '#161718'}
							bgColor={isDarkMode ? '#161718' : '#ffffff'}
						/>
					</Flex>
				</Flex>
			</Box>
			<Box css={{ px: '$2', pb: '$2' }}>
				<ButtonTipFeedback tooltip="Copy address" sideOffset={5}>
					<Button size="6" color="primary" aria-label="copy address" onClick={handleCopyAddressToClipboard} fullWidth>
						Copy address
					</Button>
				</ButtonTipFeedback>
			</Box>
		</Flex>
	)
}

export default DepositToken
