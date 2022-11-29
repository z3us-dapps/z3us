import React, { useState, useEffect, useRef } from 'react'
import { MdxTheme } from 'components/mdx-theme'
import { LazyMotion } from 'components/lazy-motion'
import { Header } from 'components/header'
// import { ButtonCVA } from 'components/button-cva'
import { Footer } from 'components/footer'
import { SideMenu } from 'components/side-menu'
import { DocsPageProps } from 'types'

export const PageDocs: React.FC<DocsPageProps> = ({ toc, docs, mdxSource }) => {
	useEffect(() => {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', e => {
				e.preventDefault()
				const anchorId = (anchor.getAttribute('href') || '').replace('#z3-', '')
				document.getElementById(anchorId).scrollIntoView({ behavior: 'smooth' })
			})
		})
	}, [])

	return (
		<LazyMotion>
			<div className="z3-l-docs-wrapper">
				<Header isStickyHeader isBetaButtonVisible={false} isDocsButtonVisible={false} className="dark:fill-white" />
				<div className="z3-l-docs-container z3-container">
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
							<p className="text-lg font-bold pb-3">On this page</p>
							<ul className="text-xs text-neutral-500 dark:text-neutral-300 leading-relaxed">
								{toc.map(({ link, title, headingType }) => (
									<li key={link} className={`toc-li--${headingType} mt-1 mb-1`}>
										<a href={link} className="hover:underline decoration-from-font underline-offset-4">
											{title}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="z3-l-docs-footer">
					<Footer />
				</div>
			</div>
		</LazyMotion>
	)
}
