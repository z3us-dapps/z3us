/* eslint-disable */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { Button } from '@src/components/button'

import * as styles from './account-staking.css'

interface IAccountStakingRequiredProps {}

interface IAccountStakingOptionalProps {
	className?: string
}

interface IAccountStakingProps extends IAccountStakingRequiredProps, IAccountStakingOptionalProps {}

const defaultProps: IAccountStakingOptionalProps = {
	className: undefined,
}

export const AccountStaking = forwardRef<HTMLElement, IAccountStakingProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		return (
			<Box ref={ref} className={clsx(className)}>
				<Box>Staking</Box>
			</Box>
		)
	},
)

AccountStaking.defaultProps = defaultProps
