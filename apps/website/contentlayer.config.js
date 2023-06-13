import fs from "fs"
import path from "path"
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files"
// import rehypeAutolinkHeadings from "rehype-autolink-headings"
// import rehypePrettyCode from "rehype-pretty-code"
// import rehypeSlug from "rehype-slug"
// import { codeImport } from "remark-code-import"
// import remarkGfm from "remark-gfm"
// import { getHighlighter, loadTheme } from "shiki"
// import { visit } from "unist-util-visit"

// import { rehypeComponent } from "./lib/rehype-component"
// import { rehypeNpmCommand } from "./lib/rehype-npm-command"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

const RadixProperties = defineNestedType(() => ({
  name: "RadixProperties",
  fields: {
    link: {
      type: "string",
    },
    api: {
      type: "string",
    },
  },
}))

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    radix: {
      type: "nested",
      of: RadixProperties,
    },
    featured: {
      type: "boolean",
      default: false,
      required: false,
    },
    component: {
      type: "boolean",
      default: false,
      required: false,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Doc],
  mdx: {
  },
})
