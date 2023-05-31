/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { forwardRef } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { AnimatedPage } from '@src/components/animated-page'
import { ScrollPanel } from '@src/components/scroll-panel'

import * as styles from './account-settings.css'

interface IAccountSettingsDesktopRequiredProps {}

interface IAccountSettingsDesktopOptionalProps {
	className?: ClassValue
}

interface IAccountSettingsDesktopProps
	extends IAccountSettingsDesktopRequiredProps,
		IAccountSettingsDesktopOptionalProps {}

const defaultProps: IAccountSettingsDesktopOptionalProps = {
	className: undefined,
}

export const AccountSettingsDesktop = forwardRef<HTMLElement, IAccountSettingsDesktopProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const location = useLocation()

		return (
			<Box ref={ref} className={clsx(styles.settingsDesktopWrapper, className)}>
				<Box className={styles.settingsDesktopContainerWrapper}>
					<Box className={styles.settingsDesktopLeftMenu}>
						<Box display="flex" flexDirection="column" gap="medium">
							<Link to="/accounts/settings">settings</Link>
							<Link to="/accounts/settings/general">General</Link>
							<Link to="/accounts/settings/accounts">accounts</Link>
							<Link to="/accounts/settings/address-book">address book</Link>
						</Box>
					</Box>
					<Box className={styles.settingsDesktopRightWrapper}>
						<ScrollPanel
							isTopShadowVisible
							renderPanel={(scrollableNode: HTMLElement | null) => {
								const test = 1
								return (
									<Box position="relative" padding="xlarge">
										<Box position="relative">
											<AnimatePresence initial={false}>
												<Routes location={location} key={location.pathname}>
													{['/', '/general'].map(path => (
														<Route
															key="settingsGeneral" // to avoid full re-renders when these routes change
															path={path}
															element={
																<AnimatedPage>
																	<Box>
																		<Box>home / general</Box>
																		<Box>
																			{[...Array(40)].map((_, i) => (
																				// eslint-disable-next-line
																				<Box key={i}>
																					<Text size="xxxlarge">settings desktop</Text>
																				</Box>
																			))}
																		</Box>
																	</Box>
																</AnimatedPage>
															}
														/>
													))}
													<Route
														path="/general"
														element={
															<AnimatedPage>
																<Box>
																	<Box>general</Box>
																</Box>
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
									</Box>
								)
							}}
						/>
					</Box>
				</Box>
			</Box>
		)
	},
)

AccountSettingsDesktop.defaultProps = defaultProps
