/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
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
	// By using `AnimatePresence` to mount and unmount the contents, we can animate
	// them in and out while also only rendering the contents of open accordions

	const handleClickMenuItem = () => {
		if (isOpen) {
			setExpanded((prev: Array<string>) => prev.filter((item: string) => item !== i))
		} else {
			setExpanded((prev: Array<string>) => [...prev, i])
		}
	}

	return (
		<>
			<motion.header initial={false} onClick={handleClickMenuItem} className="bg-slate-200 h-8">
				{menu.slug ? (
					<a href={`/docs/${menu.slug}`} style={{ border: '1px solid red', display: 'inline-flex' }}>
						<Text>{menu.title}</Text>
					</a>
				) : (
					<Text>{menu.title}</Text>
				)}
			</motion.header>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.section
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 1, height: 0 },
						}}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					>
						{Object.entries(transformMenu(menu)).map(([key, subMenu]) => (
							<Accordion key={key} i={key} expanded={expanded} setExpanded={setExpanded} menu={subMenu} />
						))}
					</motion.section>
				)}
			</AnimatePresence>
		</>
	)
}

export const SideMenu: React.FC<Docs> = ({ docs }) => {
	const [expanded, setExpanded] = useState<Array<string>>([])

	return (
		<div className="docs-menu">
			{Object.entries(docs).map(([key, menu]) => (
				<Accordion key={key} i={key} expanded={expanded} setExpanded={setExpanded} menu={menu} />
			))}
		</div>
	)
}
