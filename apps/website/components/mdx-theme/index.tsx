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
	h1: props => <Text bold size="12" css={{ py: '$5' }} {...props} />,
	h2: props => <Text size="10" css={{ py: '$3' }} {...props} />,
	h3: props => <Text size="8" css={{ py: '$3' }} {...props} />,
	h4: props => <Text size="7" css={{ py: '$3' }} {...props} />,
	h5: props => <Text size="5" css={{ py: '$3' }} {...props} />,
	h6: props => <Text size="4" css={{ py: '$3' }} {...props} />,
	p: props => <Text size="7" regular css={{ py: '$3', lineHeight: '32px' }} {...props} />,
	a: props => <StyledLink bubble {...props} />,
}

interface IProps {
	mdxSource: any
}

export const MdxTheme: React.FC<IProps> = ({ mdxSource }: IProps) => {
	return (
		<Text size="5" regular css={{ width: '100%', lineHeight: '25px' }} as="div">
			<MDXRemote {...mdxSource} components={components} />
		</Text>
	)
}
