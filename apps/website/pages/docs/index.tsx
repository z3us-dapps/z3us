import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { slug as githubSlugger } from 'github-slugger'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import React from 'react'
import { NextSeo } from 'next-seo'
import { PageDocs } from 'components/pages/page-docs'
import { config } from 'config'
import { DocsPageProps } from 'types'

const options = {
  // theme: 'one-dark-pro',
  // theme: 'github-light',
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
}

const META = '_meta.json'
const DOCS_FOLDER = 'docs'

export const getTableOfContents = (content: any) => {
  const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm')
  const headings = [...content.matchAll(regexp)]

  let tableOfContents = []

  if (headings.length) {
    tableOfContents = headings.map(heading => {
      const headingText = heading[2].trim()
      let headingType = heading[1].trim() === '##' ? 'h2' : 'h3'

      switch (heading[1]?.trim()) {
        case '##':
          headingType = 'h2'
          break
        case '###':
          headingType = 'h3'
          break
        case '####':
          headingType = 'h4'
          break
        case '#####':
          headingType = 'h5'
          break
        case 'Mangoes':
          break
        default:
          break
      }

      const headingLink = githubSlugger(`z3-${headingText}`)

      return {
        title: headingText,
        link: `#${headingLink}`,
        headingType,
      }
    })
  }

  return tableOfContents
}

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
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrettyCode, options]],
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
