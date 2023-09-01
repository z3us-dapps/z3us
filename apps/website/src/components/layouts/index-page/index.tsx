import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import LogoTest from '@/components/logo-test'
import { Z3usLogoLink } from '@/components/z3us-logo-link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import NextLink from 'next/link'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { Z3usLogo, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

const AppPage = dynamic(() => import('../app-page'), { ssr: false })

export const IndexPage: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const test = 1

	return (
		<Box className={styles.landingPageWrapper}>
			<Box style={{ position: 'fixed', top: '0', left: 0, right: '0', opacity: 0.0, pointerEvents: 'none' }}>
				<AppPage />
			</Box>
			<Box className={styles.landingPageHeaderWrapper}>
				<ContentContainer>
					<Box className={styles.landingPageHeaderInnerWrapper}>
						<NextLink href="/" className={styles.landingHeaderZ3usLink}>
							<Z3usLogo isHoverMaskEnabled={false} />
							<Z3usLogoText />
						</NextLink>
						<Box marginLeft="large">{/* <Text>header</Text> */}</Box>
					</Box>
				</ContentContainer>
			</Box>
			<Box className={styles.landingPageBodyWrapper}>
				<Box className={styles.landingPageDarkWrapper}>
					<ContentContainer>
						<Box>
							<Image priority src="/vercel.svg" width={100} height={120} alt="Vanilla Extract logo" />
							<Box padding="large">
								<p>hello</p>
							</Box>
							{Array.from({ length: 10 }, (_, i) => (
								<Box display="flex" flexDirection="column" key={i}>
									<Text size="large">Landing page content here</Text>
								</Box>
							))}
							<LogoTest />
						</Box>
					</ContentContainer>
				</Box>
				<Box className={styles.landingPagePurpleWrapper}>
					<ContentContainer>
						<Box>
							<LogoTest />
							<Box padding="large">
								<p>hello</p>
							</Box>
							{Array.from({ length: 10 }, (_, i) => (
								<Box display="flex" flexDirection="column" key={i}>
									<Text size="large">Landing page content here</Text>
								</Box>
							))}
							<LogoTest />
						</Box>
					</ContentContainer>
				</Box>
			</Box>
			<Footer />
		</Box>
	)
}
