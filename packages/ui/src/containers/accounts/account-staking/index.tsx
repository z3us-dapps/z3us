/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'

import * as styles from './account-staking.css'

// eslint-disable-next-line arrow-body-style
const AccountStaking = () => {
	return (
		<Box className={styles.stakingWrapper}>
			<Box>Staking</Box>
		</Box>
	)
}

export default AccountStaking
