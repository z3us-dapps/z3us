import { Footer } from 'components/footer'
import { Header } from 'components/header'
import { LazyMotion } from 'components/lazy-motion'
import { MdxTheme } from 'components/mdx-theme'
import { SideMenu } from 'components/side-menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { DocsPageProps } from 'types'

export const PageDocs: React.FC<DocsPageProps> = ({ toc, docs, mdxSource }) => {
	const router = useRouter()
	const [hash, setHash] = useState<string>('')
	useEffect(() => {
		setHash(`#${router.asPath.split('#')?.[1]}`)
	}, [router.asPath])

	return (
		<LazyMotion>
			<div className="z3-l-docs-wrapper">
				<Header className="dark:fill-white" />
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
										<Link href={link} passHref>
											<a
												className={`hover:underline decoration-from-font underline-offset-4 ${
													link === hash ? 'underline' : ''
												}`}
											>
												{title}
											</a>
										</Link>
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
