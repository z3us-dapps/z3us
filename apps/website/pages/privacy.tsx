import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { NextSeo } from 'next-seo'
import { SinglePageDocs } from 'components/pages/single-page-docs'
import { MdxTheme } from 'components/mdx-theme'
import { config } from 'config'
import docsGlobalStyles from './docs/docs.styles'

const PrivacyIndex = ({ mdxSource }) => {
	docsGlobalStyles()
	return (
		<>
			<NextSeo
				title="Privacy policy"
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

export default PrivacyIndex
