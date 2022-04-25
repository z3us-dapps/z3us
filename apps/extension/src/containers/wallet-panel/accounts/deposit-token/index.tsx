import React, { useState } from 'react'
import { useStore } from '@src/store'
import { useRoute } from 'wouter'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { useTokenInfo, useTokenBalances } from '@src/services/react-query/queries/radix'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { getParamString } from '@src/utils/url-utils'
import { getShortAddress } from '@src/utils/string-utils'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { useColorMode } from '@src/hooks/use-color-mode'
import { QRCodeSVG } from 'qrcode.react'
import { AccountSelector } from '@src/components/account-selector'
import { TokenSelector } from '@src/components/token-selector'
import { SendReceiveHeader } from '../send-receive-header'

const DEFAULT_XRD_RRI = 'xrd_rr1qy5wfsfh'

export const DepositToken: React.FC = () => {
	const [isDepositTokenRoute, params] = useRoute('/account/deposit/:rri')
	const [rri, setRRI] = useState(getParamString(params, 'rri') || DEFAULT_XRD_RRI)

	const isDarkMode = useColorMode()
	const { account, selectAccount } = useStore(state => ({
		account: state.account,
		selectAccount: state.selectAccountAction,
	}))

	const { data: token } = useTokenInfo(rri)
	const { data: balances } = useTokenBalances()

	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === rri)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const address = account?.address?.toString()
	const shortAddress = getShortAddress(address)

	const handleCopyAddressToClipboard = () => {
		copyTextToClipboard(address)
	}

	const handleSelectedTokenChange = (tokenRRI: string) => {
		const changeToken = liquidBalances?.find(balance => balance.rri === tokenRRI)
		setRRI(changeToken.rri)
	}

	const handleAccountChange = (accountIndex: number) => {
		selectAccount(accountIndex)
	}

	if (!account) {
		return <div>loading</div>
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
					{/*TODO: make this a shared component*/}
					<Flex
						align="center"
						justify="center"
						css={{ border: '1px solid', borderColor: '$borderPanel2', width: '200px', height: '200px', br: '$2' }}
					>
						<QRCodeSVG
							value={address}
							size={180}
							fgColor={isDarkMode ? '#a6a6a6' : '#161718'}
							bgColor={isDarkMode ? '#161718' : '#ffffff'}
						/>
					</Flex>
				</Flex>
			</Box>
			<Box css={{ px: '$2', pb: '$2' }}>
				<ButtonTipFeedback feedback="Address copied" sideOffset={10} showToolTipArrow>
					<Button size="6" color="primary" aria-label="copy address" onClick={handleCopyAddressToClipboard} fullWidth>
						Copy address
					</Button>
				</ButtonTipFeedback>
			</Box>
		</Flex>
	)
}
