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

	<div className="docs-menu">
		<a href="">Getting Started</a>
		<ul>
			<li>
				<a href="">Add to Existing Project</a>
			</li>
			<li>
				<a href="">Create a New Monorepo</a>
			</li>
			<li>
				<a href="">Sharing code</a>
				<ul>
					<li>
						<a href="">Internal packages</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
)
