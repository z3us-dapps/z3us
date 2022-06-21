import { useEffect, useState } from 'react'
import { Configuration, DefaultApi } from 'pte-sdk'
import { ec as Elliptic } from 'elliptic'
import { useStore } from '@src/store'

const p256 = new Elliptic('p256')

export const useBabylonPTE = (basePath: string = 'https://pte01.radixdlt.com') => {
	const { account } = useStore(state => ({
		account: state.account,
	}))
	const [service, setService] = useState<DefaultApi>(
		new DefaultApi(
			new Configuration({
				basePath,
			}),
		),
	)
	const [publicKey, setPublicKey] = useState<string>('')

	useEffect(() => {
		setService(
			new DefaultApi(
				new Configuration({
					basePath,
				}),
			),
		)
	}, [basePath])

	useEffect(() => {
		if (!account) return
		setPublicKey(p256.keyFromPublic(account.publicKey.asData({ compressed: true })).getPublic(false, 'hex'))
	}, [account])

	return { service, publicKey }
}
