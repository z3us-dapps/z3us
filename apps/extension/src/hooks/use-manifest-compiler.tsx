import init from 'pte-manifest-compiler'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useManifestCompoler = () => {
	useEffect(() => {
		const wasmPath = browser.runtime.getURL('pte_manifest_compiler_bg.wasm')
		// eslint-disable-next-line no-console
		init(wasmPath).catch(console.error)
	})
}
