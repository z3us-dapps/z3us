/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useTheme } from 'next-themes'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import syntaxStyleDark from 'react-syntax-highlighter/dist/cjs/styles/prism/duotone-dark'
import syntaxStyleLight from 'react-syntax-highlighter/dist/cjs/styles/prism/duotone-light'
import { MDXRemote } from 'next-mdx-remote'
import Button from 'ui/src/components/button'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import { Example as ExampleOlympia } from '../pages/example-olympia'
import { Example as ExampleBabylon } from '../pages/example-babylon'

const generateComponents = (theme: string) => ({
	Button,
	ExampleOlympia,
	ExampleBabylon,
	SyntaxHighlighter: props => (
		<Box
			css={{
				my: '$4',
				pre: {
					background: 'transparent !important',
					p: '0em 1em !important',
					fontSize: '0.85em !important',
					br: '$3',
					border: '1px solid',
					borderColor: '$borderPanel2',
					code: {
						background: 'transparent !important',
					},
					span: {
						tabSize: '2 !important',
					},
				},
			}}
		>
			<SyntaxHighlighter style={theme === 'dark' ? syntaxStyleDark : syntaxStyleLight} {...props} />
		</Box>
	),
	h1: props => (
		<Text
			as="h1"
			bold
			size="12"
			css={{
				py: '$5',
				fontSize: '26px',
				lineHeight: '30px',
				'@md': { fontSize: '36px', lineHeight: '46px' },
			}}
			{...props}
		/>
	),
	h2: props => <Text as="h2" size="10" css={{ py: '$3' }} {...props} />,
	h3: props => <Text as="h3" size="8" css={{ py: '$3' }} {...props} />,
	h4: props => <Text as="h4" size="7" css={{ py: '$3' }} {...props} />,
	h5: props => <Text as="h5" size="5" css={{ py: '$3' }} {...props} />,
	h6: props => <Text as="h6" size="4" css={{ py: '$3' }} {...props} />,
	p: props => (
		<Text
			as="p"
			size="5"
			regular
			css={{
				py: '$3',
				fontSize: '15px',
				lineHeight: '22px',
				'@sm': { fontSize: '16px', lineHeight: '26px' },
			}}
			{...props}
		/>
	),
	a: props => <StyledLink as="a" bubble {...props} />,
})

interface IProps {
	mdxSource: any
}

export const MdxTheme: React.FC<IProps> = ({ mdxSource }) => {
	const { resolvedTheme } = useTheme()
	const components = generateComponents(resolvedTheme)

	return (
		<Text size="5" regular css={{ width: '100%', lineHeight: '25px' }}>
			<MDXRemote {...mdxSource} components={components} />
		</Text>
	)
}
