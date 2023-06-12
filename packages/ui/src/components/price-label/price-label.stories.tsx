/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import { Text } from '../atoms/text'
import PriceLabel from './index'

export default {
	title: 'z3us components/Price Label',
	component: PriceLabel,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof PriceLabel>

const Template: ComponentStory<typeof PriceLabel> = args => {
	const as = 'div'
	return <PriceLabel as={as} />
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start">
			<Grid flow="column" gap="4">
				<Box>
					<PriceLabel color="green">
						<Text size="3">$5.23</Text>
					</PriceLabel>
				</Box>
				<Box>
					<PriceLabel color="red">
						<Text size="3">$1.21</Text>
					</PriceLabel>
				</Box>
				<Box>
					<PriceLabel color="warning">
						<Text size="3">$9.12</Text>
					</PriceLabel>
				</Box>
			</Grid>
		</Flex>
		<Flex justify="start" css={{ mt: '$4' }}>
			<Text medium css={{ pr: '$2' }}>
				Price contrast
			</Text>
			<Grid flow="column" gap="4">
				<Box>
					<PriceLabel color="greenContrast">
						<Text size="3">$5.23</Text>
					</PriceLabel>
				</Box>
				<Box>
					<PriceLabel color="redContrast">
						<Text size="3">$1.21</Text>
					</PriceLabel>
				</Box>
			</Grid>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	color: 'green',
}
