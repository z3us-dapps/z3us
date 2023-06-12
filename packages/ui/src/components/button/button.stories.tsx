/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key  */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import type { NormalColors, NormalSizes } from '../../utils/prop-types'
import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import { QrCodeIcon, SwapIcon } from '../icons'
import Button from './index'

export default {
	title: 'z3us components/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => {
	const { children, color } = args

	return <Button color={color}>{children}</Button>
}

const SIZES: NormalSizes[] = ['1', '2', '3', '4', '5', '6']
const COLORS: NormalColors[] = [
	'primary',
	'primary',
	'primary',
	'secondary',
	'tertiary',
	'inverse',
	'red',
	'input',
	'default',
]

const CombinedTemplate: React.FC = () => (
	<Box>
		<Box css={{ display: 'block' }}>
			{SIZES.map(size => (
				<Flex key={size} css={{ mb: '20px' }}>
					{COLORS.map((color, idx) => (
						<Box key={`${color}-${idx}`} css={{ px: '10px' }}>
							<Button loading={idx === 2} disabled={idx === 2 || idx === 3} size={size} color={color}>
								{idx === 0 ? <QrCodeIcon /> : null}
								Copy link
							</Button>
						</Box>
					))}
				</Flex>
			))}
		</Box>
		<Grid flow="column" css={{ maxWidth: '500px', py: '20px' }}>
			<Button size="1" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="2" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="3" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="4" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="5" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="6" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
		</Grid>
		<Grid flow="column" css={{ maxWidth: '500px', py: '20px' }}>
			<Button size="1" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="2" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="3" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="4" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="5" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
			<Button size="6" color="primary" iconOnly>
				<QrCodeIcon />
			</Button>
		</Grid>
		<Grid flow="column" css={{ maxWidth: '500px', py: '20px' }}>
			<Button size="1" color="primary" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="2" color="primary" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="3" color="primary" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="4" color="primary" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="5" color="primary" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="6" color="primary" iconOnly>
				<SwapIcon />
			</Button>
		</Grid>
		<Grid flow="column" css={{ maxWidth: '500px', py: '20px' }}>
			<Button size="1" color="ghost" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="2" color="ghost" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="3" color="ghost" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="4" color="ghost" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="5" color="ghost" iconOnly>
				<SwapIcon />
			</Button>
			<Button size="6" color="ghost" iconOnly>
				<SwapIcon />
			</Button>
		</Grid>
		<Grid flow="column" css={{ maxWidth: '500px', py: '20px' }}>
			<Button size="1" color="primary" iconOnly circle>
				<SwapIcon />
			</Button>
			<Button size="2" color="primary" iconOnly circle>
				<SwapIcon />
			</Button>
			<Button size="3" color="primary" iconOnly circle>
				<SwapIcon />
			</Button>
			<Button size="4" color="primary" iconOnly circle>
				<SwapIcon />
			</Button>
			<Button size="5" color="primary" iconOnly circle>
				<SwapIcon />
			</Button>
			<Button size="6" color="primary" iconOnly circle>
				<SwapIcon />
			</Button>
		</Grid>
		<Box css={{ maxWidth: '340px' }}>
			<Button size="6" color="primary" fullWidth>
				Copy link
			</Button>
		</Box>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	children: 'Button',
	color: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
	children: 'Button',
}

export const Large = Template.bind({})
Large.args = {
	children: 'Button',
}

export const Small = Template.bind({})
Small.args = {
	children: 'Button',
}
