import { LazyMotion as Lz } from 'framer-motion'
import React from 'react'

export const LazyMotion = ({ children }) => (
	<Lz features={async () => (await import('./framer-features')).default} strict>
		{children}
	</Lz>
)
