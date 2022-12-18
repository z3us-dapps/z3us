/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '../atoms/box'
import { Text } from '../atoms/text'
import { Grid } from '../atoms/grid'
import { Flex } from '../atoms/flex'
//import { QrCodeIon, SwapIcon } from '../icons'
import { Checkbox, CheckboxIndicator, CheckIcon } from './index'

export default {
	title: 'z3us components/Checkbox',
	component: Checkbox,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = args => {
	const { placeholder } = args

	return <Checkbox placeholder={placeholder} />
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" css={{ border: '0px solid red' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Flex align="center">
					<Checkbox defaultChecked id="c1">
						<CheckIcon />
					</Checkbox>
					<Text size="4" as="label" css={{ paddingLeft: 15 }} htmlFor="c1">
						Accept terms and conditions.
					</Text>
				</Flex>
				<Box />
				<Box />
			</Grid>
		</Flex>
		<Flex justify="start" css={{ border: '0px solid red', mt: '$5' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Flex align="center">
					<Checkbox defaultChecked id="c2" size="2">
						<CheckIcon />
					</Checkbox>
					<Text size="4" as="label" css={{ paddingLeft: 15 }} htmlFor="c2">
						Accept terms and conditions.
					</Text>
				</Flex>
				<Box />
				<Box />
			</Grid>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	placeholder: 'Test',
}
