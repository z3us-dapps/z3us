import React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { useLocation } from 'wouter'
import { UpRightIcon, DownLeftIcon, PulseIcon } from 'ui/src/components/icons'
import { Grid, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

export const AccountSwitcherButtons: React.FC = () => {
	const [, setLocation] = useLocation()

	const handleSendClick = () => {
		setLocation('/account/send')
	}

	const handleDepositClick = () => {
		setLocation('/account/deposit')
	}

	const handleActivityClick = () => {
		setLocation('/account/activity')
	}

	return (
		<Flex justify="center">
			<Grid gap="5" columns="3" css={{ pt: '24px' }}>
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
						<Button size="5" color="inverse" iconOnly circle onClick={handleActivityClick}>
							<PulseIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
						<TooltipArrow css={{ fill: '$bgPanel' }} />
						Activity
					</TooltipContent>
				</Tooltip>
			</Grid>
		</Flex>
	)
}
