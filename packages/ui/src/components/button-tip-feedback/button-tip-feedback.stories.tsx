/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '../atoms/box'
import { Grid } from '../atoms/grid'
import { Flex } from '../atoms/flex'
import Button from '../button'

import ButtonTipFeedback from './index'

export default {
	title: 'z3us components/ButtonTipFeedback',
	component: ButtonTipFeedback,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ButtonTipFeedback>

const Template: ComponentStory<typeof ButtonTipFeedback> = args => {
	const { children } = args
	const as = 'div'
	//return <Pill as={as}>{children}</Pill>
	return (
		<ButtonTipFeedback feedback="Phrase copied">
			<Button onClick={() => {}} size="2" color="primary" css={{ position: 'absolute', bottom: '$2', right: '$2' }}>
				Copy
			</Button>
		</ButtonTipFeedback>
	)
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" css={{ border: '0px solid red' }}>
			<Grid flow="column" gap="5" css={{ border: '0px solid red' }}>
				<Box>
					<ButtonTipFeedback feedback="Copied">
						<Button
							onClick={() => {}}
							size="2"
							color="primary"
						>
							Copy
						</Button>
					</ButtonTipFeedback>
				</Box>
			</Grid>
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})

Primary.args = {
	color: 'default',
	children: 'pill',
}
