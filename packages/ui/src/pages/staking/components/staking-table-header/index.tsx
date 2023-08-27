/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from 'packages/ui/src/components/box'
import { Close2Icon, ShareIcon } from 'packages/ui/src/components/icons'
import { ToolTip } from 'packages/ui/src/components/tool-tip'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from 'ui/src/components/loader'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './styles.css'

export const StakingTableHeader: React.FC = () => {
	const isMobile = useIsMobileWidth()
	const { validatorId } = useParams()

	const navigate = useNavigate()

	const navigateBack = () => {
		navigate('/staking')
	}

	return (
		<Box className={styles.stakingHeaderWrapper}>
			<Text size="xxlarge" color="strong" weight="strong">
				<Translation capitalizeFirstLetter text="staking.stakingValidators.title" />
			</Text>
			<Box maxWidth="xsmall">
				<Text size="medium">
					<Translation capitalizeFirstLetter text="staking.stakingValidators.subTitle" />
				</Text>
			</Box>
		</Box>
	)
}
