/* eslint-disable */
import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { NextSeo } from 'next-seo'
import { PageDocs } from 'components/pages/page-docs'
import { config } from 'config'
import { mdxOptions, getTableOfContents, getAllFiles } from '../../docs/utils'

const DOCS_FOLDER = 'docs'

const PostPage = ({ docs, toc, mdxSource }) => {
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
			<PageDocs toc={toc} docs={docs} mdxSource={mdxSource} />
		</>
	)
}

export default PostPage

const getFileList = async (dirName: string) => {
	let files = []
	const items = await fs.promises.readdir(dirName, { withFileTypes: true })

	for (const item of items) {
		if (item.isDirectory()) {
			files = [...files, ...(await getFileList(`${dirName}/${item.name}`))]
		} else {
			files.push(`${dirName}/${item.name}`)
		}
	}

	return files
}

export const getStaticPaths = async () => {
	const files = await getFileList(DOCS_FOLDER)
	const paths = files.filter(s => s.includes('.mdx')).map(filename => `/${filename.replace('.mdx', '')}`)

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async ({ params: { slug } }) => {
	// console.log('slug:', slug)
	const docPath = slug.join('/')
	// console.log('docPath:', `/docs/${docPath}.mdx`)
	const docs = getAllFiles(DOCS_FOLDER, [])
	// const markdownWithMeta = fs.readFileSync(`/docs/${docPath}.mdx`, 'utf-8')
	const markdownWithMeta = fs.readFileSync(path.join('docs', `${docPath}.mdx`), 'utf-8')
	// console.log('markdownWithMeta:', markdownWithMeta)
	const { content } = matter(markdownWithMeta)
	const toc = getTableOfContents(content)
	const mdxSource = await serialize(content, {
		scope: {},
		mdxOptions: {
			remarkPlugins: [],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrettyCode, mdxOptions]],
			format: 'mdx',
		},
		parseFrontmatter: false,
	})

	return {
		props: {
			docs,
			toc,
			mdxSource,
		},
	}
}
