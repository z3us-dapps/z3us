import React from 'react'
import { PageContainer } from 'components/page-container'
import { Box } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { Container, Row, Col } from 'react-grid-system'

interface IProps {
	children: React.ReactNode
}

export const SinglePageDocs: React.FC<IProps> = ({ children }) => (
	<>
		<Header />
		<PageContainer>
			<Container fluid>
				<Row>
					<Col>
						<Box
							css={{
								width: '100%',
								pb: '100px',
								px: '0',
								'@sm': {
									px: '15%',
								},
							}}
						>
							{children}
						</Box>
					</Col>
				</Row>
			</Container>
		</PageContainer>
		<Footer />
	</>
)
