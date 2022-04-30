import React from 'react'
import { Validator } from '@src/services/types'
import { DownloadIcon, UploadIcon, InfoCircledIcon, Cross2Icon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from 'ui/src/components/popover'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipArrow } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { apy } from '@src/utils/radix'
import { StakeModal } from '../stake-modal'
import { EXPLORER_URL } from '../../config'

const LEFT_COL_WIDTH = '150px'

interface IProps {
	i: number
	totalStakes: BigNumber
	validator: Validator
	style: React.CSSProperties
}

export const ValidatorItem = ({ i, validator, totalStakes, style }: IProps): JSX.Element => {
	const {
		address,
		name,
		totalDelegatedStake,
		ownerDelegation,
		validatorFee,
		isExternalStakeAccepted,
		uptimePercentage,
	} = validator

	const total = new BigNumber(totalDelegatedStake).shiftedBy(-18)

	const handleGotoTokenExplorer = () => {
		window.open(`${EXPLORER_URL}/validators/${address.toString()}`)
	}

	let backgroundColor
	if (!isExternalStakeAccepted) {
		backgroundColor = 'gray'
	} else if (validatorFee >= 3) {
		backgroundColor = 'red'
	} else if (validatorFee >= 1.5) {
		backgroundColor = 'orange'
	}

	return (
		<div style={style}>
			<Flex
				align="center"
				css={{
					borderTop: `1px solid ${i === 0 ? 'transparent' : '$borderPanel'}`,
					px: '$3',
					py: '$2',
					backgroundColor,
				}}
			>
				<Box>
					<Text
						onClick={handleGotoTokenExplorer}
						truncate
						aria-label="Validator popover"
						css={{ maxWidth: '175px', '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
					>
						{name} <ExternalLinkIcon />
					</Text>
				</Box>
				<Flex justify="end" css={{ pl: '$2', flex: '1' }}>
					<Flex align="center">
						{isExternalStakeAccepted && (
							<StakeModal
								validatorAddress={address.toString()}
								tooltipMessage="Stake XRD"
								trigger={
									<Button color="ghost" iconOnly aria-label="Stake XRD with validator" size="1">
										<UploadIcon />
									</Button>
								}
							/>
						)}
						<StakeModal
							validatorAddress={address.toString()}
							reduceStake
							tooltipMessage="Unstake XRD"
							trigger={
								<Button color="ghost" iconOnly aria-label="Unstake XRD" size="1">
									<DownloadIcon />
								</Button>
							}
						/>
						<Tooltip>
							<TooltipTrigger asChild>
								<Popover>
									<PopoverTrigger asChild>
										<Button color="ghost" iconOnly aria-label="Unstake XRD" size="1">
											<InfoCircledIcon />
										</Button>
									</PopoverTrigger>
									<PopoverContent css={{ width: '275px' }}>
										<Box css={{ p: '$4' }}>
											<Flex css={{ mb: '$1' }}>
												<Text medium size="3" truncate css={{ width: LEFT_COL_WIDTH }}>
													Validator information
												</Text>
											</Flex>
											<Flex css={{ mt: '$2' }}>
												<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
													Name
												</Text>
												<Flex justify="end" css={{ flex: '1' }}>
													<Text size="2" color="muted">
														{name}
													</Text>
												</Flex>
											</Flex>
											<Flex css={{ mt: '$2' }}>
												<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
													Address
												</Text>
												<Flex justify="end" css={{ flex: '1' }}>
													<Text size="2" color="muted">
														{getShortAddress(address.toString())}
													</Text>
												</Flex>
											</Flex>
											<Flex css={{ mt: '$2' }}>
												<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
													Total / owner
												</Text>
												<Flex justify="end" css={{ flex: '1' }}>
													<Text size="2" color="muted" css={{ textAlign: 'right' }}>
														{formatBigNumber(total)} / {formatBigNumber(new BigNumber(ownerDelegation).shiftedBy(-18))}
													</Text>
												</Flex>
											</Flex>
											<Flex css={{ mt: '$2' }}>
												<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
													Share
												</Text>
												<Flex justify="end" css={{ flex: '1' }}>
													<Text size="2" color={isExternalStakeAccepted ? backgroundColor || 'muted' : 'muted'}>
														{validatorFee}%
													</Text>
												</Flex>
											</Flex>
											<Flex css={{ mt: '$2' }}>
												<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
													Uptime
												</Text>
												<Flex justify="end" css={{ flex: '1' }}>
													<Text size="2" color="muted">
														{uptimePercentage}%
													</Text>
												</Flex>
											</Flex>
											<Flex css={{ mt: '$2' }}>
												<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
													APY
												</Text>
												<Flex justify="end" css={{ flex: '1' }}>
													<Text size="2" color="muted">
														{apy(total, totalStakes, validatorFee).toFormat(2)}%
													</Text>
												</Flex>
											</Flex>
											<Flex css={{ mt: '$2' }}>
												<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
													ADS
												</Text>
												<Flex justify="end" css={{ flex: '1' }}>
													<Text size="2" color="muted">
														{isExternalStakeAccepted ? 'YES' : 'NO'}
													</Text>
												</Flex>
											</Flex>
										</Box>
										<PopoverClose aria-label="Close popover">
											<Cross2Icon />
										</PopoverClose>
									</PopoverContent>
								</Popover>
							</TooltipTrigger>
							<TooltipContent sideOffset={5} css={{ backgroundColor: '$bgPanel2' }}>
								<TooltipArrow css={{ fill: '$bgPanel2' }} />
								Activity
							</TooltipContent>
						</Tooltip>
					</Flex>
				</Flex>
			</Flex>
		</div>
	)
}
