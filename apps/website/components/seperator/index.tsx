import React from 'react'
import { Box, Text } from 'ui/src/components/atoms'

const Seperator = ({ title }: { title: string }) => (
	<Box css={{ py: '$6', mt: '$4' }}>
		<Text bold size="5" css={{ pb: '$3' }}>
			{title}
		</Text>
		<Box css={{ height: '2px', background: '$borderPanel' }} />
	</Box>
)

export default Seperator
