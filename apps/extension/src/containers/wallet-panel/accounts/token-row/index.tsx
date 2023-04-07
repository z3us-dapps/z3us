import { InfoCircledIcon } from '@radix-ui/react-icons'
import BigNumber from 'bignumber.js'
import React from 'react'
import { useLocation } from 'wouter'

import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'

import { CircleAvatar } from '@src/components/circle-avatar'
import { useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { formatBigNumber } from '@src/utils/formatters'

import { TokenPrice } from './token-price'

interface IProps {
	i: number
	rri: string
	symbol: string
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

export const TokenRow: React.FC<IProps> = ({ i, rri, symbol, amount, staked, loading, disableClick }) => {
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
			showRipple={false}
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
						<Box css={{ pt: '16px', mr: '8px', pl: '$4' }}>
							<CircleAvatar
								borderWidth={0}
								shadow={false}
								width={36}
								height={36}
								image={token?.image}
								fallbackText={(token?.symbol || '').substring(0, 3).toLocaleUpperCase()}
								background="$bgPanel"
							/>
						</Box>
						<Flex css={{ flex: 1, pr: '$5' }}>
							<Box css={{ width: '60%', flexBasis: '60%', pt: '14px' }}>
								<Text
									truncate
									css={{
										fontSize: '16px',
										lineHeight: '22px',
										fontWeight: 'bold',
									}}
								>
									{token.name} ({token.symbol.toLocaleUpperCase()})
								</Text>
								<Flex css={{ mt: '2px' }}>
									<Text color="help" size="3">
										{staked && symbol === 'xrd'
											? formatBigNumber(tokenAmount.plus(stakedAmount))
											: formatBigNumber(tokenAmount)}
									</Text>
									{staked && !stakedAmount.isZero() && (
										<Flex css={{ maxWidth: '115px', position: 'relative' }}>
											<HoverCard>
												<HoverCardTrigger asChild>
													<Box css={{ mt: '-5px' }}>
														<Button size="1" color="ghost" iconOnly clickable={false} css={{ color: '$txtHelp' }}>
															<InfoCircledIcon />
														</Button>
													</Box>
												</HoverCardTrigger>
												<HoverCardContent side="top" sideOffset={0} css={{ maxWidth: '170px' }}>
													<Box>
														<Text as="p">
															<Text as="span" bold>
																XRD Available:
															</Text>
															<Text as="span">{formatBigNumber(tokenAmount)}</Text>
														</Text>
														<Text as="p" css={{ pt: '$2' }}>
															<Text as="span" bold>
																XRD Staked or Unstaking:
															</Text>
															<Text as="span">{formatBigNumber(stakedAmount)}</Text>
														</Text>
													</Box>
												</HoverCardContent>
											</HoverCard>
										</Flex>
									)}
								</Flex>
							</Box>
							<TokenPrice symbol={token.symbol} amount={staked ? tokenAmount.plus(stakedAmount) : tokenAmount} />
						</Flex>
					</>
				) : (
					<Flex align="center" justify="center" css={{ width: '100%' }} />
				)}
			</Flex>
		</Button>
	)
}

TokenRow.defaultProps = defaultProps
