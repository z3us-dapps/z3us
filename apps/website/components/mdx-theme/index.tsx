/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/heading-has-content, jsx-a11y/anchor-has-content */
import { MDXRemote } from 'next-mdx-remote'
import React from 'react'

import { Example as ExampleBabylon } from '../pages/example-babylon'
import { Example as ExampleOlympia } from '../pages/example-olympia'

// import Button from 'ui/src/components/button'
// import { Airdrop } from '../pages/airdrop'

const generateComponents = () => ({
	// Button,
	// Airdrop,
	ExampleOlympia,
	ExampleBabylon,
	h1: props => <h1 className="text-5xl font-bold mt-4 pb-1" {...props} />,
	h2: props => <h2 className="text-3xl font-bold mt-10 pb-1" {...props} />,
	h3: props => <h3 className="text-2xl font-bold mt-10 pb-1" {...props} />,
	h4: props => <h4 className="text-xl font-bold mt-10 pb-1" {...props} />,
	h5: props => <h5 className="text-lg font-bold mt-10 pb-1" {...props} />,
	h6: props => <h6 className="text-base font-bold mt-10 pb-1" {...props} />,
	p: props => <p className="text-base text-neutral-500 dark:text-neutral-300 leading-loose" {...props} />,
	ul: props => <ul className="text-base text-neutral-500 dark:text-neutral-300 leading-loose" {...props} />,
	ol: props => <ol className="text-base text-neutral-500 dark:text-neutral-300 leading-loose" {...props} />,
	a: props => (
		<a
			className="text-purple-500 dark:text-purple-200 hover:opacity-90 underline decoration-from-font underline-offset-4 hover:decoration-1 transition-all"
			{...props}
		/>
	),
	pre: props => (
		<pre
			className="z3-pre text-xs mt-6 mb-4 p-4 md:p-3 bg-bleached_silk-0/75 dark:bg-purple-900/60 rounded-md shadow"
			{...props}
		/>
	),
	code: props => <code className="z3-code" {...props} />,
})

interface IProps {
	mdxSource: any
}

export const MdxTheme: React.FC<IProps> = ({ mdxSource }) => {
	const components = generateComponents()

	return <MDXRemote {...mdxSource} components={components} />
}
