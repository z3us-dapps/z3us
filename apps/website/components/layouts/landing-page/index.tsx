'use client'

// import { block } from "million/react";
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './landing-page.css'

// eslint-disable-next-line arrow-body-style
export const LandingPage: React.FC = () => {
	return (
		// eslint-disable-next-line react/button-has-type
		<Box className={styles.landingWrapper}>
			<Box>
				<Text>landing</Text>
			</Box>
		</Box>
	)
}
