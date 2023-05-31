/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { forwardRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronDown3Icon, ChevronLeftIcon, ArrowLeftIcon } from 'ui/src/components/icons'

import { AnimatedPage } from '@src/components/animated-page'
import { Button } from '@src/components/button'

import * as styles from './account-settings.css'
import { SettingsMobileHeader } from './settings-mobile-header'

interface IAccountSettingsMobileRequiredProps {
	scrollableNode: HTMLElement
	scrollTop: number
}

interface IAccountSettingsMobileOptionalProps {
	className?: ClassValue
}

interface IAccountSettingsMobileProps
	extends IAccountSettingsMobileRequiredProps,
		IAccountSettingsMobileOptionalProps {}

const defaultProps: IAccountSettingsMobileOptionalProps = {
	className: undefined,
}

export const AccountSettingsMobile = forwardRef<HTMLElement, IAccountSettingsMobileProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode, scrollTop } = props

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
										<SettingsMobileHeader isShadowVisible={scrollTop > 0} />
										<Box>home settings</Box>
										<Box display="flex" flexDirection="column" gap="medium">
											<Link to="/accounts/settings">settings</Link>
											<Link to="/accounts/settings/general">General</Link>
											<Link to="/accounts/settings/accounts">accounts</Link>
											<Link to="/accounts/settings/address-book">address book</Link>
										</Box>
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

						<Route
							path="/general"
							element={
								<AnimatedPage>
									<Box>
										<SettingsMobileHeader
											leftSlot={
												<Button iconOnly styleVariant="ghost" sizeVariant="small" to="/accounts/settings">
													<ArrowLeftIcon />
												</Button>
											}
											isShadowVisible={scrollTop > 0}
										/>
										<Box>general</Box>
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

AccountSettingsMobile.defaultProps = defaultProps
