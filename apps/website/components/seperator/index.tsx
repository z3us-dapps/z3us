import React from 'react'
import { Box, Text } from 'ui/src/components/atoms'

const Seperator = ({ title }: { title: string }) => (
		<Box css={{ py: '$6', mt: '$4' }}>
			<Text medium size="5" css={{ pb: '$2' }}>
				{title}
			</Text>
			<Box css={{ height: '2px', background: '$borderPanel' }} />
		</Box>
	)

export default Seperator
