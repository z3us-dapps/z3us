/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Button } from 'components/button'
import Link from 'next/link'
import useScrollBlock from 'hooks/use-scroll-block'
import { m as motion, useScroll, useTransform, AnimatePresence, useCycle } from 'framer-motion'
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { Text, Box, MotionBox, StyledLink } from 'ui/src/components/atoms'
import { config } from 'config'

const backlinks = [
	{ name: 'Home', to: '/', id: 'home' },
	{
		name: 'Docs',
		to: '/docs',
		id: 'docs',
		subMenu: [
			{ name: 'API Reference', to: '/docs/api-reference', id: 'api-reference' },
			{ name: 'API V1', to: '/docs/api-v1', id: 'api-v1' },
			{ name: 'Demo', to: '/docs/api-demo', id: 'api-demo' },
			// { name: 'Babylon PTE', to: '/docs/api-pte', id: 'api-pte' },
		],
	},
	{ name: 'Github', to: config.GITHUB_URL, id: 'github' },
	{ name: 'Twitter', to: config.TWITTER_URL, id: 'twitter' },
	{ name: 'Telegram', to: config.TELEGRAM_URL, id: 'telegram' },
	{ name: 'Discord', to: config.DISCORD_URL, id: 'discord' },
]

const links = [
	{ name: 'Home', to: '/', id: 1 },
	{ name: 'Roadmap', to: '/roadmap', id: 2 },
	{ name: 'Tokenomics', to: '/tokenomics', id: 3 },
	{ name: 'Docs', to: '/docs', id: 4 },
]

interface IProps {
	isScrolled: boolean
}

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

export const MobileMenu = ({ isScrolled }: IProps): JSX.Element => {
	const [blockScroll, allowScroll] = useScrollBlock()
	const [open, cycleOpen] = useCycle(false, true)

	const handleMenuClick = () => {
		if (open) {
			cycleOpen(0)
			allowScroll()
		} else {
			blockScroll()
			cycleOpen(1)
		}
	}

	const handleLinkClick = () => {
		cycleOpen(0)
		allowScroll()
	}

	return (
		<>
			<Button size="sm" variant="ghost" className="md:hidden w-10 h-10 relative z-30" onClick={handleMenuClick}>
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
				{open && (
					<motion.aside
						className="fixed top-0 left-0 w-screen h-screen bg-violet-900 bg-opacity-90 dark:bg-stone-900 dark:bg-opacity-95 backdrop-blur-md"
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
							{links.map(({ name, to, id }) => (
								<motion.li key={id} variants={itemVariants}>
									<Link href={to} passHref>
										<a className="text-3xl font-medium" onClick={handleLinkClick}>
											{name}
										</a>
									</Link>
								</motion.li>
							))}
						</motion.ul>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	)
}
