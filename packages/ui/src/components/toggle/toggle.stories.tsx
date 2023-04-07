/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import { QrCodeIcon, SwapIcon } from '../icons'
import { Toggle } from './index'

export default {
	title: 'z3us components/Toggle',
	component: Toggle,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Toggle>

const Template: ComponentStory<typeof Toggle> = args => <Toggle />

// const SIZES: string[] = ['1']
// const COLORS: string[] = ['primary']

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" css={{ border: '0px solid red' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<Toggle />
				</Box>
				<Box>
					<Toggle />
				</Box>
				<Box>
					<Toggle pressed />
				</Box>
			</Grid>
		</Flex>

		<Flex gap="4" css={{ mt: '$6' }}>
			<Box css={{ flex: '1' }}>
				<Toggle size="2" />
			</Box>
			<Box css={{ flex: '1' }}>
				<Toggle size="2" />
			</Box>
			<Box css={{ flex: '1' }}>
				<Toggle size="2" />
			</Box>
		</Flex>

		<Flex gap="4" css={{ mt: '$6' }}>
			<Box css={{ flex: '1' }}>
				<Toggle placeholder="Error placeholder" error />
			</Box>
			<Box css={{ flex: '1' }}>
				<Toggle value="Error value" error />
			</Box>
			<Box css={{ flex: '1' }}>
				<Toggle value="Error value" error />
			</Box>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	placeholder: 'Test',
}
