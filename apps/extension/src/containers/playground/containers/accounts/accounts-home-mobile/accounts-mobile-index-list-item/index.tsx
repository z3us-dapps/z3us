/* eslint-disable */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon, PlusIcon, SearchIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { Link } from '@src/components/link'
import * as skeletonStyles from '@src/containers/playground/components/styles/skeleton-loading.css'
import { animtePageVariants } from '@src/containers/playground/config'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import { Context } from '../context'
import * as styles from './accounts-mobile-index-list-item.css'

interface IAccountsMobileIndexListItemRequiredProps {
	id: string
	loaded: boolean
	name: string
}

interface IAccountsMobileIndexListItemOptionalProps {
	className?: number
	isImageSquare?: boolean
}

interface IAccountsMobileIndexListItemProps
	extends IAccountsMobileIndexListItemRequiredProps,
		IAccountsMobileIndexListItemOptionalProps {}

const defaultProps: IAccountsMobileIndexListItemOptionalProps = {
	className: undefined,
	isImageSquare: false,
}

export const AccountsMobileIndexListItem = forwardRef<HTMLElement, IAccountsMobileIndexListItemProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { setItems } = useContext(Context)
		const { id, loaded, name, isImageSquare } = props

		// const { account, assetType, asset } = useAccountParams()
		const { pathname } = useLocation()
		const { account, asset } = useAccountParams()

		useTimeout(() => {
			setItems(items =>
				items.map(item => {
					if (item.id === id) {
						item.loaded = true
					}
					return item
				}),
			)
		}, 1000)

		return (
			<Box className={styles.mobileAccountsListItem}>
				<AnimatePresence initial={false}>
					{!loaded && (
						<motion.div
							initial="hidden"
							animate="visible"
							variants={animtePageVariants}
							style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}
						>
							<Box paddingX="medium" width="full" height="full" display="flex" alignItems="center" gap="medium">
								<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircle)} />
								<Box className={skeletonStyles.tokenListSkeleton} flexGrow={1} style={{ height: '40px' }} />
								<Box className={skeletonStyles.tokenListSkeleton} style={{ height: '40px', width: '80px' }} />
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence initial={false}>
					{loaded && (
						<Link to={`/accounts/${account}/tokens/${id}`}>
							<motion.div
								initial="hidden"
								animate="visible"
								variants={animtePageVariants}
								className={styles.itemWrapperMotion}
							>
								<Box className={clsx(styles.mobileAccountsListItemInner)}>
									<Box display="flex" alignItems="center" justifyContent="flex-start" gap="medium">
										{/* <Box className={styles.tokenListGridCircle} style={{ backgroundColor: '#ea983d' }} /> */}
										<Text size="medium" weight="medium" color="strong">
											{name}
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong">
											Amount
										</Text>
									</Box>
								</Box>
							</motion.div>
						</Link>
					)}
				</AnimatePresence>
			</Box>
		)
	},
)

AccountsMobileIndexListItem.defaultProps = defaultProps
