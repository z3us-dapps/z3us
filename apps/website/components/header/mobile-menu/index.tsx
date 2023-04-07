import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { Button } from 'components/button'
import { config } from 'config'
// import useScrollBlock from 'hooks/use-scroll-block'
import { AnimatePresence, m as motion, useCycle } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const links = [
	{ name: 'Home', to: '/', id: 'home' },
	{ name: 'Feedback', to: config.HELLO_NEXT_FEEDBACK_URL, id: 'feedback' },
	{ name: 'Roadmap', to: '/roadmap', id: 'roadmap' },
	{
		name: 'Docs',
		to: '/docs',
		id: 'docs',
		subMenu: [
			{ name: 'API Reference', to: '/docs/api', id: 'api-reference' },
			{ name: 'API V1', to: '/docs/api/api-v1', id: 'api-v1' },
			{ name: 'Demo', to: '/docs/demo', id: 'api-demo' },
		],
	},
	{ name: 'Github', to: config.GITHUB_URL, id: 'github' },
	{ name: 'Twitter', to: config.TWITTER_URL, id: 'twitter' },
	{ name: 'Telegram', to: config.TELEGRAM_URL, id: 'telegram' },
]

const itemVariants = {
	closed: {
		opacity: 0,
	},
	open: { opacity: 1 },
}

const sideVariants = {
	closed: {
		transition: {
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			staggerChildren: 0.05,
			staggerDirection: 1,
		},
	},
}

export const MobileMenu = (): JSX.Element => {
	const { asPath } = useRouter()
	// TODO: investigate scroll lock
	// const [blockScroll, allowScroll] = useScrollBlock()
	const [open, cycleOpen] = useCycle(false, true)
	const isDocsRoute = asPath.includes('/docs')

	const handleMenuClick = () => {
		if (open) {
			cycleOpen(0)
			// allowScroll()
		} else {
			// blockScroll()
			cycleOpen(1)
		}
	}

	const handleLinkClick = () => {
		cycleOpen(0)
		// allowScroll()
	}

	return (
		<>
			<Button size="sm" variant="ghost" className="md:hidden w-8 h-8 relative z-30" onClick={handleMenuClick}>
				<span className="flex items-center justify-center w-10 h-10">
					<span className="transition-opacity absolute" style={{ opacity: open ? '0' : '1' }}>
						<Bars4Icon className="block h-5 w-5" />
					</span>
					<span className="transition-opacity absolute" style={{ opacity: open ? '1' : '0' }}>
						<XMarkIcon className="block h-5 w-5" />
					</span>
				</span>
			</Button>
			<AnimatePresence>
				{/* TODO: backdrop-blur-md does not work, aside will need to be portalled to different area of dom  */}
				{open && (
					<motion.aside
						className="fixed top-0 left-0 w-screen h-screen bg-purple-900/90 backdrop-blur-md"
						initial={{ width: 0 }}
						animate={{
							width: '100%',
						}}
						transition={{ ease: 'easeOut', duration: 0.2 }}
						exit={{
							width: 0,
							transition: { delay: 0.25, duration: 0.2 },
						}}
					>
						<motion.ul
							className="mt-14 p-5 flex flex-col gap-5"
							initial="closed"
							animate="open"
							exit="closed"
							variants={sideVariants}
						>
							{links.map(({ name, to, id, subMenu }) => (
								<motion.li key={id} variants={itemVariants}>
									<Link href={to} passHref>
										<a
											role="link"
											tabIndex={0}
											className="text-2xl font-medium"
											onClick={handleLinkClick}
											onKeyDown={handleLinkClick}
										>
											{name}
										</a>
									</Link>
									{subMenu ? (
										<ul className={`pl-3 pt-4 flex-col gap-4 ${isDocsRoute ? 'flex' : 'hidden'}`}>
											{subMenu.map(({ id: subId, to: subTo, name: subName }) => (
												<li key={subId}>
													<Link href={subTo} passHref>
														<a
															role="link"
															tabIndex={0}
															className="text-xl font-medium"
															onKeyDown={handleLinkClick}
															onClick={handleLinkClick}
														>
															{subName}
														</a>
													</Link>
												</li>
											))}
										</ul>
									) : null}
								</motion.li>
							))}
						</motion.ul>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	)
}
