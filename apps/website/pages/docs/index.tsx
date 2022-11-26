import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { NextSeo } from 'next-seo'
import { PageDocs } from 'components/pages/page-docs'
import { config } from 'config'
import { DocsPageProps } from 'types'

const META = '_meta.json'
const DOCS_FOLDER = 'docs'

const getAllFiles = (dirPath: string, map: object = {}, folderPath: string = '') => {
	const files = fs.readdirSync(dirPath)
	let fileMap = {
		...map,
	}
	files.forEach(file => {
		const p = `${dirPath}/${file}`
		if (fs.statSync(p).isDirectory()) {
			fileMap = {
				...fileMap,
				...getAllFiles(`${dirPath}/${file}`, fileMap, p),
			}
		} else if (file === META) {
			const metaObj = JSON.parse(fs.readFileSync(path.join(p), 'utf-8'))
			const isFileInFolder = folderPath.length > 0
			const pathArr = (folderPath || '')
				.replace(DOCS_FOLDER, '')
				.split('/')
				.filter(a => a !== '')
			const pathLength = pathArr.length
			const folderName = pathArr[pathArr.length - 1]
			const folderParent = pathArr?.[pathArr.length - 2]
			const menu = Object.entries(metaObj).reduce(
				(acc, [slug, title]) => ({
					...acc,
					[slug]: { title, slug },
				}),
				{},
			)
			fileMap = {
				...fileMap,
				...(isFileInFolder
					? {
						...(pathLength === 1
							? { [folderName]: { ...fileMap?.[folderName], ...menu } }
							: {
								...{
									[folderParent]: {
										...fileMap[folderParent],
										[folderName]: {
											...fileMap[folderParent][folderName],
											...menu,
										},
									},
								},
							}),
					}
					: { ...menu }),
			}

			// TODO, do we need this ?
			// arrayOfFiles.push(path.join(__dirname, dirPath, '/', file))
		}
	})

	return fileMap
}

export const DocsIndex: React.FC<DocsPageProps> = ({ docs, mdxSource }) => (
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
		<PageDocs docs={docs} mdxSource={mdxSource} />
	</>
)

export const getStaticProps = async () => {
	const docs = getAllFiles(DOCS_FOLDER, [])

	// files.forEach(file => {
	// 	console.log('file:', file)
	// })

	// const docs = files.map(filename => {
	// 	const markdownWithMeta = fs.readFileSync(path.join('docs', filename), 'utf-8')
	// 	const { data: frontMatter } = matter(markdownWithMeta)
	//
	// 	return {
	// 		frontMatter,
	// 		slug: filename.split('.')[0],
	// 	}
	// })

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
