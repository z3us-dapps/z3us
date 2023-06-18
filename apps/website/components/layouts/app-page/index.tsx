/* eslint-disable @typescript-eslint/no-unused-vars */
import NextLink from 'next/link'
import React from 'react'
import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './app-page.css'

// eslint-disable-next-line arrow-body-style
export const AppPage: React.FC = () => {
	return (
		// eslint-disable-next-line react/button-has-type
		<Box className={styles.landingWrapper}>
			<Box component="ul" display="flex" gap="medium">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/topics">Topics</Link>
				</li>
				<li>
					<NextLink href="/settings">Settings (SSR)</NextLink>
				</li>
				<li>
					<NextLink href="/terms">Terms (SSR)</NextLink>
				</li>
			</Box>
			<Routes>
				<Route path="/about" element={<h1>About</h1>} />
				<Route path="/topics" element={<h1>Topics</h1>} />
				<Route path="/" element={<h1>Home</h1>} />
			</Routes>
		</Box>
	)
}
