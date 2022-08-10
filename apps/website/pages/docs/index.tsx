import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { NextSeo } from 'next-seo'
import { PageDocs } from 'components/pages/page-docs'
import { config } from 'config'
import { DocsPageProps } from 'types'
import docsGlobalStyles from './docs.styles'

export const DocsIndex: React.FC<DocsPageProps> = ({ docs, mdxSource }) => {
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
