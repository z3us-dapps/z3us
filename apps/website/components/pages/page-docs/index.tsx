/* eslint-disable */
import React from 'react'
import { MdxTheme } from 'components/mdx-theme'
import { LazyMotion } from 'components/lazy-motion'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { PageContainer } from 'components/page-container'
// import { SideMenu } from 'components/side-menu'
import { DocsPageProps } from 'types'

export const PageDocs: React.FC<DocsPageProps> = ({ docs, mdxSource }) => (
	<LazyMotion>
		<div className="docs text-white dark:text-white fill-white dark:fill-white overflow-hidden">
			<Header className="relative text-white" />
			<PageContainer>
				<div>
					<div>
						<MdxTheme mdxSource={mdxSource} />
					</div>
				</div>
			</PageContainer>
			<Footer className="text-white pt-2 pb-4 sm:pb-8 sm:pt-8" />
		</div>
	</LazyMotion>
)
