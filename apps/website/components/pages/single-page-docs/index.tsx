import React from 'react'
import { Container, Grid } from '@nextui-org/react'
import { Box, Flex } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

interface IProps {
	children: React.ReactNode
}

export const SinglePageDocs: React.FC<IProps> = ({ children }) => (
	<Flex direction="column" css={{ minHeight: '100vh' }}>
		<Header />
		<Flex css={{ flex: '1' }}>
			<Container css={{ position: 'relative' }}>
				<Flex>
					<Grid.Container gap={0} justify="center">
						<Grid xs={12} md={8}>
							<Box css={{ width: '100%', pb: '100px' }}>{children}</Box>
						</Grid>
					</Grid.Container>
				</Flex>
			</Container>
		</Flex>
		<Footer />
	</Flex>
)
