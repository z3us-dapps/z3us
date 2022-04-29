/* eslint-disable */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { Box, Flex } from 'ui/src/components/atoms'
import { NextSeo } from 'next-seo'
import { Container, Grid } from '@nextui-org/react'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { MdxTheme } from 'components/mdx-theme'
import docsGlobalStyles from './docs/docs.styles'

const DocsIndex = ({ docs, mdxSource }) => {
	docsGlobalStyles()
	return (
		<>
			<NextSeo
				title="Privacy | z3us"
				openGraph={{
					type: 'website',
					url: 'https://www.example.com/page',
					title: 'Open Graph Title',
					description: 'Open Graph Description',
					images: [
						{
							url: 'https://www.example.com/og-image.jpg',
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: 'https://www.example.com/og-image-2.jpg',
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
					<Container gap={0}>
						<Grid.Container gap={0}>
							<Grid xs={8}>
								<Box css={{ width: '100%', pb: '100px' }}>
									<MdxTheme mdxSource={mdxSource} />
								</Box>
							</Grid>
						</Grid.Container>
					</Container>
				</Box>
				<Footer />
			</Flex>
		</>
	)
}

export const getStaticProps = async () => {
	const markdownWithMeta = fs.readFileSync(path.join('docs/privacy.mdx'), 'utf-8')
	const { content } = matter(markdownWithMeta)
	const mdxSource = await serialize(content)

	return {
		props: {
			mdxSource,
		},
	}
}

export default DocsIndex
