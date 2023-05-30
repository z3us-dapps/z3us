/* eslint-disable  @typescript-eslint/no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { ArrowLeftIcon, ArrowRightIcon, Close2Icon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { CopyAddressButton } from '@src/components/copy-address-button'
import Translation from '@src/components/translation'
import { Z3usLoading } from '@src/components/z3us-loading'
import { ACCOUNTS_ALL, animtePageVariants } from '@src/constants'
import { useAccountParams } from '@src/hooks/use-account-params'
import { getShortAddress } from '@src/utils/string-utils'

import * as styles from './account-all-chart.css'

interface IAccountAllChartRequiredProps {}

interface IAccountAllChartOptionalProps {}

interface IAccountAllChartProps extends IAccountAllChartRequiredProps, IAccountAllChartOptionalProps {}

const defaultProps: IAccountAllChartOptionalProps = {}

export const AccountAllChart: React.FC<IAccountAllChartProps> = props => {
	const { account, assetType } = useAccountParams()
	const [loaded, setLoaded] = useState<boolean>(false)
	const isAllAccount = account === ACCOUNTS_ALL

	// TODO: temp
	const accountAddress =
		'ardx1qspt0lthflcd45zhwvrxkqdrv5ne5avsgarjcpfatyw7n7n93v38dhcdtlag0sdfalksjdhf7d8f78d7f8d7f8d7f8d7f'

	useTimeout(() => {
		setLoaded(true)
	}, 1000)

	if (!isAllAccount || assetType) {
		return null
	}

	return (
		<Box className={styles.allChartWrapper}>
			<Box className={styles.allChartInnerWrapper}>
				<AnimatePresence initial={false}>
					{!loaded && (
						<motion.div
							className={styles.motionWrapper}
							initial="hidden"
							animate="visible"
							variants={animtePageVariants}
						>
							<Z3usLoading message="Loading" />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence initial={false}>
					{loaded && (
						<motion.div
							className={styles.motionWrapper}
							initial="hidden"
							animate="visible"
							variants={animtePageVariants}
						>
							<Box style={{ height: '280px', width: '100%' }}>
								pie
							</Box>
							<Box className={styles.accountsListWrapper}>
								<Box display="flex" flexDirection="column" gap="xsmall" width="full">
									{[...Array(2)].map((x, i) => (
										// eslint-disable-next-line
										<Box key={i} className={styles.addressInfoWrapper}>
											<Box className={styles.addressInfoWrapperLeft}>
												<Box display="flex" alignItems="center">
													<Box className={styles.accountDotBg} />
													<Box marginRight="xsmall">
														<Text size="xsmall" color="strong" truncate>
															Defi savings account Defi savings account Defi savings account
															{getShortAddress(accountAddress)}
														</Text>
													</Box>
													<CopyAddressButton
														styleVariant="ghost"
														address={accountAddress}
														iconOnly
														rounded={false}
														tickColor="colorStrong"
													/>
												</Box>
											</Box>
											<Box className={styles.dottedSpacer} />
											<Box className={styles.addressInfoWrapperRight}>
												<Text size="xsmall" truncate>
													$51,234,51,234,51,234
												</Text>
											</Box>
										</Box>
									))}
								</Box>
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	)
}

AccountAllChart.defaultProps = defaultProps
