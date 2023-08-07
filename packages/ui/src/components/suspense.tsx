import { Suspense as ReactSuspense } from 'react'

import Loader from './loader'

const Suspense = ({ children }: { children: React.ReactNode }) => (
	<ReactSuspense fallback={<Loader />}>{children}</ReactSuspense>
)

export default Suspense
