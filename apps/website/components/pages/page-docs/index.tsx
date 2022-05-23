import React from 'react'
import { Box, Flex } from 'ui/src/components/atoms'
import { PageContainer } from 'components/page-container'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { MdxTheme } from 'components/mdx-theme'
import { SideMenu } from 'components/side-menu'
import { DocsPageProps } from 'types'

export const PageDocs: React.FC<DocsPageProps> = ({ docs, mdxSource }) => (
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
							width: '100%',
							flexBasis: '100%',
							'@sm': { width: '30%', flexBasis: '30%', paddingRight: '30px' },
							'@md': { width: '28%', flexBasis: '28%', paddingRight: '30px', paddingLeft: '15px' },
						}}
					>
						<SideMenu docs={docs} />
					</Box>
					<Box
						css={{
							flex: '1 1 auto',
							maxWidth: '100%',
							'@sm': { width: '30%', flexBasis: '30%' },
							'@md': { width: '50%', flexBasis: '50%' },
						}}
					>
						<MdxTheme mdxSource={mdxSource} />
					</Box>
					<Box
						css={{
							display: 'none',
							width: '15%',
							flexBasis: '15%',
							'@md': { display: 'block', paddingLeft: '30px' },
						}}
					>
						<Box />
					</Box>
				</Box>
			</PageContainer>
		</Box>
		<Footer />
	</Flex>
)
