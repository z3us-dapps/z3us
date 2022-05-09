import React from 'react'
import BigNumber from 'bignumber.js'
import { formatBigNumber } from '@src/utils/formatters'
import { useTokenInfo } from '@src/services/react-query/queries/radix'
import { useLocation } from 'wouter'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { TokenLoadingRow } from '@src/components/token-loading-row'
import { TokenPrice } from './token-price'

interface IProps {
	i: number
	rri: string
	amount: string | BigNumber
	staked?: string | BigNumber
	loading?: boolean
	disableClick?: boolean
}

const defaultProps = {
	staked: undefined,
	loading: false,
	disableClick: false,
}

export const TokenRow: React.FC<IProps> = ({ i, rri, amount, staked, loading, disableClick }) => {
	const { isLoading: isLoadingTokenInfo, data: token } = useTokenInfo(rri)
	const [, setLocation] = useLocation()
	const isLoadingComplete = !loading && !isLoadingTokenInfo

	const tokenAmount = amount instanceof BigNumber ? amount : new BigNumber(amount).shiftedBy(-18)
	const stakedAmount = staked instanceof BigNumber ? staked : new BigNumber(staked).shiftedBy(-18)

	const handleTokenClick = () => {
		const tokenUrl = `/account/token/${rri}`
		setLocation(tokenUrl)
	}

	return (
		<Button
			onClick={disableClick ? null : handleTokenClick}
			clickable={!disableClick}
			css={{
				margin: '0',
				padding: '0',
				width: '100%',
				display: 'block',
				textAlign: 'left',
				cursor: isLoadingComplete && !disableClick ? 'pointer' : 'default',
			}}
		>
			<Flex
				css={{
					height: '68px',
					borderTop: `1px solid ${i === 0 ? 'transparent' : '$borderPanel'}`,
					transition: 'background-color 150ms ease-out',
					background: '$bgPanel',
					'&:hover': {
						background: isLoadingComplete && !disableClick ? '$bgPanelHover' : '$bgPanel',
					},
				}}
			>
				{isLoadingComplete && token ? (
					<>
						<Box css={{ pt: '16px', mr: '13px', pl: '$4' }}>
							<Box css={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
								<Box as="img" src={token?.image || token?.iconURL} css={{ width: '36px', height: '36px' }} />
							</Box>
						</Box>
						<Flex css={{ flex: 1, pr: '$5' }}>
							<Box css={{ width: '60%', flexBasis: '60%', pt: '16px' }}>
								<Text css={{ fontSize: '16px', lineHeight: '22px', fontWeight: 'bold' }}>
									{token.name} ({token.symbol.toLocaleUpperCase()})
								</Text>
								<Text color="help" size="3">
									{formatBigNumber(tokenAmount)}
								</Text>
								{staked && (
									<Text color="help" size="3">
										{`(${formatBigNumber(stakedAmount)})`}
									</Text>
								)}
							</Box>
							<TokenPrice symbol={token.symbol} amount={staked ? tokenAmount.plus(stakedAmount) : tokenAmount} />
						</Flex>
					</>
				) : (
					<Box css={{ width: '100%', p: '$3' }}>
						<TokenLoadingRow />
					</Box>
				)}
			</Flex>
		</Button>
	)
}

TokenRow.defaultProps = defaultProps
