/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/heading-has-content, jsx-a11y/anchor-has-content */
import React from 'react'
import { useTheme } from 'next-themes'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import syntaxStyleDark from 'react-syntax-highlighter/dist/cjs/styles/prism/duotone-dark'
import syntaxStyleLight from 'react-syntax-highlighter/dist/cjs/styles/prism/duotone-light'
import { MDXRemote } from 'next-mdx-remote'
import { Example as ExampleOlympia } from '../pages/example-olympia'
import { Example as ExampleBabylon } from '../pages/example-babylon'
// import Button from 'ui/src/components/button'
// import { Airdrop } from '../pages/airdrop'

const generateComponents = (theme: string) => ({
  // Button,
  // Airdrop,
  ExampleOlympia,
  ExampleBabylon,
  SyntaxHighlighter: props => (
    <div>
      <SyntaxHighlighter style={theme === 'dark' ? syntaxStyleDark : syntaxStyleLight} {...props} />
    </div>
  ),
  h1: props => <h1 className="text-4xl font-bold" {...props} />,
  h2: props => <h2 className="text-3xl font-bold" {...props} />,
  h3: props => <h3 className="text-2xl font-bold" {...props} />,
  h4: props => <h4 className="text-xl font-bold" {...props} />,
  h5: props => <h5 className="text-lg font-bold" {...props} />,
  h6: props => <h6 className="text-base font-bold" {...props} />,
  p: props => <p className="text-base text-neutral-500 dark:text-neutral-300 leading-loose" {...props} />,
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
