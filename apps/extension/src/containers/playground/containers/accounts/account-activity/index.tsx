/* eslint-disable no-unused-vars */
import React, { forwardRef, useEffect, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { Avatar, AvatarImage, AvatarFallback } from 'ui/src/components-v2/avatar'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { ChevronDown2Icon, ShareIcon } from 'ui/src/components/icons'
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { PlusIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components-v2/typography'
import { Button } from '@src/components/button'
import clsx from 'clsx'

import * as styles from './account-activity.css'

interface IAccountActivityRequiredProps {}

interface IAccountActivityOptionalProps {
	className?: number
	onClick?: () => void
	iconOnly?: boolean
	flexGrowWrapper?: boolean
}

interface IAccountSwitcherProps extends IAccountActivityRequiredProps, IAccountActivityOptionalProps {}

const defaultProps: IAccountActivityOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
	flexGrowWrapper: false,
}

const items = [
	{ id: 'df', title: 'geebs' },
	{ id: 'asdfasdf', title: 'geebs' },
	{ id: 'adfdhfuh', title: 'geebs' },
	{ id: 'as773hf', title: 'Another geebs' },
	{ id: '88833', title: 'Aasdfahghgngn geebs' },
	{ id: '884848', title: 'djfjfj884' },
	{ id: '7d7fhdf', title: 'djfjfj884' },
	{ id: 'djfhdjhf', title: 'djfjfj884' },
	{ id: 'dfdfj', title: 'djfjfj884' },
	{ id: '88', title: 'djfjfj884' },
	{ id: '8djfahksdhf', title: 'djfjfj884' },
	{ id: '8iiudf7f7fhfh', title: 'djfjfj884' },
]

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activtyItem} />

const ItemWrapper = props => {
	const { idx, user, selected, setSelected, hovered, setHovered } = props

	const isSelected = selected === user.id
	const isHovered = hovered === user.id

	const handleClickItem = () => {
		setSelected(isSelected ? null : user.id)
	}

	return (
		<Box className={styles.activtyItemOuter}>
			<Box
				component="button"
				className={clsx(styles.activtyItemInner, (isSelected || isHovered) && styles.activtyItemInnerSelected)}
				onClick={handleClickItem}
				onMouseOver={() => setHovered(user.id)}
				onMouseLeave={() => setHovered(null)}
			>
				<Box display="flex" position="relative" width="full" gap="medium">
					<Box className={styles.indicatorCircle}>
						<Avatar>
							<AvatarImage
								className="AvatarImage"
								src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
								alt="Colm Tuite"
							/>
							<AvatarFallback className="AvatarFallback" delayMs={600}>
								CT
							</AvatarFallback>
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column" flexGrow={1}>
						<Text weight="stronger" size="small" color="strong">
							+1.249 XRD
						</Text>
						<Text size="xsmall">29 Aug, 10est, 2023</Text>
					</Box>
					<Box
						opacity={isSelected ? 1 : 0}
						display="flex"
						alignItems="center"
						flexShrink={0}
						gap="xsmall"
						marginRight="xlarge"
						color="colorNeutral"
						pointerEvents="none"
						transition="fast"
					>
						<ChevronDown2Icon />
					</Box>
				</Box>
				<AnimatePresence initial={false}>
					{isSelected && (
						<motion.section
							key="content"
							initial="collapsed"
							animate="open"
							exit="collapsed"
							variants={{
								collapsed: {
									opacity: 0,
									height: 0,
									transition: { delay: 0.2, duration: 0.2 },
								},
								open: {
									opacity: 1,
									height: 'auto',
									transition: { delay: 0, duration: 0.2 },
								},
							}}
							className={styles.activtyItemInnerSelectedContent}
						>
							<motion.div
								initial="collapsed"
								animate="open"
								exit="collapsed"
								variants={{
									collapsed: {
										opacity: 0,
										transition: { delay: 0, duration: 0.2 },
									},
									open: {
										opacity: 1,
										transition: { delay: 0.2, duration: 0.2 },
									},
								}}
							>
								<Box
									display="flex"
									flexDirection="column"
									position="relative"
									width="full"
									gap="medium"
									marginTop="medium"
									paddingTop="medium"
									borderTop={1}
									borderStyle="solid"
									borderColor="wax600"
								>
									<Box display="flex" gap="medium">
										<Box>
											<Text weight="stronger" size="xxsmall" color="strong">
												Type
											</Text>
										</Box>
										<Box className={styles.transactionDottedLine} />
										<Text size="xxsmall">Deposit</Text>
									</Box>
									<Box display="flex" gap="medium">
										<Box>
											<Text weight="stronger" size="xxsmall" color="strong">
												Transaction ID
											</Text>
										</Box>
										<Box className={styles.transactionDottedLine} />
										<Text size="xxsmall">Deposit</Text>
									</Box>
								</Box>
							</motion.div>
						</motion.section>
					)}
				</AnimatePresence>
			</Box>
			<Box className={styles.activtyItemExternalLinkWrapper}>
				<Button
					sizeVariant="small"
					styleVariant="ghost"
					iconOnly
					to="https://explorer.radixdlt.com/"
					target="_blank"
					onMouseOver={() => setHovered(user.id)}
				>
					<ShareIcon />
				</Button>
			</Box>
		</Box>
	)
}

export const AccountActivity = forwardRef<HTMLElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { iconOnly, onClick, className, flexGrowWrapper } = props

		const [selected, setSelected] = useState<string | null>(null)
		const [hovered, setHovered] = useState<string | null>(null)

		return (
			<Box className={clsx(styles.activityWrapper)} style={{ minHeight: `40px` }}>
				<Virtuoso
					customScrollParent={ref as any}
					data={items}
					itemContent={(index, user) => (
						<ItemWrapper
							idx={index}
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
			</Box>
		)
	},
)

AccountActivity.defaultProps = defaultProps
