import { IndexPage } from '@/components/layouts/index-page'
import Head from 'next/head'
import React from 'react'

// import { LazyMotion } from 'ui/src/components/lazy-motion'

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
		<IndexPage />
	</>
)

export default App
