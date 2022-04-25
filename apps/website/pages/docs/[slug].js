/* eslint-disable */
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo'
import { Text, Box, Flex, StyledLink } from 'ui/src/components/atoms'
import { Container, Grid } from '@nextui-org/react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { SideMenu } from '../../components/side-menu'
import { MdxTheme } from '../../components/mdx-theme'
import docsGlobalStyles from './docs.styles'

const PostPage = ({ docs, frontMatter: { title, date }, mdxSource }) => {
	docsGlobalStyles()
	return (
		<>
			<NextSeo
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

				<Box css={{ flex: '1' }}>
					<Container gap={0}>
						<Grid.Container gap={0}>
							<Grid xs={3}>
								<SideMenu docs={docs} />
							</Grid>
							<Grid xs={6}>
								<Box css={{ width: '100%', pb: '100px' }}>
									<MdxTheme mdxSource={mdxSource} />
								</Box>
							</Grid>
							<Grid xs={3}>
								<Flex justify="end" css={{ width: '100%', pr: '$3' }}></Flex>
							</Grid>
						</Grid.Container>
					</Container>
				</Box>

				<Footer />
			</Flex>
		</>
	)
}

const getStaticPaths = async () => {
	const files = fs.readdirSync(path.join('docs'))
	const paths = files.map(filename => ({
		params: {
			slug: filename.replace('.mdx', ''),
		},
	}))

	return {
		paths,
		fallback: false,
	}
}

const getStaticProps = async ({ params: { slug } }) => {
	const files = fs.readdirSync(path.join('docs'))
	const docs = files.map(filename => {
		const markdownWithMeta = fs.readFileSync(path.join('docs', filename), 'utf-8')
		const { data: frontMatter } = matter(markdownWithMeta)

		return {
			frontMatter,
			slug: filename.split('.')[0],
		}
	})
	const markdownWithMeta = fs.readFileSync(path.join('docs', slug + '.mdx'), 'utf-8')
	const { data: frontMatter, content } = matter(markdownWithMeta)
	const mdxSource = await serialize(content)

	return {
		props: {
			docs,
			frontMatter,
			slug,
			mdxSource,
		},
	}
}

export { getStaticProps, getStaticPaths }
export default PostPage
