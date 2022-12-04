import fs from 'fs'
import path from 'path'
import { type Options } from 'rehype-pretty-code'
import { slug as githubSlugger } from 'github-slugger'

const META = '_meta.json'
const DOCS_FOLDER = 'docs'

export const mdxOptions: Partial<Options> = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  onVisitLine(node) {
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

export const getTableOfContents = (content: any) => {
  // const regexp = new RegExp(/^(#### |### |## )(.*)\n/, 'gm')
  const regexp = /^(#### |### |## )(.*)\n/gm
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

export const getAllFiles = (dirPath: string, map: object = {}, folderPath: string = '') => {
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
          [slug]: { title, slug: `${folderName ? `${folderName}/` : ''}${slug}` },
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
    }
  })

  return fileMap
}
