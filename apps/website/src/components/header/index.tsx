import { ContentContainer } from '@/components/content-container'
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { clsx } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
// import { ConnectButton } from 'ui/src/components/connect-button'
import { GithubIcon, TelegramIcon, XIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Z3usLogo, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

export const Header = () => {
	// const router = useRouter()
	// const isConnected = useConnected()
	const isConnected = false

	return (
		<Box className={clsx(styles.headerWrapper, isConnected && styles.headerWrapperBorderColor)}>
			<ContentContainer>
				<Box className={styles.landingPageHeaderInnerWrapper}>
					<NextLink href="/" className={styles.landingHeaderZ3usLink}>
						<Z3usLogo isHoverMaskEnabled={false} />
						<Z3usLogoText />
					</NextLink>
					<Box className={styles.landingPageHeaderMenuWrapper}>
						<Box className={styles.headerTextLinks}>
							<NextLink href="/" underline="hover">
								Support
							</NextLink>
							<NextLink href="/" underline="hover">
								Faq
							</NextLink>
						</Box>
						<Box className={styles.headerSocialLinks}>
							<ToolTip message="telegram">
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
							<ToolTip message="X">
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
							<ToolTip message="github">
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
						</Box>
					</Box>
				</Box>
			</ContentContainer>
		</Box>
	)
}
