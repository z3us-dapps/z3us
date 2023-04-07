import React from 'react'
import { useLocation } from 'wouter'

import { Flex, Grid } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { DownLeftIcon, PulseIcon, UpRightIcon } from 'ui/src/components/icons'
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/src/components/tool-tip'

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
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="5"
								color="inverse"
								iconOnly
								circle
								onClick={handleSendClick}
								data-test-e2e="account-send-btn"
							>
								<UpRightIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
							<TooltipArrow css={{ fill: '$bgPanel' }} />
							Send
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
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
				</TooltipProvider>
				<TooltipProvider>
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
				</TooltipProvider>
			</Grid>
		</Flex>
	)
}
