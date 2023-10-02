import { QRCodeSVG } from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Navigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'
import { KeystoreType } from 'ui/src/store/types'
import { Theme } from 'ui/src/types/types'

import ExportForm from './components/export-form'

const emojiRegex = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu
// eslint-disable-next-line no-control-regex
const unicodeRegex = /[^\u0000-\u007F]/gu

const END_OF_HEADER = ']'
const INTRA_SEPARATOR = '^'
const INTER_SEPARATOR = '~'
const END_OF_ACCOUNT_NAME = '}'

const FORBIDDEN_CHARACTERS = [END_OF_HEADER, INTRA_SEPARATOR, INTER_SEPARATOR, END_OF_ACCOUNT_NAME]
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

const accountSummary = (index: number, publicKeyHex: string, name: string, isLocal: boolean): string => {
	const localType = isLocal ? 'S' : 'H'
	const compressedKey = compressPublicKeyToHex(publicKeyHex)
	return accountToExportPayload(localType, compressedKey, index, name)
}

const exportAsCode = (accounts: string[], payloadSize: number, mnemonicLength: number): string[] => {
	const allAccounts = accounts.join(INTER_SEPARATOR)
	const payloadsWithoutHeaders = allAccounts.match(new RegExp(`.{1,${payloadSize}}`, 'g')) || []
	const payloadTotal = payloadsWithoutHeaders.length
	return payloadsWithoutHeaders.map(
		(payload, index) =>
			`${payloadTotal}${INTRA_SEPARATOR}${index}${INTRA_SEPARATOR}${mnemonicLength}${END_OF_HEADER}${payload}`,
	)
}

const messages = defineMessages({
	unknown_account: {
		id: 'keystore.export.unknown_account',
		defaultMessage: `{hasLabel, select,
			true {{label}}
			other {Account: {position}}
		}`,
	},
})

export const Export: React.FC = () => {
	const intl = useIntl()
	const { resolvedTheme } = useTheme()
	const networkId = useNetworkId()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { indexes, addressBook } = useNoneSharedStore(state => ({
		indexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const [secret, setSecret] = useState<string | undefined>()
	const [exports, setExports] = useState<string[]>([])

	useEffect(() => {
		const load = async () => {
			try {
				const summaries = Object.keys(indexes)
					.filter(idx => !!indexes[idx].olympiaAddress)
					.map((idx, position) =>
						accountSummary(
							+idx,
							indexes[idx].publicKeyHex,
							intl.formatMessage(messages.unknown_account, {
								hasLabel: !!addressBook[indexes[idx].address]?.name,
								label: addressBook[indexes[idx].address]?.name,
								position,
							}),
							keystore.type === KeystoreType.LOCAL,
						),
					)
				setExports(exportAsCode(summaries, 1800, secret.split(' ')?.length || 24))
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err)
				setExports([])
			}
		}
		if (secret !== undefined) load()
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
