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
			<Box display="flex" gap="medium">
				<Link to="/accounts">accounts</Link>
				<Link to="/staking">staking</Link>
				<Link to="/staking/validator_tdx_d_1sw59jzn7cgp0c94xqfflvl2jxrgymy2qrucs78ye0p0qrwddvhgulc">
					staking validator x
				</Link>
				<Link to="/staking/validator_tdx_d_1sw59jzn7cgp0c94xqfflvl2jxrgymy29999999999999999">staking validator y</Link>
			</Box>
		</Box>
	)
}
