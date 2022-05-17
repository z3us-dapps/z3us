/* eslint-disable */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
//import Image from 'next/image'
import React from 'react'
import { NextSeo } from 'next-seo'
import { Header } from 'components/header'
import { Container, Row, Col } from 'react-grid-system'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { Footer } from 'components/footer'
import { MdxTheme } from 'components/mdx-theme'
import { SideMenu } from 'components/side-menu'
import docsGlobalStyles from './docs.styles'

const DocsIndex = ({ docs, mdxSource }) => {
	docsGlobalStyles()
	return (
		<>
			<NextSeo
				title="Documentation"
				openGraph={{
					type: 'website',
					url: config.Z3US_URL,
					title: config.OPEN_GRAPH_TITLE,
					description: config.OPEN_GRAPH_DESCRIPTION,
					images: [
						{
							url: `${config.Z3US_URL}/og-image-1.png`,
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: `${config.Z3US_URL}/og-image-2.png`,
							width: 800,
							height: 600,
							alt: 'Og Image Alt 2',
						},
					],
				}}
			/>
			<Flex direction="column" css={{ minHeight: '100vh' }}>
				<Header />
				<Box
					css={{
						position: 'relative',
						flex: '1',
					}}
				>
					<PageContainer>
						<Container fluid>
							<Row>
								<Col xs={4}>
									<SideMenu docs={docs} />
								</Col>
								<Col>
									<Box css={{ width: '100%', pb: '100px' }}>
										<MdxTheme mdxSource={mdxSource} />
									</Box>
								</Col>
							</Row>
						</Container>
					</PageContainer>
				</Box>
				<Footer />
			</Flex>
		</>
	)
}

export const getStaticProps = async () => {
	const files = fs.readdirSync(path.join('docs'))

	const docs = files.map(filename => {
		const markdownWithMeta = fs.readFileSync(path.join('docs', filename), 'utf-8')
		const { data: frontMatter } = matter(markdownWithMeta)

		return {
			frontMatter,
			slug: filename.split('.')[0],
		}
	})

	const markdownWithMeta = fs.readFileSync(path.join('docs/introduction.mdx'), 'utf-8')
	const { content } = matter(markdownWithMeta)
	const mdxSource = await serialize(content)

	return {
		props: {
			docs,
			mdxSource,
		},
	}
}

export default DocsIndex
