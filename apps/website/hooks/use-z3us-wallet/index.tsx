import { useEffect, useState } from 'react'
import { AccountAddress, AccountAddressT } from '@radixdlt/application'

declare global {
	interface Window {
		z3us: {
			v1: {
				hasWallet: () => Promise<boolean>
				isConnected: () => Promise<boolean>
				connect: () => Promise<string>
				addresses: () => Promise<string[]>
				disconnect: () => Promise<any>
				balances: () => Promise<any>
				stakes: () => Promise<any>
				unstakes: () => Promise<any>
				submitTransaction: (payload: {
					manifest?: string
					actions?: any[]
					message?: string
					encryptMessage?: boolean
				}) => Promise<any>
			}
		}
	}
}

let z3us = null
if (typeof window !== 'undefined') {
	z3us = window.z3us
}

export const useZ3usWallet = () => {
	const [address, setAccount] = useState<AccountAddressT | null>(null)

	const connect = async () => {
		const hasWallet = await window.z3us.v1.hasWallet()
		if (!hasWallet) {
			return
		}
		const selectedAddress = await window.z3us.v1.connect()
		const addressResult = AccountAddress.fromUnsafe(selectedAddress)
		if (addressResult.isErr()) {
			throw addressResult.error
		}
		setAccount(addressResult.value)
	}

	const disconnect = async () => {
		await window.z3us.v1.disconnect()
		setAccount(null)
	}

	/*
	 * When our component first mounts, let's check to see if we have a connected
	 */
	useEffect(() => {
		const onLoad = async () => {
			try {
				const hasWallet = await window.z3us.v1.hasWallet()
				if (!hasWallet) {
					return
				}
				const connected = await window.z3us.v1.isConnected()
				if (connected) {
					await connect()
				}
			} catch (error: unknown) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}

		onLoad()
	}, [])

	return {
		...z3us?.v1,
		address,
		connect,
		disconnect,
	}
}
