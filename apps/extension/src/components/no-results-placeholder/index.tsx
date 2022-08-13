import React from 'react'
import { Text, Flex, Box } from 'ui/src/components/atoms'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

interface IProps {
	title?: string
	subTitle?: string
}

const defaultProps = {
	title: 'No results found',
	subTitle: 'please refine search',
}

export const NoResultsPlaceholder: React.FC<IProps> = ({ title, subTitle }) => (
	<Flex
		direction="column"
		align="center"
		justify="center"
		css={{
			position: 'relative',
			height: '100%',
		}}
	>
		<Flex align="center" css={{ position: 'relative' }}>
			<Text size="5" bold css={{ pr: '6px' }}>
				{title}
			</Text>
			<Box css={{ transform: 'translateY(3px)' }}>
				<MagnifyingGlassIcon />
			</Box>
		</Flex>
		<Text css={{ pt: '$2' }}>{subTitle}</Text>
	</Flex>
)

NoResultsPlaceholder.defaultProps = defaultProps
