import React, { useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { getShortAddress } from '@src/utils/string-utils'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { AccountViewDropdown } from '@src/containers/playground/containers/accounts/account-view-dropdown'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link as LinkRouter, useMatch } from 'react-router-dom'
import { WalletDropdown } from '@src/containers/playground/containers/accounts/wallet-dropdown'
// import { RowsIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
// import { DashboardIcon } from '@radix-ui/react-icons'
import { CopyIcon } from 'ui/src/components/icons'
import { Link } from '@src/components/link'
// import { Button } from '@src/components/button'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
// import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from 'ui/src/components-v2/button'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './navigation.css'

const Z3usLogoBrand = () => (
	<LinkRouter to="/accounts/all" className={styles.navigationLogoLink}>
		<Box className={styles.navigationLogoLinkScreen} />
		<svg x="0px" y="0px" viewBox="0 0 24 24" className={styles.logoSvg}>
			<g>
				<path d="M0,12v12h12C5.4,24,0,18.6,0,12z" />
				<path d="M12,0H0v12C0,5.4,5.4,0,12,0z" />
				<path d="M12,24h12V12C24,18.6,18.6,24,12,24z" />
				<path d="M12,0c6.6,0,12,5.4,12,12V0H12z" />
				<path
					d="M12,1.2C6,1.2,1.2,6,1.2,12C1.2,18,6,22.8,12,22.8c6,0,10.8-4.8,10.8-10.8C22.8,6,18,1.2,12,1.2z M15.5,12.2l-9.9,6.2
			l8.3-2.9c0.2-0.1,0.3,0.1,0.3,0.2v2.3c0,0.2,0.2,0.3,0.3,0.2l6.7-2.3c-1.5,3.5-5.1,6-9.2,6c-4.9,0-8.9-3.5-9.8-8.1l5.6-3.8
			c0.2-0.1,0.4,0,0.4,0.2v1.3c0,0.2,0.2,0.3,0.4,0.2l9.9-6.2l-8.3,2.9C10,8.5,9.9,8.4,9.9,8.2V5.9c0-0.2-0.2-0.3-0.3-0.2L2.8,8
			C4.4,4.5,7.9,2,12,2c4.9,0,8.9,3.5,9.8,8.1l-5.6,3.8c-0.2,0.1-0.4,0-0.4-0.2v-1.3C15.9,12.2,15.7,12.1,15.5,12.2z"
				/>
			</g>
		</svg>
	</LinkRouter>
)

const MenuItem = ({ text, href }) => {
	const match = useMatch(href)
	const { account } = useAccountParams()

	const accountMatchBlackList = ['transfer', 'staking', 'swap', 'settings']
	const isAccountsMatch = href === '/accounts/all' && account && !accountMatchBlackList.includes(account)
	const selected = !!match || isAccountsMatch

	return (
		<Link to={href} className={clsx(styles.navigationMenuLink)} underline="never">
			{selected ? <motion.span layoutId="underline" className={styles.navigationMenuActiveLine} /> : null}
			<Text size="medium" color={null} className={clsx(selected && styles.navigationMenuLinkTextSelected)}>
				{text}
			</Text>
		</Link>
	)
}

const CopyIconAnimation = ({ animate }: { animate: boolean }) => (
	<Box className={styles.copiedAnimationWrapper}>
		<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
			<AnimatePresence initial={false}>
				{animate && (
					<Box color="green400" zIndex={1}>
						<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="CheckIcon">
							<motion.path
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								exit={{ pathLength: 0 }}
								transition={{
									type: 'tween',
									duration: 0.3,
									ease: animate ? 'easeOut' : 'easeIn',
								}}
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7.75 12.75L10 15.25L16.25 8.75"
							/>
						</svg>
					</Box>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{!animate && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
						exit={{ opacity: 0, transition: { delay: 0, duration: 0.1 } }}
					>
						<Box width="full" height="full" transition="fast" position="absolute" top={0} left={0}>
							<CopyIcon />
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	</Box>
)

export const Navigation: React.FC = () => {
	const [copiedAnimate, setCopiedAnimate] = useState<boolean>(false)
	const { t } = useTranslation()
	const tempAddress = 'rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce'

	const handleAddressClick = () => {
		copyTextToClipboard(tempAddress)
		setCopiedAnimate(true)

		setTimeout(() => {
			setCopiedAnimate(false)
		}, 3000)
	}

	return (
		<Box component="nav" className={styles.navigationWrapper}>
			<Box className={styles.navigationContainer}>
				<Z3usLogoBrand />
				<Box className={styles.navigationMenu}>
					<LayoutGroup>
						{[
							{ text: t('accounts.navigation.accounts'), href: '/accounts/all' },
							{ text: t('accounts.navigation.transfer'), href: '/accounts/transfer' },
							{ text: t('accounts.navigation.staking'), href: '/accounts/staking' },
							{ text: t('accounts.navigation.swap'), href: '/accounts/swap' },
							{ text: t('accounts.navigation.settings'), href: '/accounts/settings' },
						].map(({ text, href }) => (
							<MenuItem text={text} key={href} href={href} />
						))}
					</LayoutGroup>
				</Box>
				<Box display="flex" alignItems="center" gap="medium">
					<ToolTip message={tempAddress}>
						<Button
							sizeVariant="small"
							styleVariant="tertiary"
							rounded
							rightIcon={<CopyIconAnimation animate={copiedAnimate} />}
							onClick={handleAddressClick}
						>
							<Box position="relative">
								<Box transition="slow" opacity={copiedAnimate ? 0 : 1}>
									{getShortAddress(tempAddress)}
								</Box>
								<Box
									transition="slow"
									opacity={copiedAnimate ? 1 : 0}
									position="absolute"
									top={0}
									width="full"
									textAlign="center"
									pointerEvents="none"
								>
									Copied
								</Box>
							</Box>
							{/* {copiedAnimate ? 'Copied' : getShortAddress(tempAddress)} */}
						</Button>
					</ToolTip>
					<AccountViewDropdown />
					<WalletDropdown />
				</Box>
			</Box>
		</Box>
	)
}
