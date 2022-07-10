import React from 'react'
import { Validator } from '@src/types'
import { DownloadIcon, UploadIcon, InfoCircledIcon, Cross2Icon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from 'ui/src/components/popover'
import { ToolTip } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { apy } from '@src/utils/radix'
import { EXPLORER_URL } from '@src/config'
import { StakeModal } from '../stake-modal'

const LEFT_COL_WIDTH = '150px'

interface IProps {
	i: number
	totalStakes: BigNumber
	validator: Validator
}

export const ValidatorItem: React.FC<IProps> = ({ i, validator, totalStakes }) => {
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

	//@TODO: revisit the color with ux over haul
	let backgroundColor: string
	if (!isExternalStakeAccepted) {
		backgroundColor = 'transparent'
	}
	return (
		<div>
			<Flex
				align="center"
				css={{
					borderTop: `1px solid ${i === 0 ? 'transparent' : '$borderPanel'}`,
					px: '$3',
					py: '$1',
					backgroundColor,
				}}
			>
				<Flex align="center">
					<Text truncate css={{ maxWidth: '175px' }}>
						{name}
					</Text>
					<ToolTip message="Go to explorer" side="top">
						<Button
							as="a"
							size="1"
							iconOnly
							color="ghost"
							target="_blank"
							href={`${EXPLORER_URL}/validators/${address.toString()}`}
							css={{ color: '$txtHelp' }}
						>
							<ExternalLinkIcon />
						</Button>
					</ToolTip>
				</Flex>
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
						<Popover>
							<PopoverTrigger asChild>
								<Box>
									<ToolTip message="Validator info" side="top">
										<Button color="ghost" iconOnly aria-label="Validator info" size="1">
											<InfoCircledIcon />
										</Button>
									</ToolTip>
								</Box>
							</PopoverTrigger>
							<PopoverContent css={{ width: '275px' }}>
								<Box css={{ p: '$4' }}>
									<Flex css={{ mb: '$3' }}>
										<Text bold size="3" truncate css={{ width: LEFT_COL_WIDTH }}>
											Validator information
										</Text>
									</Flex>
									<Flex css={{ mt: '$2' }}>
										<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
											Name
										</Text>
										<Flex justify="end" css={{ flex: '1' }}>
											<Text size="2" color="help">
												{name}
											</Text>
										</Flex>
									</Flex>
									<Flex css={{ mt: '$2' }}>
										<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
											Address
										</Text>
										<Flex justify="end" css={{ flex: '1' }}>
											<Text size="2" color="help">
												{getShortAddress(address.toString())}
											</Text>
										</Flex>
									</Flex>
									<Flex css={{ mt: '$2' }}>
										<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
											Total / owner
										</Text>
										<Flex justify="end" css={{ flex: '1' }}>
											<Text size="2" color="help" css={{ textAlign: 'right' }}>
												{formatBigNumber(total)} / {formatBigNumber(new BigNumber(ownerDelegation).shiftedBy(-18))}
											</Text>
										</Flex>
									</Flex>
									<Flex css={{ mt: '$2' }}>
										<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
											Share
										</Text>
										<Flex justify="end" css={{ flex: '1' }}>
											<Text size="2" color="help">
												<span style={{ color: isExternalStakeAccepted ? backgroundColor : 'inherit' }}>
													{validatorFee}%
												</span>
											</Text>
										</Flex>
									</Flex>
									<Flex css={{ mt: '$2' }}>
										<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
											Uptime
										</Text>
										<Flex justify="end" css={{ flex: '1' }}>
											<Text size="2" color="help">
												{uptimePercentage}%
											</Text>
										</Flex>
									</Flex>
									<Flex css={{ mt: '$2' }}>
										<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
											APY
										</Text>
										<Flex justify="end" css={{ flex: '1' }}>
											<Text size="2" color="help">
												{apy(total, totalStakes, validatorFee).toFormat(2)}%
											</Text>
										</Flex>
									</Flex>
									<Flex css={{ mt: '$2' }}>
										<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
											ADS
										</Text>
										<Flex justify="end" css={{ flex: '1' }}>
											<Text size="2" color="help">
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

						{/*<Tooltip>
							<TooltipTrigger asChild>
							</TooltipTrigger>
							<TooltipContent sideOffset={5} css={{ backgroundColor: '$bgPanel2' }}>
								<TooltipArrow css={{ fill: '$bgPanel2' }} />
								Activity
							</TooltipContent>
						</Tooltip>*/}
					</Flex>
				</Flex>
			</Flex>
		</div>
	)
}
