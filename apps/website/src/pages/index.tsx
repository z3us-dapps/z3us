/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/components/header'
import { IndexPage } from '@/components/layouts/index-page'
import { LandingPage } from '@/components/layouts/landing-page'
import { LazyMotion } from '@/components/lazy-motion'
import * as styles from '@/styles/home-page.css'
import { AnimatePresence, m as motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect, useLocation } from 'react-router-dom'

const App = () => (
	<>
		<Head>
			{/* TODO: favicon z3us.com */}
			{/* TODO: meta description for z3us.com */}
			<title>iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple</title>
			<meta
				name="description"
				content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
				key="home-page"
			/>
			<meta property="og:description" content="And a social description for our cool page" />
			<meta property="og:image" content="https://example.com/images/cool-page.jpg" />
		</Head>
		<LazyMotion>
			<Router>
				<IndexPage />
			</Router>
		</LazyMotion>
	</>
)

export default App
