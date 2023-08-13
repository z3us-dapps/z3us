import React, { useEffect, useRef } from 'react'

import { AccountDropdown } from 'ui/src/components/account-dropdown'
import { Box } from 'ui/src/components/box'
import { Dropzone } from 'ui/src/components/dropzone'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import { TransferWrapper } from '../components/transfer-wrapper'

export const Deploy: React.FC = () => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	return (
		<TransferWrapper
			transaction={null}
			title={<Translation capitalizeFirstLetter text="transfer.deploy.title" />}
			description={<Translation capitalizeFirstLetter text="transfer.deploy.description" />}
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
		</TransferWrapper>
	)
}

export default Deploy
