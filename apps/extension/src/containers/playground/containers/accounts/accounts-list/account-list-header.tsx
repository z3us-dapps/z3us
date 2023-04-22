import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronRightIcon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import Translation from '@src/components/translation'
import { AccountAssetSearch } from '@src/containers/playground/containers/accounts/account-asset-search'
import { useAccountParams } from '@src/hooks/use-account-params'

import * as styles from './accounts-list.css'

interface IAccountListHeaderRequiredProps {
	isScrolled: boolean
}

interface IAccountListHeaderOptionalProps {
	className?: ClassValue
}

interface IAccountListHeaderProps extends IAccountListHeaderRequiredProps, IAccountListHeaderOptionalProps {}

const defaultProps: IAccountListHeaderOptionalProps = {
	className: undefined,
}

export const AccountListHeader: React.FC<IAccountListHeaderProps> = props => {
	const { className, isScrolled } = props

	const { account, assetType, asset } = useAccountParams()
	const { t } = useTranslation()

	return (
		<Box
			className={clsx(className, styles.accountListHeaderWrapper, isScrolled && styles.accountListHeaderWrapperShadow)}
		>
			<Box width="full" display="flex" alignItems="flex-start" paddingBottom="medium">
				<Box flexGrow={1}>
					<Box display="flex" paddingBottom="xsmall">
						{assetType ? (
							<>
								<Box>
									<Link underline="hover" to={`/accounts/${account}`}>
										<Text size="large">
											<Translation capitalizeFirstLetter text="accounts.assetsList.overview" />
											{account ? `: ${account}` : ''}
										</Text>
									</Link>
								</Box>
								<Box display="flex" alignItems="center">
									<Box display="flex" alignItems="center">
										<ChevronRightIcon />
									</Box>
									{asset ? (
										<Link underline="hover" to={`/accounts/${account}/${assetType}`}>
											<Text size="large">{assetType}</Text>
										</Link>
									) : (
										<Text size="large" color="strong">
											{assetType}
										</Text>
									)}
								</Box>
							</>
						) : null}
						{asset ? (
							<Box display="flex" alignItems="center">
								<Box display="flex" alignItems="center">
									<ChevronRightIcon />
								</Box>
								<Text size="large" color="strong">
									{asset}
								</Text>
							</Box>
						) : null}
					</Box>
					<Box width="full">
						<AccountAssetSearch
							balance={
								<Text weight="medium" size="xxxlarge" color="strong">
									$4,440,206.25,206.25,206.25
								</Text>
							}
							searchTitle={asset ? `${asset}` : `${assetType}`}
							onChange={_value => {
								// eslint-disable-next-line
								console.log(_value)
							}}
						/>
					</Box>
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
					<Box className={styles.tokenListHeaderButton}>
						<Text size="xsmall" weight="medium">
							<Translation capitalizeFirstLetter text="accounts.assetsList.listHeaderCategory" />
						</Text>
						{/* TODO: chevron used for sorting  */}
						{/* <ChevronDown2Icon /> */}
					</Box>
					<Box className={styles.tokenListHeaderButton}>
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
