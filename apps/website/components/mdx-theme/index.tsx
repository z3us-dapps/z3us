/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/heading-has-content, jsx-a11y/anchor-has-content */
import React from 'react'
import { useTheme } from 'next-themes'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import syntaxStyleDark from 'react-syntax-highlighter/dist/cjs/styles/prism/duotone-dark'
import syntaxStyleLight from 'react-syntax-highlighter/dist/cjs/styles/prism/duotone-light'
import { MDXRemote } from 'next-mdx-remote'
// import Button from 'ui/src/components/button'
import { Example as ExampleOlympia } from '../pages/example-olympia'
import { Example as ExampleBabylon } from '../pages/example-babylon'
// import { Airdrop } from '../pages/airdrop'

const generateComponents = (theme: string) => ({
	// Button,
	ExampleOlympia,
	ExampleBabylon,
	// Airdrop,
	SyntaxHighlighter: props => (
		<div>
			<SyntaxHighlighter style={theme === 'dark' ? syntaxStyleDark : syntaxStyleLight} {...props} />
		</div>
	),
	h1: props => <h1 {...props} />,
	h2: props => <h2 {...props} />,
	h3: props => <h3 {...props} />,
	h4: props => <h4 {...props} />,
	h5: props => <h5 {...props} />,
	h6: props => <h6 {...props} />,
	p: props => <p {...props} />,
	a: props => <a {...props} />,
})

interface IProps {
	mdxSource: any
}

export const MdxTheme: React.FC<IProps> = ({ mdxSource }) => {
	const { resolvedTheme } = useTheme()
	const components = generateComponents(resolvedTheme)

	return <MDXRemote {...mdxSource} components={components} />
}
