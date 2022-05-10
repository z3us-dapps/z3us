import React from 'react'
import { ExternalLinkIcon, HomeIcon } from '@radix-ui/react-icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import BigNumber from 'bignumber.js'
import { apy } from '@src/utils/radix'
import { useLookupValidator } from '@src/services/react-query/queries/radix'
import { formatBigNumber } from '@src/utils/formatters'
import { EXPLORER_URL } from '@src/config'
import { StakeModal } from '../stake-modal'

interface IProps {
	border?: boolean
	valdiatorAddress: string
	total?: BigNumber
	pendingStakes?: BigNumber
	stakes?: BigNumber
	pendingUnstakes?: BigNumber
}

export const StakeItem: React.FC<IProps> = ({
	border = true,
	valdiatorAddress,
	pendingStakes,
	stakes,
	pendingUnstakes,
	total,
}) => {
	const { isLoading, data: validator } = useLookupValidator(valdiatorAddress)

	if (isLoading || !validator) {
		return null
	}

	return (
		<Box css={{ px: '$4', pb: '$4', pt: '$3', borderTop: `1px solid ${border ? '$borderPanel' : 'transparent'}` }}>
			<Flex css={{ position: 'relative' }}>
				<Box css={{ flex: '1', pt: '6px' }}>
					<Text bold truncate css={{ pb: '$3', maxWidth: '250px' }}>
						{validator.name}
					</Text>
				</Box>

				<ToolTip message="Go to website" side="top" bgColor="$bgPanel2">
					<StyledLink underlineOnHover href={validator.infoURL.toString()} target="_blank">
						<Button iconOnly color="ghost" size="1">
							<HomeIcon />
						</Button>
					</StyledLink>
				</ToolTip>
				<ToolTip arrowOffset={7} message="Go to explorer" side="top" bgColor="$bgPanel2">
					<StyledLink
						underlineOnHover
						href={`${EXPLORER_URL}/validators/${validator.address.toString()}`}
						target="_blank"
					>
						<Button iconOnly color="ghost" size="1">
							<ExternalLinkIcon />
						</Button>
					</StyledLink>
				</ToolTip>
			</Flex>
			<Flex css={{ pb: '$2' }}>
				<Text css={{ flex: '1' }}>️Fee / Uptime</Text>
				<Text>
					{validator.validatorFee}% / {validator.uptimePercentage}%
				</Text>
			</Flex>
			{(pendingStakes || stakes) && (
				<Flex css={{ pb: '$2' }}>
					<Flex align="baseline" css={{ flex: '1' }}>
						<Text>️Pending / Staked</Text>
					</Flex>
					<Flex>
						<Text>
							{`${pendingStakes ? formatBigNumber(pendingStakes) : 0} / ${stakes ? formatBigNumber(stakes) : 0}`}
						</Text>
					</Flex>
				</Flex>
			)}
			{pendingUnstakes && (
				<Flex css={{ pb: '$2' }}>
					<Flex align="baseline" css={{ flex: '1' }}>
						<Text>️Pending Unstakes</Text>
					</Flex>
					<Flex>
						<Text>{`${pendingUnstakes ? formatBigNumber(pendingUnstakes) : 0}`}</Text>
					</Flex>
				</Flex>
			)}
			<Flex css={{ pb: '$2' }}>
				<Flex align="baseline" css={{ flex: '1' }}>
					<Text>APY</Text>
				</Flex>
				<Flex>
					<Text>
						{apy(new BigNumber(validator.totalDelegatedStake).shiftedBy(-18), total, validator.validatorFee).toFormat(
							2,
						)}
						%
					</Text>
				</Flex>
			</Flex>
			<Flex justify="end">
				<StakeModal
					validatorAddress={valdiatorAddress}
					trigger={
						<Button color="primary" size="1">
							Stake
						</Button>
					}
				/>
				<StakeModal
					reduceStake
					validatorAddress={valdiatorAddress}
					trigger={
						<Button color="tertiary" size="1" css={{ ml: '$2' }}>
							Reduce stake
						</Button>
					}
				/>
			</Flex>
		</Box>
	)
}

StakeItem.defaultProps = {
	border: false,
	total: null,
	pendingStakes: null,
	stakes: null,
	pendingUnstakes: null,
}
