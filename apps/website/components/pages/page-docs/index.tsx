/* eslint-disable */
import React from 'react'
import { MdxTheme } from 'components/mdx-theme'
import { LazyMotion } from 'components/lazy-motion'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { PageContainer } from 'components/page-container'
// import { SideMenu } from 'components/side-menu'
import { DocsPageProps } from 'types'

export const PageDocs: React.FC<DocsPageProps> = ({ mdxSource }) => (
	<LazyMotion>
		<div className="docs">
			<Header className="relative transition-colors fill-black dark:fill-white" />
			<PageContainer>
				<div>
					<div>
						<MdxTheme mdxSource={mdxSource} />
					</div>
				</div>
			</PageContainer>
			<Footer className="pt-2 pb-4 sm:pb-8 sm:pt-8" />
		</div>
	</LazyMotion>
)
