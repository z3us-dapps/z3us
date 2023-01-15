/* eslint-disable */
import React from 'react'
import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { motion, LayoutGroup } from 'framer-motion'

import { Text } from 'ui/src/components-v2/atoms'

import './accounts-home.css'

export const AccountsHome = () => (
	<div className="z3-c-accounts-home">
		<div className="z3-c-accounts-home__container">
			<div className="z3-c-accounts-home__assets">
				<div className="border p-5">
					<Text block>Lorem Ipsum is simply</Text>
					<Text block bold size="xl4">
						Lorem Ipsum is simply
					</Text>
				</div>
				<div className="p-5" style={{ overflow: 'auto' }}>
					<div>
						<Text size="xl5" className="border-">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
							of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
							like Aldus PageMaker including versions of Lorem Ipsum.
						</Text>
					</div>
				</div>
			</div>
			<div className="z3-c-accounts-home__cards">
				<div className="border p-5">
					<Text block>Lorem Ipsum is simply</Text>
					<Text block bold size="xl4">
						Lorem Ipsum is simply
					</Text>
				</div>
				<div className="p-5" style={{ overflow: 'auto' }}>
					<div>
						<Text size="xl5" className="border-">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
							of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
							like Aldus PageMaker including versions of Lorem Ipsum.
						</Text>
					</div>
				</div>
			</div>
		</div>
	</div>
)
