import NextLink from 'next/link'
import React from 'react'

import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'

export const Z3usLogoLink = ({ href = '/' }: { href?: string }) => (
	<NextLink href={href}>
		<Z3usLogo />
	</NextLink>
)
