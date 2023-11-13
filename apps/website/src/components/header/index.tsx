import { ContentContainer } from '@/components/content-container'
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { GithubIcon, RadixIcon, TelegramIcon, XIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Z3usLogo, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

export const Header = () => {
	const router = useRouter()

	const handleClickWebsiteConnect = () => {
		router.push('/#/accounts', { scroll: false })
	}

	return (
		<Box className={styles.headerWrapper}>
			<ContentContainer>
				<Box className={styles.landingPageHeaderInnerWrapper}>
					<NextLink href="/" className={styles.landingHeaderZ3usLink}>
						<Z3usLogo isHoverMaskEnabled={false} />
						<Z3usLogoText />
					</NextLink>
					<Box className={styles.landingPageHeaderMenuWrapper}>
						<Box className={styles.headerTextLinks}>
							<NextLink href="/faq" underline="hover" weight="medium" size="small">
								FAQ
							</NextLink>
							<NextLink
								href="https://z3us-dapps.featureos.app"
								underline="hover"
								target="_blank"
								weight="medium"
								size="small"
							>
								Support
							</NextLink>
							{/* TODO: FAQ coming soon */}
							{/* <NextLink href="/" underline="hover">
								Faq
							</NextLink> */}
						</Box>
						<Box className={styles.headerSocialLinks}>
							<ToolTip message="Telegram">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://t.me/z3us_dapps"
									target="_blank"
								>
									<TelegramIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message="Z3US on X">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://twitter.com/z3us_dapps"
									target="_blank"
								>
									<XIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message="Github">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://github.com/z3us-dapps/z3us"
									target="_blank"
								>
									<GithubIcon />
								</NextButton>
							</ToolTip>
							<Box className={styles.headerConnectRadixWrapper}>
								<Button
									sizeVariant="medium"
									styleVariant="secondary"
									leftIcon={<RadixIcon />}
									onClick={handleClickWebsiteConnect}
								>
									Launch
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			</ContentContainer>
		</Box>
	)
}
