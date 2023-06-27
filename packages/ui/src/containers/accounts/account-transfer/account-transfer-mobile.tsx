/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { forwardRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { ArrowLeftIcon, ChevronDown3Icon, ChevronLeftIcon, HomeIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'

import * as styles from './account-transfer.css'

// import { SettingsGeneral } from './settings-general'
// import { SettingsMobileHeader } from './settings-mobile-header'

interface IAccountSettingsMobileProps {
	scrollableNode?: HTMLElement
	scrollTop?: number
	className?: ClassValue
}

export const AccountTransferMobile = forwardRef<HTMLElement, IAccountSettingsMobileProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode, scrollTop } = props

		const isShadowVisible = scrollTop > 0

		const location = useLocation()

		return (
			<Box ref={ref} className={clsx(styles.settingsMobileWrapper, className)}>
				<AnimatePresence initial={false}>
					<Routes location={location} key={location.pathname}>
						<Route
							path="/"
							element={
								<AnimatedPage>
									<Box>
										{/* <SettingsMobileHeader isShadowVisible={scrollTop > 0} /> */}
										<Box padding="large">
											<Text size="xxlarge" weight="strong" color="strong">
												Settings
											</Text>
										</Box>
										<Box display="flex" flexDirection="column">
											{[
												{ href: '/accounts/settings/general', title: 'General' },
												{ href: '/accounts/settings/accounts', title: 'Accounts' },
												{ href: '/accounts/settings/address-book', title: 'Address book' },
											].map(({ href, title }, i) => (
												<Link key={href} to={href} className={styles.settingsMobileIndexLinkWrapper}>
													<Box className={styles.settingsMobileIndexLinkIconWrapper}>
														<HomeIcon />
													</Box>
													<Box className={styles.settingsMobileIndexLinkTextWrapper}>
														<Text color="strong" size="large" weight="strong">
															{title}
														</Text>
														<Text lineClamp={3}>
															Lorum ipsumIn convallis vel neque facilisis est mi in varius gravida eget convallis
															convallis ut velit lacus, eros faucibus odio. Varius dui porttitor eu ac egestas in tempus
															nisi suscipit fusce urna. Vitae semper velit facilisis nunc, suspendisse vivamus duis
															vestibulum ullamcorper dui lectus sapien tempus sit eu dapibus arcu pellentesque.
														</Text>
													</Box>
												</Link>
											))}
										</Box>
									</Box>
								</AnimatedPage>
							}
						/>
						<Route
							path="/general"
							element={
								<AnimatedPage>
									{/* <SettingsMobileHeader
										isShadowVisible={isShadowVisible}
										leftSlot={
											<Button iconOnly styleVariant="ghost" sizeVariant="small" to="/accounts/settings">
												<ArrowLeftIcon />
											</Button>
										}
									/>
									<SettingsGeneral /> */}
								</AnimatedPage>
							}
						/>
						<Route
							path="/accounts"
							element={
								<AnimatedPage>
									<Box>
										<Box>general</Box>
									</Box>
								</AnimatedPage>
							}
						/>
						<Route
							path="/address-book"
							element={
								<AnimatedPage>
									<Box>
										<Box>address-book</Box>
									</Box>
								</AnimatedPage>
							}
						/>
					</Routes>
				</AnimatePresence>
			</Box>
		)
	},
)
