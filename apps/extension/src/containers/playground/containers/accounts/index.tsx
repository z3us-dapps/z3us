import React from 'react'
import { Link, useLocation, useRouter } from 'wouter'
import { useIsMobileWidth } from '@src/hooks/use-is-mobile'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from './components/navigation'
import './accounts.css'

const Home = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400">home</div>
		<h2>Home</h2>
	</div>
)

const Staking = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400">home</div>
		<h2>Home</h2>
	</div>
)

export const Accounts: React.FC = () => {
	const [location] = useLocation()
	const isMobileWidth = useIsMobileWidth()
	// const { component, desktopAnimation, mobileAnimation } = routes[location]
	// const routeAnimation = isMobileWidth ? mobileAnimation : desktopAnimation
	// const RouteComponent = component

	return (
		<div className="z3-c-accounts">
			<Navigation />
			{/* <AnimatePresence initial={false}> */}
			{/* 	<motion.div className="z3-c-accounts__routes" key={location} {...routeAnimation}> */}
			{/* 		<RouteComponent /> */}
			{/* 	</motion.div> */}
			{/* </AnimatePresence> */}
		</div>
	)
}
