import { useEffect, useState } from 'react'
import { AccountAddress, AccountAddressT } from '@radixdlt/application'

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
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [address, setAddress] = useState<AccountAddressT | null>(null)

	const connect = async () => {
		if (!z3us) return
		const hasWallet = await z3us?.v1.hasWallet()
		if (!hasWallet) {
			setAddress(null)
			return
		}
		const selectedAddress = await z3us?.v1.connect()
		console.info(selectedAddress)
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

	/*
	 * When our component first mounts, let's check to see if we have a connected
	 */
	useEffect(() => {
		window.addEventListener(
			'z3us.init',
			(event: CustomEvent) => {
				setZ3US(event.detail)
				setIsLoaded(true)
			},
			{ once: true },
		)
		window.addEventListener('z3us.keysotre.change', connect, false)
		window.addEventListener('z3us.account.change', connect, false)

		if (window.z3us && !z3us) {
			setZ3US(window.z3us)
			setIsLoaded(true)
		}
	}, [])

	/*
	 * When our component first mounts, let's check to see if we have a connected
	 */
	useEffect(() => {
		if (!isLoaded) return
		const onLoad = async () => {
			try {
				const hasWallet = await z3us?.v1.hasWallet()
				if (!hasWallet) {
					return
				}
				const connected = await z3us?.v1.isConnected()
				if (connected) {
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
