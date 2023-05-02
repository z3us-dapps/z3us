/* eslint-disable  @typescript-eslint/no-unused-vars */
import { ResponsivePie } from '@nivo/pie'
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

const data = [
	{
		id: 'python',
		label: 'python',
		value: 285,
		color: 'hsl(358, 70%, 50%)',
	},
	{
		id: 'java',
		label: 'java',
		value: 357,
		color: 'hsl(117, 70%, 50%)',
	},
	{
		id: 'lisp',
		label: 'lisp',
		value: 289,
		color: 'hsl(162, 70%, 50%)',
	},
	{
		id: 'css',
		label: 'css',
		value: 283,
		color: 'hsl(345, 70%, 50%)',
	},
	{
		id: 'ruby',
		label: 'ruby',
		value: 170,
		color: 'hsl(37, 70%, 50%)',
	},
]

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
								<ResponsivePie
									data={data}
									margin={{ top: 5, right: 5, bottom: 10, left: 5 }}
									innerRadius={0.2}
									padAngle={2}
									cornerRadius={8}
									activeInnerRadiusOffset={5}
									activeOuterRadiusOffset={5}
									borderWidth={2}
									borderColor={{
										from: 'color',
										modifiers: [['darker', 0.2]],
									}}
									enableArcLinkLabels={false}
									enableArcLabels={false}
									arcLinkLabelsSkipAngle={27}
									arcLinkLabelsTextColor="#333333"
									arcLinkLabelsOffset={-7}
									arcLinkLabelsDiagonalLength={25}
									arcLinkLabelsStraightLength={25}
									arcLinkLabelsThickness={2}
									arcLinkLabelsColor={{ from: 'color' }}
									arcLabelsRadiusOffset={0.55}
									arcLabelsSkipAngle={17}
									arcLabelsTextColor={{
										from: 'color',
										modifiers: [['darker', 2]],
									}}
									// eslint-disable-next-line
									tooltip={({ datum: { id, value, color } }) => (
										<Box
											padding="large"
											display="flex"
											flexDirection="column"
											borderRadius="large"
											background="backgroundSecondary"
											style={{
												color,
											}}
										>
											<Text>Look, Im custom :)</Text>
											<Text>
												<Box component="span" style={{ color }}>
													{id}: {value}
												</Box>
											</Text>
										</Box>
									)}
									theme={{
										tooltip: {
											container: {
												background: '#333',
											},
										},
									}}
									defs={[
										{
											id: 'dots',
											type: 'patternDots',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											size: 4,
											padding: 1,
											stagger: true,
										},
										{
											id: 'lines',
											type: 'patternLines',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											rotation: -45,
											lineWidth: 6,
											spacing: 10,
										},
									]}
									fill={[
										{
											match: {
												id: 'ruby',
											},
											id: 'dots',
										},
										{
											match: {
												id: 'c',
											},
											id: 'dots',
										},
										{
											match: {
												id: 'go',
											},
											id: 'dots',
										},
										{
											match: {
												id: 'python',
											},
											id: 'dots',
										},
										{
											match: {
												id: 'scala',
											},
											id: 'lines',
										},
										{
											match: {
												id: 'lisp',
											},
											id: 'lines',
										},
										{
											match: {
												id: 'elixir',
											},
											id: 'lines',
										},
										{
											match: {
												id: 'javascript',
											},
											id: 'lines',
										},
									]}
								/>
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
