/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '../atoms/box'
import { Grid } from '../atoms/grid'
import { Flex } from '../atoms/flex'
import { Text } from '../atoms/text'

import LoaderBars from './index'

export default {
	title: 'z3us components/Loader Bars',
	component: LoaderBars,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof LoaderBars>

const Template: ComponentStory<typeof LoaderBars> = args => {
	const as = 'div'
	return <LoaderBars as={as} />
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start">
			<Grid flow="column" gap="4">
				<Box>
					<LoaderBars size="1" />
				</Box>
			</Grid>
		</Flex>
		<Flex justify="start" css={{mt: '$12'}}>
			<Grid flow="column" gap="4">
				<Box>
					<LoaderBars size="3" />
				</Box>
			</Grid>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	color: 'default',
}
