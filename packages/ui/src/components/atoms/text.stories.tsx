/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from './box'
import { Flex } from './flex'
import { Grid } from './grid'
import { Text } from './text'

export default {
	title: 'z3us components/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = args => <Text />

const PlaygroundTemplate: React.FC = () => (
	<Box>
		<Flex gap="3" direction="column" justify="start" css={{ pb: '40px' }}>
			<Box>
				<Text size="1">1 - 12px</Text>
			</Box>
			<Text size="2">2 - 13px</Text>
			<Text size="3">3 - 14px </Text>
			<Text size="4">4 - 15px</Text>
			<Text size="5">5 - 17px</Text>
			<Text size="6">6 - 19px</Text>
			<Text size="7">7 - 21px</Text>
			<Text size="8">8 - 26px</Text>
			<Text size="9">9 - 28px</Text>
			<Text size="10">10 - 36px</Text>
			<Text size="11">11 - 44px</Text>
			<Text size="12">12 - 52px</Text>
			<Text size="13">13 - 60px</Text>
			<Text size="14">14 - 68px</Text>
		</Flex>
		<Flex justify="start" css={{ pb: '40px' }}>
			<Grid flow="column" gap="5">
				<Text size="9" color="muted" medium>
					9 Medium color: muted
				</Text>
				<Text size="9" color="help" medium>
					9 Medium color: help
				</Text>
			</Grid>
		</Flex>
		<Flex justify="start" css={{ pb: '40px' }}>
			<Grid flow="column" gap="5">
				<Box>
					<Text size="10" color="red" bold>
						10 bold
					</Text>
				</Box>
			</Grid>
		</Flex>
	</Box>
)

export const Playground = PlaygroundTemplate

export const Primary = Template.bind({})
Primary.args = {
	placeholder: 'Test',
}
