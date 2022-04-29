import React from 'react'
import { Box, MotionBox, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { InfoCircledIcon, CheckboxIcon } from '@radix-ui/react-icons'

const liVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
}

interface IProps {
	name: string
	comingSoon: boolean
}

export const CheckItem: React.FC<IProps> = ({ name, comingSoon }: IProps) => (
	<MotionBox variants={liVariants} as="li" css={{ display: 'flex', alignItems: 'center' }}>
		<Box css={{ mr: '$2', mt: '1px' }}>
			<CheckboxIcon />
		</Box>
		<Text size="5">{name}</Text>
		{comingSoon ? (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size="1" color="ghost" iconOnly clickable={false}>
						<InfoCircledIcon />
					</Button>
				</TooltipTrigger>
				<TooltipContent sideOffset={3} side="bottom">
					<TooltipArrow />
					Coming soon!
				</TooltipContent>
			</Tooltip>
		) : null}
	</MotionBox>
)
