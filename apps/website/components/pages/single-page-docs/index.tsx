import React from 'react'
//import { Container, Grid } from '@nextui-org/react'
import { Box, Flex } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

interface IProps {
	children: React.ReactNode
}

export const SinglePageDocs: React.FC<IProps> = ({ children }: IProps) => (
	<Flex direction="column" css={{ minHeight: '100vh' }}>
		<Header />
		<Box
			css={{
				position: 'relative',
				flex: '1',
			}}
		>
			<Box>
				<Box css={{ width: '100%', pb: '100px' }}>{children}</Box>
			</Box>
		</Box>
		<Footer />
	</Flex>
)
