interface FrontMatter {
	title: string
	hideFromMenu?: boolean
	order?: number
}

interface Doc {
	slug: string
	frontMatter: FrontMatter
}

export interface Docs {
	docs: Array<Doc>
}

export interface DocsPageProps {
	docs: Array<Doc>
	toc: any
	mdxSource: React.ReactNode
}
