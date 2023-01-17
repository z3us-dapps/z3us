/* eslint-disable */
import React, { useState } from 'react'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { motion, LayoutGroup } from 'framer-motion'

import { Text } from 'ui/src/components-v2/atoms'
import { Button } from 'ui/src/components-v2/button'

export function generateUsers(length, startIndex = 0) {
	return Array.from({ length }).map((_, i) => ({ name: 'geebs', bgColor: 'transparent', description: 'heebs' }))
}

import './accounts-home.css'

export const AccountsHome = () => {
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)

	return (
		<div className="z3-c-accounts-home">
			<div className="z3-c-accounts-home__container">
				<div className="z3-c-accounts-home__assets">
					<div className="z3-c-accounts-home__assets-header">
						<div>
							<Text block textColor="help" medium>
								<span>Savings</span> balance:
							</Text>
						</div>
						<Text block bold size="xl4">
							$40,000
						</Text>
						<section>
							<div>
								<Text block medium size="base">
									All assets
								</Text>
							</div>
							<Button intent="ghost" icon>
								<MagnifyingGlassIcon />
							</Button>
							<Button intent="secondary">
								Filter
								<MixerHorizontalIcon />
							</Button>
						</section>
					</div>

					{/* <div */}
					{/* 	className="p-5" */}
					{/* 	style={{ */}
					{/* 		position: 'relative', */}
					{/* 		overflow: 'hidden', */}
					{/* 		maxHeight: '100px', */}
					{/* 		height: '5000px', */}
					{/* 	}} */}
					{/* > */}
					{/* 	<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}> */}
					{/* 		<Virtuoso */}
					{/* 			customScrollParent={customScrollParent} */}
					{/* 			data={generateUsers(4)} */}
					{/* 			itemContent={(index, user) => ( */}
					{/* 				<div */}
					{/* 					style={{ */}
					{/* 						backgroundColor: user.bgColor, */}
					{/* 						padding: '1rem 0.5rem', */}
					{/* 					}} */}
					{/* 				> */}
					{/* 					<h4>{user.name}</h4> */}
					{/* 					<div style={{ marginTop: '1rem' }}>{user.description}</div> */}
					{/* 				</div> */}
					{/* 			)} */}
					{/* 		/> */}
					{/* 	</ScrollArea> */}
					{/* </div> */}
				</div>
				<div className="z3-c-accounts-home__cards">
					<div className="p-5">
						<Text block>Accounts</Text>
						<Text block bold size="xl4"></Text>
					</div>
					<div className="p-5" style={{ overflow: 'auto', display: 'none' }}>
						<div>
							<Text size="xl" className="border-">
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
								industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
								scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
								into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
								release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
								software like Aldus PageMaker including versions of Lorem Ipsum.
							</Text>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
