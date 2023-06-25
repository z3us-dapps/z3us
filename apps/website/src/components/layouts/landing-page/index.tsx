/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ConnectButton } from 'ui/src/components/connect-button'
import { LoadingBarsIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './landing-page.css'

// eslint-disable-next-line arrow-body-style
export const LandingPage: React.FC = () => {
	return (
		<Box className={styles.landingWrapper}>
			<ContentContainer>
				<Header />
				<Box className={styles.landingBodyWrapper}>
					<Box>
						{Array.from({ length: 10 }, (_, i) => (
							<Box display="flex" flexDirection="column" key={i}>
								<Text size="large">Landing page content here</Text>
							</Box>
						))}
					</Box>
				</Box>
				<Footer />
			</ContentContainer>
		</Box>
	)
}
