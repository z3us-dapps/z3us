import React, { useState, useEffect, useRef } from 'react'
import { MdxTheme } from 'components/mdx-theme'
import { LazyMotion } from 'components/lazy-motion'
import { Header } from 'components/header'
import { ButtonCVA } from 'components/button-cva'
import { Footer } from 'components/footer'
import { PageContainer } from 'components/page-container'
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
							<ul>
								{toc.map(({ link, title }) => (
									<li key={link}>
										<a href={link}>{title}</a>
									</li>
								))}
							</ul>
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
