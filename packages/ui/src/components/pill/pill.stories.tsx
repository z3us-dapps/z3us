/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '../atoms/box'
import { Grid } from '../atoms/grid'
import { Flex } from '../atoms/flex'

import Pill from './index'

export default {
  title: 'z3us components/Pill',
  component: Pill,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Pill>

const Template: ComponentStory<typeof Pill> = args => {
  const { children } = args
  const as = 'div'
  return <Pill as={as}>{children}</Pill>
}

const CombinedTemplate: React.FC = () => (
  <Box>
    <Flex justify="start" css={{ border: '0px solid red' }}>
      <Grid flow="column" gap="5" css={{ border: '0px solid red' }}>
        <Box>
          <Pill>Default</Pill>
        </Box>
        <Box>
          <Pill color="inverse">Inverse</Pill>
        </Box>
        <Box>
          <Pill color="gradientGreen">Gradient green</Pill>
        </Box>
        <Box>
          <Pill color="gradientOrange">Gradient purple</Pill>
        </Box>
      </Grid>
    </Flex>
  </Box>
)

export const Playground = CombinedTemplate

export const Primary = Template.bind({})
Primary.args = {
  color: 'default',
  children: 'pill',
}
