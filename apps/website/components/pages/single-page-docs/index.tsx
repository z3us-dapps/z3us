import React from 'react'
import { Grid } from '@nextui-org/react'

import { Container } from 'components/container'
import { Box, Flex } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

interface IProps {
	children: React.ReactNode
}

export const SinglePageDocs: React.FC<IProps> = ({ children }) => (
	<>
		<Header />
		<Container>
			<Flex>
				<Grid.Container
					gap={2}
					justify="center"
					css={{
						position: 'relative',
					}}
				>
					<Grid xs={12} md={8}>
						<Box css={{ width: '100%', pb: '100px' }}>{children}</Box>
					</Grid>
				</Grid.Container>
			</Flex>
		</Container>
		<Footer />
	</>
)
