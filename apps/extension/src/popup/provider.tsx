import { CategoryScale, Chart, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { enableMapSet } from 'immer'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { globalStyles } from 'ui/src/theme'

import { NoneSharedStoreProvider } from '@src/context/state-provider'
import '@src/css/app.css'
import newQueryClient from '@src/hooks/react-query/query-client'
import { App } from '@src/popup/app_'

enableMapSet()

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const queryClient = newQueryClient(window.localStorage)

const Provider: React.FC = () => {
	globalStyles()

	return (
		<QueryClientProvider client={queryClient}>
			<NoneSharedStoreProvider>
				<App />
				<ReactQueryDevtools initialIsOpen />
			</NoneSharedStoreProvider>
		</QueryClientProvider>
	)
}

export default Provider
