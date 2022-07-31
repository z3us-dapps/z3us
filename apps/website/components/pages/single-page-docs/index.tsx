import React from 'react'
import { PageContainer } from 'components/page-container'
import { Box, Flex } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

interface IProps {
	children: React.ReactNode
}

export const SinglePageDocs: React.FC<IProps> = ({ children }) => (
	<Flex direction="column" css={{ minHeight: '100vh' }}>
		<Header />
		<Box
			css={{
				position: 'relative',
				flex: '1',
			}}
		>
			<PageContainer>
				<Box css={{ pb: '120px', '@sm': { display: 'flex' } }}>
					<Box
						css={{
							flex: '1 1 auto',
							maxWidth: '100%',
							'@sm': { width: '30%', flexBasis: '30%' },
							'@md': { width: '50%', flexBasis: '50%' },
						}}
					>
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
					</Box>
				</Box>
			</PageContainer>
		</Box>
		<Footer />
	</Flex>
)
