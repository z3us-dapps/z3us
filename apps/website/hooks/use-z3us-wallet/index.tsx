import { AccountAddress, AccountAddressT } from '@radixdlt/application'
import { useEffect, useState } from 'react'

type Z3US = {
	v1: {
		hasWallet: () => Promise<boolean>
		isConnected: () => Promise<boolean>
		connect: () => Promise<string>
		disconnect: () => Promise<void>
		accounts: () => Promise<string[]>
		balances: () => Promise<unknown>
		stakes: () => Promise<unknown>
		unstakes: () => Promise<unknown>
		sign(challenge: string): Promise<string>
		submitTransaction: (payload: {
			manifest?: string
			actions?: any[]
			message?: string
			encryptMessage?: boolean
		}) => Promise<unknown>
	}
}

declare global {
	interface Window {
		z3us: Z3US
	}
}

export const useZ3usWallet = () => {
	const [z3us, setZ3US] = useState<Z3US | null>(null)
	const [isLoaded, setIsLoaded] = useState<boolean>(!!z3us)
	const [address, setAddress] = useState<AccountAddressT | null>(null)

	const init = (z: Z3US) => {
		if (z3us) return
		setZ3US(z)
		setIsLoaded(true)
	}

	const connect = async () => {
		const hasWallet = await z3us?.v1.hasWallet()
		if (!hasWallet) {
			setAddress(null)
			return
		}
		const selectedAddress = await z3us?.v1.connect()
		const addressResult = AccountAddress.fromUnsafe(selectedAddress)
		if (addressResult.isErr()) {
			setAddress(null)
			throw addressResult.error
		}
		setAddress(addressResult.value)
	}

	const disconnect = async () => {
		setAddress(null)
		if (!z3us) return
		await z3us?.v1.disconnect()
	}

	const handleKeystoreChange = async () => {
		if (await z3us?.v1.isConnected()) {
			await connect()
		} else {
			setAddress(null)
		}
	}

	/*
	 * When our component first mounts, let's check to see if we have a connected
	 */
	useEffect(() => {
		if (window.z3us) init(window.z3us)

		window.addEventListener('z3us.init', (event: CustomEvent) => init(event.detail), { once: true })
		window.addEventListener('z3us.keysotre.change', handleKeystoreChange, false)
		window.addEventListener('z3us.account.change', (event: CustomEvent) => setAddress(event.detail.address), false)
	}, [])

	/*
	 * When our component first mounts, let's check to see if we have a connected
	 */
	useEffect(() => {
		if (!isLoaded) return
		const onLoad = async () => {
			try {
				if (await z3us?.v1.isConnected()) {
					await connect()
				}
			} catch (error: unknown) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}

		onLoad()
	}, [isLoaded])

	return {
		...z3us?.v1,
		address,
		connect,
		disconnect,
		isLoaded,
	}
}
