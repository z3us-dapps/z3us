/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Box } from '../atoms/box'
import { Grid } from '../atoms/grid'
import { Flex } from '../atoms/flex'
import { Text } from '../atoms/text'

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectGroup,
	SelectItem,
	SelectIcon,
	SelectLabel,
	SelectSeparator,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from './index'

export default {
	title: 'z3us components/Select',
	component: Select,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = args => {
	const as = 'div'
	return <Select />
}

const CombinedTemplate: React.FC = () => (
	<Box>
		<Flex justify="start" css={{ border: '0px solid red' }}>
			<Grid flow="column" gap="4" css={{ border: '0px solid red' }}>
				<Box>
					<Select defaultValue="blueberry">
						<SelectTrigger aria-label="Food">
							<SelectValue />
							<SelectIcon>
								<ChevronDownIcon />
							</SelectIcon>
						</SelectTrigger>
						<SelectContent>
							<SelectScrollUpButton>
								<ChevronUpIcon />
							</SelectScrollUpButton>
							<SelectViewport>
								<SelectGroup>
									<SelectLabel>Fruits</SelectLabel>
									<SelectItem value="apple">
										<SelectItemText>Apple</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="banana">
										<SelectItemText>Banana</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="blueberry">
										<SelectItemText>Blueberry</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="grapes">
										<SelectItemText>Grapes</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="pineapple">
										<SelectItemText>Pineapple</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
								</SelectGroup>

								<SelectSeparator />

								<SelectGroup>
									<SelectLabel>Vegetables</SelectLabel>
									<SelectItem value="aubergine">
										<SelectItemText>Aubergine</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="broccoli">
										<SelectItemText>Broccoli</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="carrot" disabled>
										<SelectItemText>Carrot</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="courgette">
										<SelectItemText>Courgette</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="leek">
										<SelectItemText>leek</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
								</SelectGroup>

								<SelectSeparator />

								<SelectGroup>
									<SelectLabel>Meat</SelectLabel>
									<SelectItem value="beef">
										<SelectItemText>Beef</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="chicken">
										<SelectItemText>Chicken</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="lamb">
										<SelectItemText>Lamb</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
									<SelectItem value="pork">
										<SelectItemText>Pork</SelectItemText>
										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
								</SelectGroup>
							</SelectViewport>
							<SelectScrollDownButton>
								<ChevronDownIcon />
							</SelectScrollDownButton>
						</SelectContent>
					</Select>
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
