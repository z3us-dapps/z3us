'use client'

// import { block } from "million/react";
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './landing-page.css'

// eslint-disable-next-line arrow-body-style
export const LandingPage: React.FC = () => {
	return (
		<Box className={styles.landingWrapper}>
			<Box>
				<Text>landing</Text>
				<Text>landing</Text>
			</Box>
		</Box>
	)
}
