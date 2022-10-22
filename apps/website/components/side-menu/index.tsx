/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Docs } from 'types'

export const SideMenu: React.FC<Docs> = ({ docs }) => (
	// const { pathname, query } = useRouter()
	// const sortedDocs = docs
	// 	.filter(doc => !doc.frontMatter.hideFromMenu)
	// 	.sort((a, b) => a.frontMatter.order - b.frontMatter.order)

	<div className="docs-menu">side menu</div>
)
