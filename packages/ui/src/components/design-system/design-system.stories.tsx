/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { CopyIcon } from '@radix-ui/react-icons'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import 'design/dist/dark/index.css'
import 'design/dist/index.css'
import 'design/dist/light/index.css'
import tokens from 'design/tokens/foundation/colors.json'
import tokensBackground from 'design/tokens/theme/background.json'
import tokensBorder from 'design/tokens/theme/border.json'
import tokensBrand from 'design/tokens/theme/brand.json'
import tokensFont from 'design/tokens/theme/font.json'
import React from 'react'

import { copyTextToClipboard } from '../../utils/copy-to-clipboard'
import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Grid } from '../atoms/grid'
import { Text } from '../atoms/text'
import Button from '../button'
import ButtonTipFeedback from '../button-tip-feedback'
import LoaderBars from '../loader-bars'
import { ColorComp } from './color-component'

export default {
	title: 'z3us design system/Colors',
	component: LoaderBars,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof LoaderBars>

const Template: ComponentStory<typeof LoaderBars> = args => {
	const as = 'div'
	return <LoaderBars as={as} />
}

const COLOR_CELL_WIDTH = '80px'

const CombinedTemplate: React.FC = () => (
	<Box>
		{/* BRAND TOKENS */}
		<Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase' }}>
			Brand tokens
		</Text>
		<Grid columns="2" gap="4" css={{ mt: '$4' }}>
			<ColorComp theme="light" colorKey="brand" depth={2} colorTokens={tokensBrand.color.brand} />
			<ColorComp theme="dark" colorKey="brand" depth={2} colorTokens={tokensBrand.color.brand} />
		</Grid>

		{/* BACKGROUND TOKENS */}
		<Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase', mt: '$12' }}>
			Background color tokens
		</Text>
		<Grid columns="2" gap="4" css={{ mt: '$4' }}>
			<ColorComp theme="light" colorKey="background" depth={1} colorTokens={tokensBackground.color.background} />
			<ColorComp theme="dark" colorKey="background" depth={1} colorTokens={tokensBackground.color.background} />
		</Grid>

		{/* FONT TOKENS */}
		<Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase', mt: '$12' }}>
			Color Font tokens
		</Text>
		<Grid columns="2" gap="4" css={{ mt: '$4' }}>
			<ColorComp theme="light" colorKey="font" depth={1} colorTokens={tokensFont.color.font} />
			<ColorComp theme="dark" colorKey="font" depth={1} colorTokens={tokensFont.color.font} />
		</Grid>

		{/* BORDER TOKENS */}
		<Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase', mt: '$12' }}>
			Border color tokens
		</Text>
		<Grid columns="2" gap="4" css={{ mt: '$4' }}>
			<ColorComp theme="light" colorKey="border" depth={1} colorTokens={tokensBorder.color.border} />
			<ColorComp theme="dark" colorKey="border" depth={1} colorTokens={tokensBorder.color.border} />
		</Grid>
	</Box>
)

const CombinedColors: React.FC = () => (
	<Box>
		{/* ALL COLORS */}
		<Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase', mt: '$10' }}>
			Colors
		</Text>
		<Flex justify="start" direction="column" gap="5">
			{Object.entries(tokens.color.core).map(([color, subColors]) => (
				<Box key={color}>
					<Text color="help" bold size="4" css={{ pb: '10px', textTransform: 'uppercase' }}>
						{color}
					</Text>
					<Flex css={{ gap: '12px' }}>
						{Object.entries(subColors).map(([_color, value]) => {
							const hexColor = typeof value === 'object' ? value.value : value
							return (
								<Box key={_color} css={{ width: COLOR_CELL_WIDTH }}>
									<Box
										css={{
											width: COLOR_CELL_WIDTH,
											height: COLOR_CELL_WIDTH,
											br: '$3',
											bg: hexColor,
											border: '1px solid',
											borderColor: '#eee',
											boxShadow: '$shadowPanel2',
										}}
									/>
									<Flex css={{ pt: '$1', flexDirection: 'column' }}>
										<Flex align="center" justify="between">
											<Text color="help" truncate css={{ maxWidth: '90px' }}>
												{_color}
											</Text>
											<ButtonTipFeedback tooltip="Copy hex" bgColor="$bgPanel2" feedback={`copied ${_color}`}>
												<Button color="ghost" onClick={() => copyTextToClipboard(hexColor)} iconOnly size="1">
													<CopyIcon />
												</Button>
											</ButtonTipFeedback>
										</Flex>
										<Flex align="center" justify="between">
											<Text color="help">{hexColor}</Text>
										</Flex>
									</Flex>
								</Box>
							)
						})}
					</Flex>
				</Box>
			))}
		</Flex>
	</Box>
)

export const Tokens = CombinedTemplate

export const Colors = CombinedColors

const Primary = Template.bind({})

Primary.args = {
	color: 'default',
}
