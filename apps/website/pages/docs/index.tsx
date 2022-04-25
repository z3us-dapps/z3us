/* eslint-disable */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Text, Box, Flex, StyledLink } from 'ui/src/components/atoms'
import { NextSeo } from 'next-seo'
import { Container, Grid } from '@nextui-org/react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { SideMenu } from '../../components/side-menu'
import { MdxTheme } from '../../components/mdx-theme'
import docsGlobalStyles from './docs.styles'

const DocsIndex = ({ docs, mdxSource }) => {
	docsGlobalStyles()
	return (
		<>
			<NextSeo
				title="Documentation | z3us"
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
						'&:before': {
							content: '',
							position: 'absolute',
							pe: 'none',
							top: '0',
							left: '0',
							right: '0',
							bottom: '0',
							//backgroundImage: 'url(/images/greek-repeat.jpeg)',
							//opacity: '0.04',
							//backgroundImage: 'url("/images/unlock-bg.jpg")',
							//backgroundSize: '100%',
						},
					}}
				>
					<Container gap={0}>
						<Grid.Container gap={0}>
							<Grid xs={3}>
								<SideMenu docs={docs} />
							</Grid>
							<Grid xs={6}>
								<Box css={{ width: '100%', pb: '100px' }}>
									{/*<Text size="10" css={{ pb: '$3' }}>
										Introduction
									</Text>*/}
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
