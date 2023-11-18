/* eslint-disable */
import NextLink from 'next/link'
import React from 'react'

export default function Settings(props: any) {
	const { pageSeo } = props

	return (
		<div>
			<p>
				hello, this is the settings
				<br />
				<span style={{ color: 'red' }}>{pageSeo.test}</span>
			</p>
			<NextLink href="/">Home</NextLink>
		</div>
	)
}

export const getStaticProps = () => {
	const pageSeo = {
		test: 'hello from settings',
	}

	return {
		props: {
			pageSeo,
		},
	}
}
