/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import LogoTest from '@/components/logo-test'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './landing-page.css'

// eslint-disable-next-line arrow-body-style
export const LandingPage: React.FC = () => {
	return (
		<Box className={styles.landingWrapper}>
			<Box className={styles.landingBodyWrapper}>
				<ContentContainer>
					<Box>
						<LogoTest />
						{Array.from({ length: 10 }, (_, i) => (
							<Box display="flex" flexDirection="column" key={i}>
								<Text size="large">Landing page content here</Text>
							</Box>
						))}
						<LogoTest />
					</Box>
				</ContentContainer>
			</Box>
			<Footer />
		</Box>
	)
}
