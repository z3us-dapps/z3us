import React from 'react'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { QueryClientProvider } from 'react-query'
import { RNQueryClient } from '@src/services/react-query/query-client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { App } from '@src/popup/app_'
import { globalStyles } from 'ui/src/theme'
import { enableMapSet } from 'immer'
import '@src/css/app.scss'

enableMapSet()

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export const Provider: React.FC = () => {
	globalStyles()

	return (
		<QueryClientProvider client={RNQueryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	)
}
