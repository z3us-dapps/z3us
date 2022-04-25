/* eslint-disable */
import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Card } from '.';

export default {
	title: 'Card/index',
} as Meta;

const Template: Story<ComponentProps<typeof Card>> = (args) => <Card {...args} />;
Template.storyName = 'Card/index';

export const Index = Template.bind({});
Index.args = {};
