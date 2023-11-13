import { IndexHomePage } from '@/components/layouts/index-page'
import { Meta } from '@/components/meta'
import React from 'react'

const App = () => (
	<>
		<Meta
			title="Z3US: An open source UX driven wallet for Radix DLT"
			description="A community centered open source browser wallet for the Radix DLT network."
			slug=""
		/>
		<IndexHomePage />
	</>
)

export default App
