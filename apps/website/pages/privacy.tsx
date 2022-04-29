import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { NextSeo } from 'next-seo'
import { SinglePageDocs } from 'components/pages/single-page-docs'
import { MdxTheme } from 'components/mdx-theme'
import docsGlobalStyles from './docs/docs.styles'

const DocsIndex = ({ mdxSource }) => {
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
			<SinglePageDocs>
				<MdxTheme mdxSource={mdxSource} />
			</SinglePageDocs>
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
