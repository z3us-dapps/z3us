/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import Button from '../button'
import ButtonGroup from './index'

export default {
	title: 'z3us components/Button group',
	component: ButtonGroup,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ButtonGroup>

const Template: ComponentStory<typeof ButtonGroup> = args => {
	const as = 'div'
	return <ButtonGroup as={as} />
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" css={{ border: '0px solid red' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<ButtonGroup>
						<Button size="3" color="tertiary" active>
							Button
						</Button>
						<Button size="3" color="tertiary">
							Button 2
						</Button>
						<Button size="3" color="tertiary">
							Button 3
						</Button>
					</ButtonGroup>
				</Box>
			</Grid>
		</Flex>
		<Flex justify="start" css={{ mt: '$8' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<ButtonGroup>
						<Button size="3" color="primary">
							Button 1
						</Button>
						<Button size="3" color="primary" active>
							Button 2
						</Button>
						<Button size="3" color="primary">
							Button 3
						</Button>
						<Button size="3" color="primary">
							Button 4
						</Button>
					</ButtonGroup>
				</Box>
			</Grid>
		</Flex>
		<Flex justify="start" css={{ mt: '$8' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<ButtonGroup>
						<Button size="3" color="primary">
							Button 1
						</Button>
						<Button size="3" color="primary" active>
							Button 2
						</Button>
						<Button size="3" color="primary">
							Button 3
						</Button>
						<Button size="3" color="primary">
							Button 4
						</Button>
					</ButtonGroup>
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
