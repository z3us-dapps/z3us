import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Pairing = React.lazy(() => import('./pairing'))
const Options = React.lazy(() => import('./options'))

const Radix = (): React.JSX.Element => (
	<Routes>
		<Route path="pairing" element={<Pairing />} />
		<Route path="options" element={<Options />} />
	</Routes>
)

export default Radix
