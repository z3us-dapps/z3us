/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import { CopyIcon } from '@radix-ui/react-icons'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import tokens from 'design/tokens/foundation/colors.json'
import tokensBrandLight from 'design/tokens/themes/light/brand.json'
import tokensBrandDark from 'design/tokens/themes/dark/brand.json'

import tokensBackgroundLight from 'design/tokens/themes/light/background.json'
import tokensBackgroundDark from 'design/tokens/themes/dark/background.json'

import tokensBorderLight from 'design/tokens/themes/light/border.json'
import tokensBorderDark from 'design/tokens/themes/dark/border.json'

import tokensFontLight from 'design/tokens/themes/light/font.json'
import tokensFontDark from 'design/tokens/themes/dark/font.json'

import 'design/dist/index.css'
import 'design/dist/light/index.css'
import 'design/dist/dark/index.css'

import Button from '../button'
import { ToolTip } from '../tool-tip'
import ButtonTipFeedback from '../button-tip-feedback'
import { Grid } from '../atoms/grid'
import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Text } from '../atoms/text'
import LoaderBars from '../loader-bars'

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

// @TODO: move to shared utils
async function copyTextToClipboard(str: string) {
   try {
      await navigator.clipboard.writeText(str)
   } catch (err) {
      // eslint-disable-next-line
      console.error('Failed to copy: ', err)
   }
}

const ColorUnit = ({
   color,
   value,
   colorKey,
   category,
   styleDecl,
   width,
}: {
   color?: string
   value: any
   colorKey: any
   category: any
   styleDecl: any
   width?: any
}) => {
   const code = typeof value === 'object' ? value.value : value
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
                  <Text color="help" truncate >
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

const ColorComp = ({
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
                     <ColorUnit value={subColors} colorKey={colorKey} category={category} styleDecl={styleDecl} width="300px" />
                  ) : null}
                  {depth === 2
                     ? Object.entries(subColors).map(([_color, value]) => (
                        <ColorUnit
                           color={_color}
                           value={value}
                           colorKey={colorKey}
                           category={category}
                           styleDecl={styleDecl}
                        />
                     ))
                     : null}
               </Flex>
            </Box>
         ))}
      </Flex>
   )
}

const CombinedTemplate: React.FC = () => (
   <Box>
      {/* BRAND TOKENS */}
      <Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase' }}>
         Brand tokens
      </Text>
      <Grid columns="2" gap="4" css={{ mt: '$4' }}>
         <ColorComp theme="light" colorKey="brand" depth={2} colorTokens={tokensBrandLight.color.brand} />
         <ColorComp theme="dark" colorKey="brand" depth={2} colorTokens={tokensBrandDark.color.brand} />
      </Grid>

      {/* BACKGROUND TOKENS */}
      <Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase', mt: '$12' }}>
         Background tokens
      </Text>
      <Grid columns="2" gap="4" css={{ mt: '$4' }}>
         <ColorComp theme="light" colorKey="background" depth={1} colorTokens={tokensBackgroundLight.color.background} />
         <ColorComp theme="dark" colorKey="background" depth={1} colorTokens={tokensBackgroundDark.color.background} />
      </Grid>

      {/* BORDER TOKENS */}
      <Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase', mt: '$12' }}>
         Border tokens
      </Text>
      <Grid columns="2" gap="4" css={{ mt: '$4' }}>
         <ColorComp theme="light" colorKey="border" depth={1} colorTokens={tokensBorderLight.color.border} />
         <ColorComp theme="dark" colorKey="border" depth={1} colorTokens={tokensBorderDark.color.border} />
      </Grid>

      {/* FONT TOKENS */}
      <Text bold size="8" css={{ pb: '10px', textTransform: 'uppercase', mt: '$12' }}>
         Font tokens
      </Text>
      <Grid columns="2" gap="4" css={{ mt: '$4' }}>
         <ColorComp theme="light" colorKey="font" depth={1} colorTokens={tokensFontLight.color.font} />
         <ColorComp theme="dark" colorKey="font" depth={1} colorTokens={tokensFontDark.color.font} />
      </Grid>

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

const Primary = Template.bind({})
Primary.args = {
   color: 'default',
}
