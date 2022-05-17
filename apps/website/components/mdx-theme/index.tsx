/* eslint-disable */
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { MDXRemote } from 'next-mdx-remote'
import Button from 'ui/src/components/button'
import { Example as ExampleV1 } from '../pages/example-v1'
import { Text, StyledLink } from 'ui/src/components/atoms'

const components = {
	Button,
	ExampleV1,
	SyntaxHighlighter,
	h1: props => (
		<Text
			as="h1"
			bold
			size="12"
			displayRound
			css={{
				py: '$5',
				fontSize: '26px',
				lineHeight: '30px',
				'@md': { fontSize: '36px', lineHeight: '46px' },
			}}
			{...props}
		/>
	),
	h2: props => <Text displayRound as="h2" size="10" css={{ py: '$3' }} {...props} />,
	h3: props => <Text displayRound as="h3" size="8" css={{ py: '$3' }} {...props} />,
	h4: props => <Text displayRound as="h4" size="7" css={{ py: '$3' }} {...props} />,
	h5: props => <Text displayRound as="h5" size="5" css={{ py: '$3' }} {...props} />,
	h6: props => <Text displayRound as="h6" size="4" css={{ py: '$3' }} {...props} />,
	p: props => (
		<Text
			as="p"
			size="5"
			regular
			css={{
				py: '$3',
				fontFamily: '$HaasGrotTextRound',
				fontSize: '15px',
				lineHeight: '22px',
				'@sm': { fontSize: '16px', lineHeight: '26px' },
			}}
			{...props}
		/>
	),
	a: props => <StyledLink as="a" bubble {...props} />,
}

interface IProps {
	mdxSource: any
}

export const MdxTheme: React.FC<IProps> = ({ mdxSource }) => {
	return (
		<Text size="5" regular css={{ width: '100%', lineHeight: '25px' }} as="div">
			<MDXRemote {...mdxSource} components={components} />
		</Text>
	)
}
