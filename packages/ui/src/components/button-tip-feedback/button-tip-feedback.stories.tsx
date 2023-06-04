/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
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
		<ButtonTipFeedback tooltip="copy phrase" feedback="Phrase copied">
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
				<Box css={{ p: '$4' }}>
					<ButtonTipFeedback tooltip="Copy address" feedback="Copied!" bgColor="$bgPanel">
						<Button onClick={() => {}} size="2" color="primary">
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
