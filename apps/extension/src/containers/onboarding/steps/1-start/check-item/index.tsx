import React from 'react'
import { Box, MotionBox, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { ToolTip } from 'ui/src/components/tool-tip'
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

export const CheckItem: React.FC<IProps> = ({ name, comingSoon }) => (
	<MotionBox
		variants={liVariants}
		css={{ display: 'flex', alignItems: 'center', position: 'relative', minHeight: '24px' }}
	>
		<Box css={{ mr: '$2', mt: '1px' }}>
			<CheckboxIcon />
		</Box>
		<Text size="5">{name}</Text>
		{comingSoon ? (
			<ToolTip message="Coming soon!" sideOffset={0} side="top">
				<Box>
					<Button size="1" color="ghost" iconOnly clickable={false}>
						<InfoCircledIcon />
					</Button>
				</Box>
			</ToolTip>
		) : null}
	</MotionBox>
)
