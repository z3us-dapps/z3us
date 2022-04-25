import React from 'react'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import BigNumber from 'bignumber.js'
import { apy } from '@src/utils/radix'
import { useLookupValidator } from '@src/services/react-query/queries/radix'
import { formatBigNumber } from '@src/utils/formatters'
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
}: IProps) => {
	const { isLoading, data: validator } = useLookupValidator(valdiatorAddress)

	if (isLoading || !validator) {
		return null
	}

	return (
		<Box css={{ px: '$4', pb: '$4', pt: '$3', borderTop: `1px solid ${border ? '$borderPanel' : 'transparent'}` }}>
			<Flex css={{ position: 'relative' }}>
				<Box css={{ flex: '1', pt: '6px' }}>
					<StyledLink underlineOnHover href={validator.infoURL.toString()} target="_blank">
						<Text bold truncate css={{ pb: '$3', maxWidth: '250px' }}>
							{validator.name}
						</Text>
					</StyledLink>
				</Box>

				<StyledLink underlineOnHover href={validator.infoURL.toString()} target="_blank">
					<Button iconOnly color="ghost" size="1">
						<ExternalLinkIcon />
					</Button>
				</StyledLink>
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
						<Text>️Pending unstakes</Text>
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
						{apy(
							new BigNumber(validator.totalDelegatedStake).shiftedBy(-18),
							total,
							validator.validatorFee,
						).toFormat(2)}
						%
					</Text>
				</Flex>
			</Flex>
			<Flex justify="end">
				<StakeModal
					trigger={
						<Button color="primary" size="1">
							Stake
						</Button>
					}
				/>
				<StakeModal
					reduceStake
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
