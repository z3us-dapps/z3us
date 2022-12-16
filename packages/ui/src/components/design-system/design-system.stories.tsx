/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { CopyIcon } from '@radix-ui/react-icons'
import tokens from 'design/tokens/foundation/colors.json'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from '../button'
import ButtonTipFeedback from '../button-tip-feedback'
import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'
import { Text } from '../atoms/text'
import LoaderBars from '../loader-bars'

// @TODO: move to shared utils
async function copyTextToClipboard(str: string) {
   try {
      await navigator.clipboard.writeText(str)
   } catch (err) {
      // eslint-disable-next-line
      console.error('Failed to copy: ', err)
   }
}

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

const COLOR_CELL_WIDTH = '60px'

const CombinedTemplate: React.FC = () => (
   <Box>
      <Flex justify="start" direction="column" gap="5">
         {Object.entries(tokens.color.core).map(([color, subColors]) => (
            <Box key={color}>
               <Text bold size="4" css={{ pb: '10px', textTransform: 'uppercase' }}>
                  {color}
               </Text>
               <Flex key={color} css={{ gap: '12px' }}>
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
                                 <Text truncate css={{ maxWidth: '90px' }}>
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

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
   color: 'default',
}
