/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import * as icons from '.'
import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '../tool-tip'
import Icon from './plus-icon'

export default {
	title: 'z3us components/Icons',
	component: Icon,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex gap="6" justify="start" css={{ flexWrap: 'wrap' }}>
			{Object.entries(icons).map(([icon, Component]) => (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Flex
								key={icon}
								align="center"
								justify="center"
								css={{ bg: '$bgPanel2', width: '50px', height: '50px', br: '$2' }}
							>
								<Component />
							</Flex>
						</TooltipTrigger>
						<TooltipContent sideOffset={5}>
							<TooltipArrow />
							{icon}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			))}
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	placeholder: 'Test',
}
