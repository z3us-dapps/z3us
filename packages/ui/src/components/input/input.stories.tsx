/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import { QrCodeIcon, SwapIcon } from '../icons'
import Input from './index'

export default {
	title: 'z3us components/Input',
	component: Input,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => {
	const { placeholder } = args

	return <Input placeholder={placeholder} />
}

// const SIZES: string[] = ['1']
// const COLORS: string[] = ['primary']

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" css={{ border: '0px solid red' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<Input placeholder="Placeholder" />
				</Box>
				<Box>
					<Input placeholder="Placeholder" />
				</Box>
				<Box>
					<Input value="value" />
				</Box>
			</Grid>
		</Flex>

		<Flex gap="4" css={{ mt: '$6' }}>
			<Box css={{ flex: '1' }}>
				<Input size="2" placeholder="Placeholder size 2" />
			</Box>
			<Box css={{ flex: '1' }}>
				<Input size="2" placeholder="Placeholder size 2" />
			</Box>
			<Box css={{ flex: '1' }}>
				<Input size="2" value="value" />
			</Box>
		</Flex>

		<Flex gap="4" css={{ mt: '$6' }}>
			<Box css={{ flex: '1' }}>
				<Input placeholder="Error placeholder" error />
			</Box>
			<Box css={{ flex: '1' }}>
				<Input value="Error value" error />
			</Box>
			<Box css={{ flex: '1' }}>
				<Input value="Error value" error />
			</Box>
		</Flex>

		<Flex gap="4" css={{ mt: '$6' }}>
			<Box css={{ flex: '1' }}>
				<Input as="textarea" size="1" placeholder="Textarea placeholder" css={{ height: '100px' }} />
			</Box>
			<Box css={{ flex: '1' }}>
				<Input as="textarea" size="2" placeholder="Textarea placeholder" css={{ height: '100px' }} />
			</Box>
		</Flex>

		<Flex gap="4" css={{ mt: '$6' }}>
			<Box css={{ flex: '1' }}>
				<Input disabled as="textarea" size="1" placeholder="Textarea placeholder disabled" css={{ height: '100px' }} />
			</Box>
			<Box css={{ flex: '1' }}>
				<Input disabled as="textarea" size="2" placeholder="Textarea placeholder disabled" css={{ height: '100px' }} />
			</Box>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	placeholder: 'Test',
}
