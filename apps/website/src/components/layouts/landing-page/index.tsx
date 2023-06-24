'use client'

// import { block } from "million/react";
import { ContentContainer } from '@/components/content-container'
import { useTheme } from 'next-themes'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'

import * as styles from './landing-page.css'

// eslint-disable-next-line arrow-body-style
export const LandingPage: React.FC = () => {
	const { setTheme } = useTheme()

	return (
		<Box className={styles.landingWrapper}>
			<ContentContainer>
				<Box>
					<Text>landing</Text>
					<Text>landing</Text>
					<Box display="flex" gap="small">
						<h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">Theme</h2>
						<Button onClick={() => setTheme('light')}>Theme light</Button>
						<Button onClick={() => setTheme('dark')}>Theme dark</Button>
						<Button onClick={() => setTheme('system')}>Theme system</Button>
					</Box>
				</Box>
			</ContentContainer>
		</Box>
	)
}
