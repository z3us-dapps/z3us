/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import { Text } from '../atoms/text'
import AlertCard from './index'

export default {
	title: 'z3us components/Alert Card',
	component: AlertCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AlertCard>

const Template: ComponentStory<typeof AlertCard> = args => {
	const as = 'div'
	return <AlertCard as={as} />
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" css={{ border: '0px solid red' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<AlertCard color="success">
						<Text size="4" css={{ p: '$3' }}>
							Success alert card
						</Text>
					</AlertCard>
				</Box>
				<Box>
					<AlertCard color="error">
						<Text size="4" css={{ p: '$3' }}>
							Error alert card
						</Text>
					</AlertCard>
				</Box>
				<Box>
					<AlertCard color="warning">
						<Text size="4" css={{ p: '$3' }}>
							Caution alert card
						</Text>
					</AlertCard>
				</Box>
			</Grid>
		</Flex>
		<Flex justify="start" css={{ mt: '$8' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<AlertCard color="success" icon>
						<Text size="4" css={{ p: '$3' }}>
							Success alert card
						</Text>
					</AlertCard>
				</Box>
				<Box>
					<AlertCard color="error" icon>
						<Text medium size="4" css={{ p: '$3' }}>
							Error alert card
						</Text>
					</AlertCard>
				</Box>
				<Box css={{ maxWidth: '250px' }}>
					<AlertCard color="warning" icon={<LightningBoltIcon />}>
						<Text size="4" css={{ p: '$3' }}>
							Caution alert card Caution alert card Caution alert card Caution alert card
						</Text>
					</AlertCard>
				</Box>
			</Grid>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	type: 'success',
}
