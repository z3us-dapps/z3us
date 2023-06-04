import type { HDNodeT } from '@radixdlt/application';
import { HDMasterSeed, HDNode } from '@radixdlt/application'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

import { useSharedStore } from '@src/hooks/use-store'

interface ImmerT {
	hdNode: HDNodeT | null
	error: string
}

export const useOnboardingLocalHDNode = () => {
	const { mnemonic, privateKey } = useSharedStore(state => ({
		mnemonic: state.mnemonic,
		privateKey: state.privateKey,
	}))

	const [state, setState] = useImmer<ImmerT>({
		hdNode: null,
		error: '',
	})

	useEffect(() => {
		if (mnemonic) {
			const seed = HDMasterSeed.fromMnemonic({ mnemonic })
			const hdNode = seed.masterNode()

			setState(draft => {
				draft.hdNode = hdNode
			})
		} else if (privateKey) {
			const hdNodeResult = HDNode.fromExtendedPrivateKey(privateKey)
			if (hdNodeResult.isErr()) {
				setState(draft => {
					draft.hdNode = null
					draft.error = hdNodeResult.error.toString().trim()
				})
			} else {
				setState(draft => {
					draft.hdNode = hdNodeResult.value
					draft.error = ''
				})
			}
		}
	}, [mnemonic, privateKey])

	return state
}
