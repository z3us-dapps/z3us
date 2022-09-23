import React from 'react'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { QueryClientProvider } from 'react-query'
import newQueryClient from '@src/hooks/react-query/query-client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { App } from '@src/popup/app'
import { globalStyles } from 'ui/src/theme'
import { enableMapSet } from 'immer'
import '@src/css/app.scss'

enableMapSet()

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const queryClient = newQueryClient(window.localStorage)

export const Provider: React.FC = () => {
	globalStyles()

	return (
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	)
}
