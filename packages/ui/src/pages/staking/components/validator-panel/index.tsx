/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Portal from '@radix-ui/react-portal'
import { motion } from 'framer-motion'
import { Box } from 'packages/ui/src/components/box'
import { Close2Icon, ShareIcon } from 'packages/ui/src/components/icons'
import { ToolTip } from 'packages/ui/src/components/tool-tip'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from 'ui/src/components/loader'
// import { Button } from 'packages/ui/src/components/button'
import { Button } from 'ui/src/components/router-button'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import Translation from 'ui/src/components/translation'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './styles.css'

export const ValidatorPanel: React.FC = () => {
	const isMobile = useIsMobileWidth()
	const { validatorId } = useParams()

	const navigate = useNavigate()

	const navigateBack = () => {
		navigate('/staking')
	}

	return (
		<Portal.Root>
			<motion.div
				className={styles.validatorInnerWrapper}
				initial={{ opacity: 1, x: '100%' }}
				animate={{ opacity: 1, x: '0%' }}
				exit={{ opacity: 1, x: '100%' }}
				transition={{
					duration: 0.3,
					ease: 'easeOut',
				}}
			>
				<Box>
					<Box padding="small">
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							<ToolTip message="global.open global.explorer">
								<Button to="staking" sizeVariant="small" styleVariant="ghost" iconOnly target="_blank">
									<ShareIcon />
								</Button>
							</ToolTip>
							<ToolTip message="global.close">
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<Close2Icon />
								</Button>
							</ToolTip>
						</Box>
					</Box>
					<Box padding="large">
						<p style={{ wordWrap: 'break-word' }}>{validatorId}</p>
					</Box>
				</Box>
			</motion.div>
		</Portal.Root>
	)
}
