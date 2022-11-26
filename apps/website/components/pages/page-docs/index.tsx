import React from 'react'
import { MdxTheme } from 'components/mdx-theme'
import { LazyMotion } from 'components/lazy-motion'
import { Header } from 'components/header'
import { ButtonCVA } from 'components/button-cva'
import { Footer } from 'components/footer'
import { PageContainer } from 'components/page-container'
import { SideMenu } from 'components/side-menu'
import { DocsPageProps } from 'types'

export const PageDocs: React.FC<DocsPageProps> = ({ docs, mdxSource }) => {
	console.log('docs:', docs)
	return (
		<LazyMotion>
			<div className="z3-l-docs-wrapper">
				<div className="z3-l-docs-header">
					<div className="z3-l-docs-container">container header</div>
				</div>
				<div className="z3-l-docs-container">
					<div className="z3-l-docs-page">
						<aside className="z3-l-docs-page__menu">
							<SideMenu docs={docs} />
						</aside>

						<article className="z3-l-docs-page__content">
							<main>
								<MdxTheme mdxSource={mdxSource} />
							</main>
						</article>

						<div className="z3-l-docs-page__toc">
							<p>on page links</p>
							<div>
								{/* <ButtonCVA intent="secondary" size="small" className="geebs"> */}
								{/* 	Button CVA */}
								{/* </ButtonCVA> */}
								{/* <p>On this page</p> */}
								{/* <ul> */}
								{/* 	<li> */}
								{/* 		<a href="#quickstart">Quickstart</a> */}
								{/* 	</li> */}
								{/* </ul> */}
							</div>
						</div>
					</div>
				</div>
				<div className="z3-l-docs-footer">
					<div className="z3-l-docs-container">footer content </div>
				</div>
			</div>
		</LazyMotion>
	)
}
