import React, { useState, useEffect } from 'react'
import { darkTheme, globalStyles } from 'ui/src/theme'
import { CheckIcon } from 'ui/src/components/icons'
import { Link, useRouter } from 'wouter'
import { Z3UShell } from './components/z3us-shell'
import { App } from './containers/app'

import '@src/css/app.css'

export const Playground: React.FC = () => (
	<Z3UShell>
		<App />
	</Z3UShell>
)

export default Playground
