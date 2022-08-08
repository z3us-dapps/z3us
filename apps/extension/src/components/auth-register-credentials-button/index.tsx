import React, { useEffect } from 'react'
import { useSharedStore } from '@src/store'
import { useImmer } from 'use-immer'
import Button, { ButtonProps } from 'ui/src/components/button'
import { isWebAuthSupported } from '@src/services/credentials'
import { generateId } from '@src/utils/generate-id'

interface ImmerT {
	isWebAuthSupported: boolean
}

export const RegisterCredentialsButton: React.FC<ButtonProps> = props => {
	const { seed, registerCredential, removeCredential } = useSharedStore(state => ({
		seed: state.masterSeed,
		registerCredential: state.registerCredentialAction,
		removeCredential: state.removeCredentialAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		isWebAuthSupported: false,
	})

	useEffect(() => {
		const load = async () => {
			try {
				const isSupported = await isWebAuthSupported()
				setState(draft => {
					draft.isWebAuthSupported = isSupported
				})
				await removeCredential()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}
		load()
	}, [])

	const handleRegisterCredentials = async event => {
		const id = generateId()
		const key = seed.masterNode().publicKey.toString()

		await registerCredential(id, key, 'Z3US credentials', `authn-${id}`)

		const { onClick } = props
		if (onClick) {
			onClick(event)
		}
	}

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Button {...props} onClick={handleRegisterCredentials} disabled={!seed || !state.isWebAuthSupported} />
	)
}
