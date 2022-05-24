import React from 'react'
import BigNumber from 'bignumber.js'
import { useTokenBalances, useTokenInfo } from '@src/services/react-query/queries/radix'
import { getSplitParams } from '@src/utils/url-utils'
import { useRoute, useLocation } from 'wouter'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Grid, Box, Flex, Text } from 'ui/src/components/atoms'
import { EXPLORER_URL } from '@src/config'
import { UpRightIcon, DownLeftIcon, ExternalLinkIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import { TokenPrice } from './token-price'

export const TokenInfo = (): JSX.Element => {
	const [, setLocation] = useLocation()
	const [, params] = useRoute('/account/token/:rri')
	const rri = getSplitParams(params)
	const { isLoading, data: token } = useTokenInfo(rri)
	const { data } = useTokenBalances()
	const liquidBalances = data?.account_balances?.liquid_balances || []
	const staked = data?.account_balances?.staked_and_unstaking_balance.value

	const selectedToken = liquidBalances?.find(balance => balance.rri === rri)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const stakedAmount = selectedToken?.symbol === 'xrd' && staked ? new BigNumber(staked).shiftedBy(-18) : null

	const handleSendClick = () => {
		setLocation(`/account/send/${rri}`)
	}

	const handleDepositClick = () => {
		setLocation(`/account/deposit/${rri}`)
	}

	const handleGotoTokenExplorer = () => {
		window.open(`${EXPLORER_URL}/tokens/${rri}`)
	}

	if (isLoading) {
		return null
	}
	if (!token) {
		return null
	}

	return (
		<Flex
			direction="column"
			css={{
				position: 'absolute',
				top: '0px',
				left: '0',
				right: '0',
				height: '280px',
				overflow: 'hidden',
			}}
		>
			<Flex direction="column" align="center">
				<Box css={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
					<Box
						as="img"
						src={token?.image || token?.iconURL}
						css={{ width: '50px', height: '50px', borderRadius: '50%' }}
					/>
				</Box>
				<Text bold size="6" css={{ mt: '15px', pb: '5px' }}>
					{token.name} ({token.symbol.toLocaleUpperCase()})
				</Text>
				<TokenPrice
					symbol={token.symbol}
					ammount={token.symbol === 'xrd' ? selectedTokenAmmount.plus(stakedAmount) : selectedTokenAmmount}
				/>
				<Grid gap="5" columns="3" css={{ pt: '20px' }}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="5" color="inverse" iconOnly circle onClick={handleSendClick}>
								<UpRightIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
							<TooltipArrow css={{ fill: '$bgPanel' }} />
							Send
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="5" color="inverse" iconOnly circle onClick={handleDepositClick}>
								<DownLeftIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
							<TooltipArrow css={{ fill: '$bgPanel' }} />
							Deposit
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="5" color="inverse" iconOnly circle onClick={handleGotoTokenExplorer}>
								<ExternalLinkIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
							<TooltipArrow css={{ fill: '$bgPanel' }} />
							Explorer
						</TooltipContent>
					</Tooltip>
				</Grid>
			</Flex>
		</Flex>
	)
}
