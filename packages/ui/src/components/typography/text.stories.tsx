import type { Meta, StoryObj } from '@storybook/react'

import Text from './text'

const meta = {
	title: 'Text',
	component: Text as any,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: 'Heading',
		align: 'left',
	},
}
