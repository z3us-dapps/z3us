import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { Z3usText } from 'ui/src/components/z3us-text'

import './navigation.css'

const menuItems = ['Lorem', 'ipsum', 'dolor', 'sit']

const MenuItem = ({ text, selected, onClick }) => (
	<motion.div className="menu-item" onClick={onClick} animate={{ opacity: selected ? 1 : 0.5 }}>
		{text}
		{selected && <motion.div className="underline" layoutId="underline" />}
	</motion.div>
)

export const Navigation: React.FC = () => {
	const [selected, setSelected] = useState<number>(0)
	return (
		<nav className="z3-c-accounts_navigation">
			<Link to="/accounts/all">
				Z3
				{/* <Z3usText className="z3-c-accounts_navigation__logo" /> */}
			</Link>
			<ul>
				<li>
					<Link to="/accounts/all">Accounts</Link>
				</li>
				{/* <li className="opacity-50"> */}
				{/* 	<Link to="/accounts/acc-877">Account id</Link> */}
				{/* </li> */}
				{/* <li className="opacity-50"> */}
				{/* 	<Link to="/accounts/acc-877/xrd">Account id token</Link> */}
				{/* </li> */}
				<li>
					<Link to="/accounts/transfer">Transfer</Link>
				</li>
				<li>
					<Link to="/accounts/staking">Staking</Link>
				</li>
				<li>
					<Link to="/accounts/swap">Swap</Link>
				</li>
				<li>
					<Link to="/accounts/settings">Settings</Link>
				</li>
			</ul>
			<div className="underlined-menu">
				<div className="wrapper">
					<AnimateSharedLayout>
						{menuItems.map((el, i) => (
							<MenuItem text={el} key={i} selected={selected === i} onClick={() => setSelected(i)} />
						))}
					</AnimateSharedLayout>
				</div>
			</div>
		</nav>
	)
}
