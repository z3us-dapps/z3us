import { QRCodeSVG } from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'
import { KeystoreType } from 'ui/src/store/types'
import { Theme } from 'ui/src/types/types'

import { OlympiaAddressDetails } from '@src/browser/messages/types'
import { useMessageClient } from '@src/hooks/use-message-client'

import ExportForm from './components/export-form'

const emojiRegex = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu
const unicodeRegex = /[^\u0000-\u007F]/gu

const END__OF_HEADER = ']'
const INTRA_SEPARATOR = '^'
const INTER_SEPARATOR = '~'
const END_OF_ACCOUNT_NAME = '}'

const FORBIDDEN_CHARACTERS = [END__OF_HEADER, INTRA_SEPARATOR, INTER_SEPARATOR, END_OF_ACCOUNT_NAME]
const ACCOUNT_NAME_REPLACEMENT = '_'

type AccountType = 'H' | 'S'
const sanitizeName = (name: string = ''): string => {
	const nameWithoutUnicode = name
		.replace(emojiRegex, ACCOUNT_NAME_REPLACEMENT)
		.replace(unicodeRegex, ACCOUNT_NAME_REPLACEMENT)
	const limitedName = [...nameWithoutUnicode].slice(0, 30).join('')
	const replacedName = FORBIDDEN_CHARACTERS.reduce(
		(acc, forbidden) => acc.replace(forbidden, ACCOUNT_NAME_REPLACEMENT),
		limitedName,
	)
	return `${replacedName}${END_OF_ACCOUNT_NAME}`
}

const compressPublicKeyToHex = (publicKey: string): string => Buffer.from(publicKey, 'hex').toString('base64')

const accountToExportPayload = (
	accountType: AccountType,
	publicKey: string,
	addressIndex: number,
	name: string,
): string => [accountType, publicKey, addressIndex, sanitizeName(name)].join(INTRA_SEPARATOR)

const accountSummary = (data: OlympiaAddressDetails, isLocal: boolean): string => {
	const localType = isLocal ? 'S' : 'H'
	const compressedKey = compressPublicKeyToHex(data.publicKey)
	return accountToExportPayload(localType, compressedKey, data.index, data.label)
}

const exportAsCode = (accounts: string[], payloadSize: number, mnemonicLength: number): string[] => {
	const allAccounts = accounts.join(INTER_SEPARATOR)
	const payloadsWithoutHeaders = allAccounts.match(new RegExp(`.{1,${payloadSize}}`, 'g')) || []
	const payloadTotal = payloadsWithoutHeaders.length
	return payloadsWithoutHeaders.map(
		(payload, index) =>
			`${payloadTotal}${INTRA_SEPARATOR}${index}${INTRA_SEPARATOR}${mnemonicLength}${END__OF_HEADER}${payload}`,
	)
}

export const Export: React.FC = () => {
	const { resolvedTheme } = useTheme()
	const client = useMessageClient()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { indexes, addressBook } = useNoneSharedStore(state => ({
		indexes: state.accountIndexes,
		addressBook: state.addressBook,
	}))

	const [secret, setSecret] = useState<string | undefined>()
	const [exports, setExports] = useState<string[]>([])

	useEffect(() => {
		const load = async () => {
			try {
				const addresses = await client.getOlympiaAddresses(indexes, addressBook)
				const summaries = addresses.map(data => accountSummary(data, keystore.type === KeystoreType.LOCAL))
				const exports = exportAsCode(summaries, 1800, secret.split(' ')?.length || 24)
				setExports(exports)
			} catch (err) {
				console.error(err)
				setExports([])
			}
		}
		secret !== undefined && load()
	}, [secret, indexes, addressBook])

	if (keystore.type !== KeystoreType.LOCAL && keystore.type !== KeystoreType.HARDWARE) {
		return <Navigate to="/" />
	}

	return (
		<Box padding="xxxlarge">
			{secret === undefined && <ExportForm onUnlock={setSecret} />}
			{secret !== undefined && exports.length > 0 && (
				<Box>
					<Box>
						{exports.map(data => (
							<QRCodeSVG
								key={data}
								value={data}
								size={180}
								fgColor={resolvedTheme === Theme.DARK ? '#a6a6a6' : '#161718'}
								bgColor={resolvedTheme === Theme.DARK ? '#161718' : '#ffffff'}
							/>
						))}
					</Box>
					<Box>{secret}</Box>
				</Box>
			)}
		</Box>
	)
}

export default Export
