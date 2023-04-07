/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import PriceLabel from '../price-label'
//import { Text } from '../atoms/text'
import PriceTicker from './index'

export default {
	title: 'z3us components/Price Ticker',
	component: PriceTicker,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof PriceTicker>

const Template: ComponentStory<typeof PriceTicker> = args => {
	const as = 'div'
	return <PriceTicker value="10" as={as} />
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" align="center">
			<Grid flow="column" gap="6">
				<Box>
					<PriceTicker value="98" color="green" />
				</Box>
				<Box>
					<PriceLabel>
						<PriceTicker value="99" color="green" />
					</PriceLabel>
				</Box>
				<Box>
					{/*<PriceTicker>
						<Text bold size="3">
							$9.12
						</Text>
					</PriceTicker>*/}
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
