import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import React from 'react'
import { NextSeo } from 'next-seo'
import { PageDocs } from 'components/pages/page-docs'
import { config } from 'config'
import { DocsPageProps } from 'types'
import { mdxOptions, getTableOfContents, getAllFiles } from '../../docs/utils'

const DOCS_FOLDER = 'docs'

export const DocsIndex: React.FC<DocsPageProps> = ({ docs, toc, mdxSource }) => (
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

export const getStaticProps = async () => {
    const docs = getAllFiles(DOCS_FOLDER, [])
    const markdownWithMeta = fs.readFileSync(path.join('docs/introduction.mdx'), 'utf-8')
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

export default DocsIndex
