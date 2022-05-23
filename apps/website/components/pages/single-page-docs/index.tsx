import React from 'react'
import { PageContainer } from 'components/page-container'
import { Box } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

interface IProps {
	children: React.ReactNode
}

export const SinglePageDocs: React.FC<IProps> = ({ children }) => (
	<>
		<Header />
		<PageContainer>
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
		</PageContainer>
		<Footer />
	</>
)
