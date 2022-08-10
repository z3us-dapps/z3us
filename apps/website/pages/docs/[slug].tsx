import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo'
import { PageDocs } from 'components/pages/page-docs'
import { config } from 'config'
import docsGlobalStyles from './docs.styles'

const PostPage = ({ docs, mdxSource }) => {
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
							url: `${config.Z3US_URL}/images/og-image-1.png`,
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: `${config.Z3US_URL}/images/og-image-2.png`,
							width: 800,
							height: 600,
							alt: 'Og Image Alt 2',
						},
					],
				}}
			/>
			<PageDocs docs={docs} mdxSource={mdxSource} />
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
	const markdownWithMeta = fs.readFileSync(path.join('docs', `${slug}.mdx`), 'utf-8')
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
