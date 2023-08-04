import clsx, { type ClassValue } from 'clsx'
import { useAccountParam, useAssetParam } from 'packages/ui/src/hooks/use-params'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { AccountAssetSearch } from 'ui/src/containers/accounts/account-asset-search'

import * as styles from './accounts-list.css'

interface IAccountListHeaderRequiredProps {
	scrollableNode: HTMLElement
}

interface IAccountListHeaderOptionalProps {
	className?: ClassValue
}

interface IAccountListHeaderProps extends IAccountListHeaderRequiredProps, IAccountListHeaderOptionalProps {}

const defaultProps: IAccountListHeaderOptionalProps = {
	className: undefined,
}

export const AccountListHeader: React.FC<IAccountListHeaderProps> = props => {
	const { className, scrollableNode } = props
	const { assetType } = useParams()
	const account = useAccountParam()
	const asset = useAssetParam()
	const isScrolled = scrollableNode?.scrollTop > 0

	return (
		<Box
			className={clsx(className, styles.accountListHeaderWrapper, isScrolled && styles.accountListHeaderWrapperShadow)}
		>
			<Box width="full" paddingBottom="small">
				<Box width="full">
					<Box display="flex" paddingBottom="xsmall" width="full">
						{assetType ? (
							<>
								<Box flexShrink={0}>
									<Link underline="hover" to={`/accounts?accounts=${account}`}>
										<Text size="large" truncate>
											<Translation capitalizeFirstLetter text="accounts.assetsList.overview" />
											{account ? `: ${account}` : ''}
										</Text>
									</Link>
								</Box>
								<Box display="flex" alignItems="center" flexShrink={0}>
									<Box display="flex" alignItems="center" flexShrink={0}>
										<ChevronRightIcon />
									</Box>
									{asset ? (
										<Link
											underline="hover"
											to={`/accounts${assetType ? `/${assetType}` : ''}?accounts=${account}&asset=${asset}`}
										>
											<Text size="large" truncate>
												{assetType}
											</Text>
										</Link>
									) : (
										<Text size="large" color="strong" truncate>
											{assetType}
										</Text>
									)}
								</Box>
							</>
						) : null}
						{asset ? (
							<Box display="flex" alignItems="center" flexGrow={1}>
								<Box display="flex" alignItems="center" flexShrink={0}>
									<ChevronRightIcon />
								</Box>
								<Box className={styles.breadCrumbTextWrapper}>
									<Text size="large" color="strong" truncate>
										{asset} testing testing testin testing testing testin testing testing testin
									</Text>
								</Box>
							</Box>
						) : null}
					</Box>
					<AccountAssetSearch
						scrollableNode={scrollableNode}
						balance={
							<Text weight="medium" size="xxxlarge" color="strong" truncate>
								$4,440,206.25,206.25,206.253332222222222
							</Text>
						}
					/>
				</Box>
			</Box>
			<Box width="full" paddingTop="small">
				<Box position="relative" paddingBottom="medium" className={styles.tokenListGridWrapper}>
					<Box className={styles.tokenListHeaderButton}>
						<Text size="xsmall" weight="medium">
							<Translation capitalizeFirstLetter text="accounts.assetsList.listHeaderAsset" />
						</Text>
					</Box>
					<Box className={styles.tokenListHeaderButton}>
						<Text size="xsmall" weight="medium">
							<Translation capitalizeFirstLetter text="accounts.assetsList.listHeaderAmount" />
						</Text>
					</Box>
					<Box className={clsx(styles.tokenListHeaderButton, styles.tokenListCategoryColumn)}>
						<Text size="xsmall" weight="medium">
							<Translation capitalizeFirstLetter text="accounts.assetsList.listHeaderCategory" />
						</Text>
						{/* TODO: chevron used for sorting  */}
						{/* <ChevronDown2Icon /> */}
					</Box>
					<Box className={clsx(styles.tokenListHeaderButton, styles.tokenListAccountColumn)}>
						<Text size="xsmall" weight="medium">
							<Translation capitalizeFirstLetter text="accounts.assetsList.listHeaderAccount" />
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

AccountListHeader.defaultProps = defaultProps
