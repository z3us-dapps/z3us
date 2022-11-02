/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import { AnimatePresence, m as motion, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Docs } from 'types'

const menu = {
	data_platform: { title: 'Data platform', link: '/' },
	another: {
		title: 'another platform',
		link: '/',
		subLinks: {
			hooo: {
				title: 'hooo',
				link: '/',
				menuLinks: {
					geeb: { title: 'geeb', link: '/' },
				},
			},
			wooo: {
				title: 'wooo',
				link: '/',
				menuLinks: {
					geeb: { title: 'geeb', link: '/' },
				},
			},
		},
	},
}

export const mobileMenu = {
	product: { title: 'Product', menuLinks: menu },
	pricing: { title: 'Pricing', menuLinks: menu },
	templates: { title: 'Templates', menuLinks: menu },
	integrations: { title: 'Integrations', menuLinks: menu },
	resources: { title: 'Resources', menuLinks: menu },
	about: { title: 'About', menuLinks: menu },
}

export const MenuContent = ({ menuLinks }) => {
	const [expanded, setExpanded] = useState(null)

	return (
		<motion.ul
			initial="collapsed"
			animate="open"
			exit="collapsed"
			variants={{
				collapsed: {
					opacity: 0,
					transition: { delay: 0.2, duration: 0.3 },
				},
				open: {
					opacity: 1,
				},
			}}
		>
			{Object.entries(menuLinks).map(([key, { title, link, subLinks }]) => (
				<Box key={key} as="li">
					{title}
					{!!subLinks ? (
						<>
							{Object.entries(subLinks).map(([key, menu]) => (
								<Accordion key={key} i={key} expanded={expanded} setExpanded={setExpanded} menu={menu} />
							))}
						</>
					) : null}
				</Box>
			))}
		</motion.ul>
	)
}

export const Accordion = ({ i, expanded, setExpanded, menu }) => {
	const isOpen = i === expanded

	// By using `AnimatePresence` to mount and unmount the contents, we can animate
	// them in and out while also only rendering the contents of open accordions
	return (
		<>
			<motion.header initial={false} onClick={() => setExpanded(isOpen ? false : i)} className="bg-slate-200 h-8">
				<Text>{menu.title}</Text>
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
						<MenuContent menuLinks={menu.menuLinks} />
					</motion.section>
				)}
			</AnimatePresence>
		</>
	)
}

export const SideMenu: React.FC<Docs> = ({ docs }) => {
	const [expanded, setExpanded] = useState(null)

	return (
		<div className="docs-menu">
			<a href="" className="pb-4">
				Getting Started
			</a>
			{/* <ul> */}
			{/* 	<li> */}
			{/* 		<a href="">Add to Existing Project</a> */}
			{/* 	</li> */}
			{/* 	<li> */}
			{/* 		<a href="">Create a New Monorepo</a> */}
			{/* 	</li> */}
			{/* 	<li> */}
			{/* 		<a href="">Sharing code</a> */}
			{/* 		<ul> */}
			{/* 			<li> */}
			{/* 				<a href="">Internal packages</a> */}
			{/* 			</li> */}
			{/* 		</ul> */}
			{/* 	</li> */}
			{/* </ul> */}

			{Object.entries(mobileMenu).map(([key, menu]) => (
				<Accordion key={key} i={key} expanded={expanded} setExpanded={setExpanded} menu={menu} />
			))}
		</div>
	)
}
