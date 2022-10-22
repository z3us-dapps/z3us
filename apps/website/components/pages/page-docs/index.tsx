import React from 'react'
import { MdxTheme } from 'components/mdx-theme'
import { LazyMotion } from 'components/lazy-motion'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { PageContainer } from 'components/page-container'
import { SideMenu } from 'components/side-menu'
import { DocsPageProps } from 'types'

export const PageDocs: React.FC<DocsPageProps> = ({ docs, mdxSource }) => (
	<LazyMotion>
		<div className="docs flex flex-col">
			<Header isStickyHeader className="transition-colors fill-black dark:fill-white" />
			<PageContainer className="flex-1">
				<div className="docs-wrapper">
					<SideMenu docs={docs} />
					<div className="docs-content">
						<MdxTheme mdxSource={mdxSource} />
					</div>
				</div>
			</PageContainer>
			<Footer className="pt-2 pb-4 sm:pb-8 sm:pt-8" />
		</div>
	</LazyMotion>
)
