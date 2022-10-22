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
	h1: props => <h1 className="text-4xl font-bold mt-6" {...props} />,
	h2: props => <h2 className="text-3xl font-bold mt-5" {...props} />,
	h3: props => <h3 className="text-2xl font-bold mt-4" {...props} />,
	h4: props => <h4 className="text-xl font-bold mt-3" {...props} />,
	h5: props => <h5 className="text-lg font-bold mt-2" {...props} />,
	h6: props => <h6 className="text-base font-bold mt-2" {...props} />,
	p: props => <p className="text-base mt-4 text-neutral-500 dark:text-neutral-300 leading-relaxed" {...props} />,
	a: props => <a className="text-violet-500 dark:text-violet-300 hover:opacity-90 transition-opacity" {...props} />,
})

interface IProps {
	mdxSource: any
}

export const MdxTheme: React.FC<IProps> = ({ mdxSource }) => {
	const { resolvedTheme } = useTheme()
	const components = generateComponents(resolvedTheme)

	return <MDXRemote {...mdxSource} components={components} />
}
