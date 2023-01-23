import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { useLocationKey } from '@src/containers/playground/hooks/use-location-key'
import move from 'lodash-move'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { Navigation } from './components/navigation'
import { AccountsHome } from './components/accounts-home'

import './accounts-desktop.css'

export const MOTION_VARIANTS = {
	initial: ({
		isMounted,
		isCardsHovered,
		cardsLength,
		index,
	}: {
		isMounted: boolean
		isCardsHovered: boolean
		cardsLength: number
		index: number
		direction: 'forward' | 'backward'
	}) => ({
		top: isCardsHovered ? (cardsLength - index) * 60 : (cardsLength - index) * 8,
		scale: isCardsHovered ? 1 : 1 - index * 0.1,
		zIndex: cardsLength - index,
		// transition: { type: 'spring', stiffness: 100, damping: 20, duration: 2 },
		boxShadow:
			'0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 16px 48px -8px rgba(0, 0, 0, 0.1), 0px 32px 48px rgba(0, 0, 0, 0.05)',
		transition: { duration: isMounted ? 0.4 : 0 },
	}),
	transitioning: ({
		selectedCard,
		cardsLength,
		index,
	}: {
		selectedCard: number
		cardsLength: number
		index: number
		direction: 'forward' | 'backward'
	}) => ({
		top: index < selectedCard ? (cardsLength - index) * 60 + 129 : (cardsLength - index) * 60,
		scale: index === selectedCard ? 1.05 : 1 - index * 0.03,
		boxShadow:
			index === selectedCard
				? 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
				: '0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 16px 48px -8px rgba(0, 0, 0, 0.1), 0px 32px 48px rgba(0, 0, 0, 0.05)',
		zIndex: cardsLength - index,
		// transition: { duration: 0 },
		transition: { type: 'spring', stiffness: 200, damping: 25 },
	}),
}

const NotFound404 = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100 text-6xl">Accounts 404</div>
	</div>
)

// const CARD_COLORS = ['#266678', '#cb7c7a', ' #36a18b', '#cda35f', '#747474']
const CARD_COLORS = [
	{ bgColor: '#266678', accountId: '3764374', accountName: 'geebs' },
	{ bgColor: '#cb7c7a', accountId: '3d66ffhdf', accountName: 'Numb' },
	{ bgColor: '#36a18b', accountId: '77575jgnnbh', accountName: 'hrrr' },
	{ bgColor: '#cda35f', accountId: '123hghgj', accountName: 'durr' },
	{ bgColor: '#747474', accountId: 'x773-djf', accountName: 'nnnneeebb' },
]

const AccountIndex = () => {
	const navigate = useNavigate()
	const { account, assetType, asset } = useAccountParams()
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [animate, setAnimate] = useState<string>('initial')
	const [cards, setCards] = useState<Array<any>>(CARD_COLORS)
	const [selectedCard, setSelectedCard] = useState<number>(0)
	const [isCardsHovered, setIsCardsHovered] = useState<boolean>(false)
	const cardsLength = cards.length - 1

	const handleMouseEnter = () => {
		setIsMounted(true)
		setIsCardsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsCardsHovered(false)
	}

	const handleCardClick = (_account: string) => {
		setIsMounted(true)

		navigate(`/accounts/${_account}/${assetType}`)
	}

	useEffect(() => {
		const cardIndex = cards.findIndex(_card => _card?.accountName === account)
		if (!isMounted && cardIndex >= 0) {
			setCards(move(cards, cardIndex, 0))
			setAnimate('initial')
		} else if (cardIndex >= 0) {
			setAnimate('transitioning')
			setSelectedCard(cardIndex)
			setTimeout(() => {
				setCards(move(cards, cardIndex, 0))
				setAnimate('initial')
			}, 500)
		}
	}, [account])

	return (
		<>
			{!assetType && <Navigate replace to={`/accounts/${account}/all`} />}
			<div className="flex w-full h-full">
				<div className="w-[400px] h-100">
					<p className="text-4xl">Accounts</p>
					<ul className="card-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						{cards.map(({ bgColor, accountName, accountId }, index) => {
							const canDrag = index === 0

							return (
								<motion.li
									key={accountId}
									className="card"
									style={{
										backgroundColor: bgColor,
									}}
									variants={MOTION_VARIANTS}
									animate={animate}
									custom={{ isCardsHovered, cardsLength, selectedCard, index, isMounted }}
									onClick={() => handleCardClick(accountName)}
								>
									{accountName}
								</motion.li>
							)
						})}
					</ul>
				</div>
				<div className="w-[500px] h-100 bg-vivaldi_red-200 opacity-10">
					<ul className="flex gap-2">
						<li>
							<Link to={`/accounts/${account}/all`}>all</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/tokens`}>tokens</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/nfts`}>nfts</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/lp-tokens`}>LP tokens</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/badges`}>badges</Link>
						</li>
					</ul>

					<p className="py-3 font-bold text-2xl">
						<Link to={`/accounts/${account}/${assetType}/oci`}>asset oci</Link>
					</p>

					<div className="pt-3 pl-3 font-bold text-xl">??{account ? <p>Account selected: {account}</p> : null}</div>
					<div className="pt-3 pl-3 font-bold text-xl">
						<div className="pt-3 pl-3 font-bold text-xl">
							??{assetType ? <p>asset type selected: {assetType}</p> : null}
						</div>
						??{asset ? <p>asset selected: {asset}</p> : null}
					</div>

					<ul className="flex flex-col gap-1 mt-4 pl-2">
						<li>{/* <Link to={`/${account}/asset-1`}>asset 1</Link> */}</li>
					</ul>
				</div>
				<div className="w-64 h-100 bg-vivaldi_red-300 flex-1 opacity-20">
					<p className="text-4xl">activity</p>
				</div>
			</div>
		</>
	)
}

const AccountStaking = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100">staking</div>
	</div>
)

const AccountSettings = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-300">staking</div>
	</div>
)

const AccountSwap = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-200">Swap</div>
	</div>
)

const AccountTransfer = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-200">transfer</div>
	</div>
)

// export const AccountsDesktop = ({ base }: IProps): JSX.Element => {
export const AccountsDesktop = (): JSX.Element => {
	const { location, locationKey } = useLocationKey()

	return (
		<div className="z3-c-accounts-desktop">
			<Navigation />
			<div className="z3-c-accounts-desktop__body">
				<AnimatePresence initial={false}>
					<Routes location={location} key={locationKey}>
						{['/:account', '/:account/:assetType', '/:account/:assetType/:asset'].map(path => (
							<Route
								key="Accounts" // optional: avoid full re-renders on route changes
								path={path}
								element={
									<AnimatedPage>
										<AccountsHome />
									</AnimatedPage>
								}
							/>
						))}
						<Route
							path="/transfer"
							element={
								<AnimatedPage>
									<AccountTransfer />
								</AnimatedPage>
							}
						/>
						<Route
							path="/staking"
							element={
								<AnimatedPage>
									<AccountStaking />
								</AnimatedPage>
							}
						/>
						<Route
							path="/swap"
							element={
								<AnimatedPage>
									<AccountSwap />
								</AnimatedPage>
							}
						/>
						<Route
							path="/settings"
							element={
								<AnimatedPage>
									<AccountSettings />
								</AnimatedPage>
							}
						/>
						<Route
							path="*"
							element={
								<AnimatedPage>
									<NotFound404 />
								</AnimatedPage>
							}
						/>
					</Routes>
				</AnimatePresence>
			</div>
		</div>
	)
}

AccountsDesktop.defaultProps = {
	base: '',
}
