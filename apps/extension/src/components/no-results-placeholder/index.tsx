import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import React from 'react'

import { Box, Flex, Text } from 'ui/src/components/atoms'

interface IProps {
	title?: string
	subTitle?: string | undefined
	showIcon?: boolean
}

const defaultProps = {
	title: 'No results found',
	subTitle: 'please refine search',
	showIcon: true,
}

export const NoResultsPlaceholder: React.FC<IProps> = ({ title, subTitle, showIcon }) => (
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
			{showIcon ? (
				<Box css={{ transform: 'translateY(3px)' }}>
					<MagnifyingGlassIcon />
				</Box>
			) : null}
		</Flex>
		{subTitle?.length > 0 ? <Text css={{ pt: '$2' }}>{subTitle}</Text> : null}
	</Flex>
)

NoResultsPlaceholder.defaultProps = defaultProps
