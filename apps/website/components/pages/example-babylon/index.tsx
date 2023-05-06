/* eslint-disable no-console */
import Seperator from 'components/seperator'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'

import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import Toast, { useToastControls } from 'ui/src/components/toasts'

const API_URL = 'https://pte01.radixdlt.com/'
const componentAddress = '0276b537d9fc474d86edd48bfaa2843e87b48765767357ab9e403d'

interface ImmerT {
	time: number | null
	address: string
	manifest: string
	// @TODO: type `resources`
	resources: any
}

export const Example = () => {
	const { show } = useToastControls()

	const [state, setState] = useImmer<ImmerT>({
		time: new Date().getTime(),
		address: '',
		manifest: '',
		resources: null,
	})

	return (
		<Box>
			<Box css={{ maxWidth: '100%' }}>
				<AlertCard icon color="warning" css={{ mt: '$4', height: '40px' }}>
					<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
						Connect Z3US wallet before attempting to send a transaction.
					</Text>
				</AlertCard>
			</Box>
		</Box>
	)
}
