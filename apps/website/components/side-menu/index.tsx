/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import {
	ChevronUpIcon,
	ChevronDownIcon,
	CheckIcon,
	SunIcon,
	MoonIcon,
	BoltIcon,
	DocumentIcon,
	CodeBracketSquareIcon,
	ComputerDesktopIcon,
} from '@heroicons/react/24/solid'
import { AnimatePresence, m as motion, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Docs } from '../../types'

const transformMenu = (menu: any) =>
	Object.entries(menu).reduce((acc, [k, v]) => {
		const isMenuItem = typeof v === 'object'
		return {
			...acc,
			...(isMenuItem ? { [k]: v } : {}),
		}
	}, {})

export const Accordion = ({ i, expanded, setExpanded, menu }) => {
	const isOpen = expanded.includes(i)
	const transformedMenu = transformMenu(menu)
	const hasSubMenu = Object.keys(transformedMenu).length > 0

	const handleClickMenuItem = (_i: string) => {
		setExpanded((prev: Array<string>) => (isOpen ? prev.filter((item: string) => item !== _i) : [...prev, _i]))
	}

	const title = (
		<span className="flex items-center pt-3 pb-3">
			<span className="ml-2 fill-purple-800 dark:fill-purple-500">
				{(() => {
					switch (i) {
						case 'introduction':
							return <BoltIcon className="h-4 w-4 fill-inherit" />
						case 'api':
							return <CodeBracketSquareIcon className="h-4 w-4 fill-inherit" />
						case 'demo':
							return <ComputerDesktopIcon className="h-4 w-4 fill-inherit" />
						default:
							return <DocumentIcon className="h-4 w-4 fill-inherit" />
					}
				})()}
			</span>
			<span className="font-medium ml-2 text-neutral-500 dark:text-violet-200">{menu.title}</span>
		</span>
	)

	return (
		<ul>
			<motion.li initial={false}>
				{menu.slug ? (
					<a
						className="rounded transition-all hover:bg-violet-200/30 dark:hover:bg-violet-200/10"
						href={`/docs/${menu.slug}`}
					>
						{title}
						{hasSubMenu ? (
							<button
								className="z3-docs-menu__toggle-btn rounded hover:bg-slate-500/20 focus:outline-none focus:ring focus:ring-violet-300 transition-all"
								type="button"
								onClick={e => {
									e.preventDefault()
									handleClickMenuItem(i)
								}}
							>
								<ChevronDownIcon className="h-4 w-4 fill-purple-800 dark:fill-purple-500" />
							</button>
						) : null}
					</a>
				) : (
					{ title }
				)}
			</motion.li>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						className="z3-docs-menu__wrapper"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					>
						{Object.entries(transformedMenu).map(([key, subMenu]) => (
							<Accordion key={key} i={key} expanded={expanded} setExpanded={setExpanded} menu={subMenu} />
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</ul>
	)
}

export const SideMenu: React.FC<Docs> = ({ docs }) => {
	const [expanded, setExpanded] = useState<Array<string>>([])

	return (
		<div className="z3-docs-menu">
			{Object.entries(docs).map(([key, menu]) => (
				<Accordion key={key} i={key} expanded={expanded} setExpanded={setExpanded} menu={menu} />
			))}
		</div>
	)
}
