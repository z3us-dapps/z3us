/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import * as icons from '.'
import { Box } from '../box'
// import { Flex } from '../atoms/flex'
// import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '../tool-tip'
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
		<Box display="flex">
			{Object.entries(icons).map(([icon, Component]) => (
				<Box key={icon}>
					<Component />
				</Box>
			))}
		</Box>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	placeholder: 'Test',
}
