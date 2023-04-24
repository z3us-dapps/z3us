import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { ShareIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { Link } from '@src/components/link'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import * as skeletonStyles from '@src/containers/playground/components/styles/skeleton-loading.css'
import { animtePageVariants } from '@src/containers/playground/constants'

import * as styles from './account-activity.css'
import { Context } from './context'

const hash = () => Math.random().toString(36).substring(7)

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activtyItem} />

const ItemWrapper = props => {
	const { setItems } = useContext(Context)
	const { id, index, loaded, user, selected, hovered, setHovered } = props

	// const { account, assetType, asset } = useAccountParams()
	const { pathname } = useLocation()

	const isSelected = selected === user.id
	const isHovered = hovered === user.id

	// const handleClickItem = () => {
	// 	setSelected(isSelected ? null : user.id)
	// }
	//

	// demo for timing
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
		<Box className={styles.activtyItemOuter}>
			<AnimatePresence initial={false}>
				{!loaded && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={animtePageVariants}
						style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}
					>
						<Box
							width="full"
							height="full"
							display="flex"
							gap="small"
							flexDirection="column"
							justifyContent="center"
							borderBottom={1}
							borderStyle="solid"
							borderColor="borderDivider"
						>
							<Box display="flex" alignItems="center" gap="medium">
								<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircle)} />
								<Box flexGrow={1} display="flex" flexDirection="column" gap="small">
									<Box
										className={skeletonStyles.tokenListSkeleton}
										style={{ height: '12px', width: index % 2 === 0 ? '25%' : '35%' }}
									/>
									<Box
										className={skeletonStyles.tokenListSkeleton}
										style={{ height: '12px', width: index % 2 === 0 ? '35%' : '45%' }}
									/>
								</Box>
							</Box>
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{loaded && (
					<>
						<Box
							className={clsx(styles.activtyItemInner, (isSelected || isHovered) && styles.activtyItemInnerSelected)}
						>
							<Link
								underline="never"
								to={`${pathname}?asset=xrd&transactionId=1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6`}
								// to={`/accounts/transactions/btc/1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6`}
								className={styles.activtyItemInnerBtn}
								// onClick={handleClickItem}
								onMouseOver={() => setHovered(user.id)}
								onMouseLeave={() => setHovered(null)}
							>
								<Box className={styles.indicatorCircle}>
									<TransactionIcon transactionType="deposit" />
								</Box>
								<Box className={styles.activtyItemTextWrapper}>
									<Text weight="stronger" size="small" color="strong" truncate>
										+1.249 XRD +1.249 XRD +1.249 XRD +1.249 XRD +1.249 XRD
									</Text>
									<Text size="xsmall" truncate>
										29 Aug, 10est, 2023 29 Aug, 10est, 2023 29 Aug, 10est, 2023 29 Aug, 10est, 2023
									</Text>
								</Box>
							</Link>
						</Box>
						<Box
							className={clsx(
								styles.activtyItemExternalLinkWrapper,
								(isSelected || isHovered) && styles.activtyItemExternalLinkWrapperActive,
							)}
						>
							<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.explorer" />}>
								<Button
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://explorer.radixdlt.com/"
									target="_blank"
									onMouseOver={() => setHovered(user.id)}
									onMouseLeave={() => setHovered(null)}
								>
									<ShareIcon />
								</Button>
							</ToolTip>
						</Box>
					</>
				)}
			</AnimatePresence>
		</Box>
	)
}

interface IAccountActivityRequiredProps {
	scrollableNode: HTMLElement
}

interface IAccountActivityOptionalProps {}

interface IAccountActivityProps extends IAccountActivityRequiredProps, IAccountActivityOptionalProps {}

const defaultProps: IAccountActivityOptionalProps = {}

export const AccountActivity = forwardRef<HTMLElement, IAccountActivityProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { scrollableNode } = props
		const [selected, setSelected] = useState<string | null>(null)
		const [hovered, setHovered] = useState<string | null>(null)

		// eslint-disable-next-line
		const [items, setItems] = useState(Array.from({ length: 20 }, _ => ({ id: hash(), name: hash(), loaded: false })))

		return (
			<Box ref={ref} className={clsx(styles.activityWrapper)} style={{ minHeight: '100px' }}>
				{/* @TODO: remove eslint when we remove context provider */}
				{/* eslint-disable-next-line */}
				<Context.Provider value={{ setItems }}>
					<Virtuoso
						customScrollParent={scrollableNode}
						data={items}
						// todo fix lint issue
						// eslint-disable-next-line
						itemContent={(index, user) => (
							<ItemWrapper
								index={index}
								id={user.id}
								loaded={user.loaded}
								user={user}
								selected={selected}
								setSelected={setSelected}
								hovered={hovered}
								setHovered={setHovered}
							/>
						)}
						components={{
							List: ListContainer,
							Item: ItemContainer,
						}}
					/>
				</Context.Provider>
			</Box>
		)
	},
)

AccountActivity.defaultProps = defaultProps
