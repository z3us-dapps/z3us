/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../box'
import Text from './text'

export default {
	title: 'components/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = args => {
	const as = 'div'
	return <Text>Test</Text>
}

const CombinedTemplate: React.FC = () => (
	<Box display="flex" gap="large">
		<Box display="flex" flexDirection="column" flexGrow={1} gap="large" style={{ gap: '1rem' }} background="red500">
			<Text size="xsmall">xsmall</Text>
			<Text size="small">small</Text>
			<Text size="large">medium</Text>
		</Box>
		<Box display="flex" flexDirection="column" flexGrow={1} gap="large" style={{ gap: '1rem' }}>
			<Text>First text</Text>
			<Text>First text</Text>
		</Box>
	</Box>
)

export const Playground = CombinedTemplate

const Primary = Template.bind({})

Primary.args = {
	color: 'default',
}
