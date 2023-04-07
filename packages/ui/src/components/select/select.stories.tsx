/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import Button from '../button'
import {
	Select,
	SelectBox,
	SelectContent,
	SelectGroup,
	SelectIcon,
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
	SelectViewport,
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
		<Flex gap="8" justify="start" css={{ border: '0px solid red' }}>
			<Box css={{ width: '200px' }}>
				<SelectBox
					//defaultValue="cat"
					placeholder="Select animal...."
					selectOptions={[
						{ value: 'cat', name: 'cat' },
						{ value: 'dog', name: 'dog' },
					]}
					selectNameFormatter={name => name.toUpperCase()}
				/>
			</Box>
			<Box css={{ width: '200px' }}>
				<SelectBox
					//defaultValue="1"
					placeholder="Select from 100"
					selectOptions={Array.from({ length: 100 }, (_, i) => ({
						value: `${i}`,
						name: `${i} -- ${(Math.random() + 1)
							.toString(36)
							.substring(
								7,
							)} llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test`,
					}))}
					selectNameFormatter={name => name.toUpperCase()}
				/>
			</Box>
			<Box>
				<Select>
					<SelectTrigger aria-label="Food">
						<SelectValue placeholder="Select a fruit…" />
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
			<Box>
				<Select defaultValue="blueberry">
					<SelectTrigger aria-label="Food" asChild>
						<Button color="input" size="4" css={{ width: '200px' }}>
							<SelectValue />
							<SelectIcon>
								<ChevronDownIcon />
							</SelectIcon>
						</Button>
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
									<SelectItemIndicator />
								</SelectItem>
								<SelectItem value="banana">
									<SelectItemText>Banana</SelectItemText>
									<SelectItemIndicator />
								</SelectItem>
								<SelectItem value="blueberry">
									<SelectItemText>Blueberry</SelectItemText>
									<SelectItemIndicator />
								</SelectItem>
								<SelectItem value="grapes">
									<SelectItemText>Grapes</SelectItemText>
									<SelectItemIndicator />
								</SelectItem>
								<SelectItem value="pineapple">
									<SelectItemText>Pineapple</SelectItemText>
									<SelectItemIndicator />
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
		</Flex>
	</Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
	type: 'success',
}
