import React, { forwardRef, useEffect, useState } from 'react'
import { ChevronRightIcon } from 'ui/src/components/icons'
import Translation from '@src/components/translation'
import { Link } from '@src/components/link'
import { Avatar, AvatarImage, AvatarFallback } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { AccountSearch } from '@src/containers/playground/containers/accounts/account-search'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

import * as styles from './account-index-assets.css'

interface IAccountIndexAssetsRequiredProps {
	scrollableNode: HTMLElement | null
}

interface IAccountIndexAssetsOptionalProps {
	className?: string
}

interface IAccountIndexAssetsProps extends IAccountIndexAssetsRequiredProps, IAccountIndexAssetsOptionalProps {}

const defaultProps: IAccountIndexAssetsOptionalProps = {
	className: undefined,
}

export const AccountIndexAssets = forwardRef<HTMLElement, IAccountIndexAssetsProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode } = props

		const [hoveredLink, setHoveredLink] = useState<string | null>(null)

		useEffect(() => {
			if (scrollableNode) {
				scrollableNode.scrollTop = 0
			}
		}, [])

		return (
			<Box ref={ref} paddingBottom="xlarge" className={className}>
				<Box display="flex" paddingBottom="small" paddingTop="large" paddingX="xlarge" alignItems="center" gap="large">
					<Box>
						<Text size="xlarge" color="strong" weight="medium">
							<Translation text="accountsIndex" />
						</Text>
					</Box>
					<Box flexGrow={1}>
						<AccountSearch
							placeholder="Search"
							onChange={_value => {
								console.log(_value)
							}}
						/>
					</Box>
				</Box>
				<Box className={styles.indexAssetsWrapper}>
					{[{ name: 'Tokens' }, { name: 'NFTs' }, { name: 'LP Tokens' }, { name: 'Badges' }].map(({ name }) => (
						<Box key={name} className={styles.indexAssetWrapper}>
							<Link
								to="/accounts/all/tokens"
								underline="never"
								className={clsx(styles.indexAssetLinkRow, name === hoveredLink && styles.indexAssetLinkRowHover)}
							>
								<Box
									className={styles.indexAssetLinkRowInner}
									onMouseOver={() => setHoveredLink(name)}
									onMouseLeave={() => setHoveredLink(null)}
								>
									<Box display="flex" alignItems="center">
										<Text size="medium" color="strong">
											{name}
										</Text>
										<Box paddingLeft="xsmall">
											<Text size="medium">(12)</Text>
										</Box>
									</Box>
									<Box display="flex" alignItems="center" gap="xsmall">
										<Text size="small" color="strong" weight="strong">
											$12,401
										</Text>
										<Text size="xsmall" color="green">
											+1.23%
										</Text>
									</Box>
								</Box>
							</Link>
							<Box className={styles.indexAssetRowOverlay}>
								<Box display="flex" alignItems="center" marginRight="large">
									<Text size="xsmall" weight="medium">
										+7
									</Text>
								</Box>
								{[...Array(4)].map((x, i) => (
									<Link key={i} to="/accounts/all/tokens" className={styles.indexAssetCircle}>
										<Box onMouseOver={() => setHoveredLink(name)}>
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
									</Link>
								))}
								<Box paddingLeft="xsmall">
									<ChevronRightIcon />
								</Box>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		)
	},
)

AccountIndexAssets.defaultProps = defaultProps
