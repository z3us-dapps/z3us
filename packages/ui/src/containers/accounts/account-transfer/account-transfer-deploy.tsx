/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Dropzone } from 'ui/src/components/dropzone'
import { type FormElement, Input } from 'ui/src/components/input'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { AccountDropdown } from 'ui/src/containers/accounts/account-dropdown'

import { AccountTransfer } from './account-transfer'

export const AccountTransferDeploy: React.FC = () => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	return (
		<AccountTransfer
			transaction={null}
			title={<Translation capitalizeFirstLetter text="transfer.navigation.transferDeployPackage" />}
			description="Deploy a new blueprint package to the Radix Betanet by attaching your WASM and ABI files to a deploy transaction."
		>
			<Box>
				<Box>
					<Dropzone title="Drop the package WASM file here, or browse" />
				</Box>
				<Box paddingTop="large">
					<Text>
						To control aspects of the package you deploy, like setting metadata or claiming royalties, you must specify
						a badge NFT for authorization.
						<br />
						<br />
						Choose one of your accounts where you have a badge, or where you’d like to hold one.
					</Text>
				</Box>
				<Box paddingTop="large">
					<Box paddingBottom="small">
						<Text size="small">Account</Text>
					</Box>
					<AccountDropdown
						account="1"
						accountReadableName="1"
						onUpdateAccount={() => {}}
						accounts={[
							{ id: '1', title: 'hhdh' },
							{ id: 'he', title: 'hhdhfidhf' },
							{ id: 'h7474747', title: 'difudifu' },
						]}
						// styleVariant={getError(validation, ['from']).error ? 'tertiary-error' : 'tertiary'}
					/>
				</Box>
				<Box paddingTop="large">
					<Box paddingBottom="small">
						<Text size="small">Nft</Text>
					</Box>
					<AccountDropdown
						account="1"
						accountReadableName="1"
						onUpdateAccount={() => {}}
						accounts={[
							{ id: '1', title: 'hhdh' },
							{ id: 'he', title: 'hhdhfidhf' },
							{ id: 'h7474747', title: 'difudifu' },
						]}
						// styleVariant={getError(validation, ['from']).error ? 'tertiary-error' : 'tertiary'}
					/>
				</Box>
			</Box>
		</AccountTransfer>
	)
}
