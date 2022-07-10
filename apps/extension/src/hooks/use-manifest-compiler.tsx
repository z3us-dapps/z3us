import browser from 'webextension-polyfill'
import { useEffect } from 'react'
import init from 'pte-manifest-compiler'

export const useManifestCompoler = () => {
	useEffect(() => {
		const wasmPath = browser.runtime.getURL('pte_manifest_compiler_bg.wasm')
		// eslint-disable-next-line no-console
		init(wasmPath).catch(console.error)
	})
}
