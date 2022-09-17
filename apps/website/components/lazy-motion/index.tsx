import React from 'react'
import { LazyMotion as Lz } from 'framer-motion'

export const LazyMotion = ({ children }) => (
	<Lz features={async () => (await import('./framer-features')).default} strict>
		{children}
	</Lz>
)
