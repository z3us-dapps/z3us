/* eslint-disable no-nested-ternary */
import { CopyIcon } from '@radix-ui/react-icons'
import React, { useEffect, useRef, useState } from 'react'

import { copyTextToClipboard } from '../../utils/copy-to-clipboard'
import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Text } from '../atoms/text'
import Button from '../button'
import ButtonTipFeedback from '../button-tip-feedback'
import { ToolTip } from '../tool-tip'

const COLOR_CELL_WIDTH = '80px'

export const ColorUnit = ({
	color,
	value,
	colorKey,
	category,
	styleDecl,
	width,
	theme,
}: {
	color?: string
	value: any
	colorKey: any
	category: any
	styleDecl: any
	width?: any
	theme: string
}) => {
	const code = typeof value === 'object' ? (theme === 'dark' ? value.darkValue : value.value) : value
	const cssStr = color ? `--color-${colorKey}-${category}-${color}` : `--color-${colorKey}-${category}`
	const cssVar = `var(${cssStr})`
	const cssHex = styleDecl?.getPropertyValue(cssStr) || ''
	return (
		<Box css={{ width }}>
			<Flex
				justify="end"
				css={{
					position: 'relative',
					width: COLOR_CELL_WIDTH,
					height: COLOR_CELL_WIDTH,
					br: '$3',
					bg: cssVar,
					border: '1px solid',
					borderColor: '#eee',
					boxShadow: '$shadowPanel2',
					button: {
						display: 'none',
					},
					'&:hover': {
						button: {
							display: 'block',
						},
					},
				}}
			>
				<ButtonTipFeedback tooltip="Copy CSS var" bgColor="$bgPanel2" feedback={`copied ${cssVar}`}>
					<Button color="ghost" onClick={() => copyTextToClipboard(cssVar)} iconOnly size="1">
						<CopyIcon />
					</Button>
				</ButtonTipFeedback>
			</Flex>
			<Flex css={{ pt: '$1', flexDirection: 'column', gap: '3px' }}>
				<Flex align="center" justify="between">
					<Text color="help" truncate css={{ maxWidth: '90px' }}>
						{color}
					</Text>
				</Flex>
				<Flex align="center" justify="between">
					<ToolTip message={cssVar}>
						<Text color="help" truncate>
							{cssVar}
						</Text>
					</ToolTip>
				</Flex>
				<Flex align="center" justify="between">
					<ToolTip message={code}>
						<Text color="help" truncate>
							{code}
						</Text>
					</ToolTip>
				</Flex>
				<Flex align="center" justify="between">
					<Text color="help" truncate>
						{cssHex}
					</Text>
				</Flex>
			</Flex>
		</Box>
	)
}

ColorUnit.defaultProps = {
	color: undefined,
	width: COLOR_CELL_WIDTH,
}

export const ColorComp = ({
	theme,
	colorKey,
	depth,
	colorTokens,
}: {
	theme: string
	colorKey: string
	depth: number
	colorTokens: any
}) => {
	const colorRef = useRef(null)
	const [styleDecl, setStyleDecl] = useState<any>(null)

	useEffect(() => {
		setStyleDecl(window.getComputedStyle(colorRef.current))
	}, [colorRef])

	return (
		<Flex direction="column" gap={8} className={theme} ref={colorRef}>
			{Object.entries(colorTokens).map(([category, subColors]) => (
				<Box key={category}>
					<Text color="help" bold size="4" css={{ pb: '10px', textTransform: 'uppercase' }}>
						{theme} {colorKey} {category}
					</Text>
					<Flex css={{ gap: '16px' }}>
						{depth === 1 ? (
							<ColorUnit
								value={subColors}
								colorKey={colorKey}
								category={category}
								styleDecl={styleDecl}
								width="300px"
								theme={theme}
							/>
						) : null}
						{depth === 2
							? Object.entries(subColors).map(([_color, value]) => (
									<ColorUnit
										key={_color}
										color={_color}
										value={value}
										colorKey={colorKey}
										category={category}
										styleDecl={styleDecl}
										theme={theme}
									/>
							  ))
							: null}
					</Flex>
				</Box>
			))}
		</Flex>
	)
}
