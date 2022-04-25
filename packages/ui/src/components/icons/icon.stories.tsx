/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '../atoms/box'
import { Grid } from '../atoms/grid'
import { Flex } from '../atoms/flex'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from '../tool-tip'
import * as icons from '.'

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
		<Flex justify="start">
			<Grid flow="column" gap={5}>
				{Object.entries(icons).map(([icon, Component]) => (
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
				))}
			</Grid>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	placeholder: 'Test',
}
