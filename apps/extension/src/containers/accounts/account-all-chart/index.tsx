/* eslint-disable  @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { ArrowLeftIcon, ArrowRightIcon, Close2Icon } from 'ui/src/components/icons'

import { AnimatedCard } from '@src/components/animated-card'
import { Button } from '@src/components/button'
import { CardButtons } from '@src/components/card-buttons'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import { Z3usLoading } from '@src/components/z3us-loading'
import { ACCOUNTS_ALL } from '@src/constants'
import { useAccountParams } from '@src/hooks/use-account-params'

import * as styles from './account-all-chart.css'

interface IAccountAllChartRequiredProps {}

interface IAccountAllChartOptionalProps {}

interface IAccountAllChartProps extends IAccountAllChartRequiredProps, IAccountAllChartOptionalProps {}

const defaultProps: IAccountAllChartOptionalProps = {}

export const AccountAllChart: React.FC<IAccountAllChartProps> = props => {
	const { account, assetType } = useAccountParams()
	const isAllAccount = account === ACCOUNTS_ALL

	if (!isAllAccount || assetType) {
		return null
	}

	return (
		<Box>
			<Box paddingTop="xlarge" paddingX="xlarge">
				{/* TODO: Chart for `isAllAccount` goes here */}
				<Box padding="large" background="backgroundPrimary" style={{ width: '100%', height: '200px' }}>
					<Z3usLoading message="Loading" />
					{/* <Z3usLoading message="Loading"> */}
					{/* 	<Box> */}
					{/* 		<Text size="xsmall">Loading</Text> */}
					{/* 	</Box> */}
					{/* </Z3usLoading> */}
				</Box>
			</Box>
		</Box>
	)
}

AccountAllChart.defaultProps = defaultProps
