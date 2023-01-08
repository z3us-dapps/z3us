/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
// import { CopyIcon } from '@radix-ui/react-icons'
// import { copyTextToClipboard } from '../../utils/copy-to-clipboard'
import { Button } from './index'

export default {
	title: 'components-v2/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => {
	const as = 'div'
	return <Button>Test</Button>
}

const themes = ['light', 'dark']
const buttonIntent = ['primary', 'secondary']
const buttonSize = ['small', 'medium', 'large']

const CombinedTemplate: React.FC = () => (
	<div>
		<div className="flex w-full">
			{themes.map(theme => (
				<div
					key={theme}
					className={`flex-1 light flex flex-col gap-2 p-2 ${theme}`}
					style={{ background: theme === 'dark' ? '#000' : '#fff' }}
				>
					{buttonIntent.map(intent => (
						<div key={intent} className="flex gap-2">
							{buttonSize.map(size => (
								<div key={size}>
									<Button intent={intent as any} size={size as any}>
										{intent} - {size}
									</Button>
								</div>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	</div>
)

export const Playground = CombinedTemplate

const Primary = Template.bind({})

Primary.args = {
	color: 'default',
}
