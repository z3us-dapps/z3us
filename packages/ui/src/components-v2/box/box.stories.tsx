/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import tokensFont from 'design/tokens/foundation/font-size.json'
import { Box } from './index'

export default {
	title: 'components-v2/Atoms',
	component: Box,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = args => {
	const as = 'div'
	return <Box>Test</Box>
}

const convertRemToPixels = (rem: string) => {
	const remStr = rem.replace('rem', '')
	return Number.parseFloat(remStr) * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

const CombinedTemplate: React.FC = () => (
	<div>
		<div className="flex- w-full">
			<div className="pt-4">
				<div className="flex flex-col gap-5">
					asdfasdf
					{/* {Object.entries(tokensFont.fontSize).map(([key, { value }]) => ( */}
					{/* 	<Text key={key} size={key as any}> */}
					{/* 		size:{key} {value}={convertRemToPixels(value)}px */}
					{/* 	</Text> */}
					{/* ))} */}
				</div>
			</div>
		</div>
	</div>
)

export const Playground = CombinedTemplate

const Primary = Template.bind({})

Primary.args = {
	color: 'default',
}
