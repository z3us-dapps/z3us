/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '../box'
import Text from './text'

export default {
	title: 'components-v2/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = args => {
	const as = 'div'
	return <Text>Test</Text>
}

const convertRemToPixels = (rem: string) => {
	const remStr = rem.replace('rem', '')
	return Number.parseFloat(remStr) * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

const themes = ['light', 'dark']

const CombinedTemplate: React.FC = () => (
	<Box display="flex" gap="large">
		<Box display="flex" flexDirection="column" flexGrow={1} gap="large" style={{ gap: '1rem' }}>
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
