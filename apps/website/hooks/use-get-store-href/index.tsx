import { useEffect, useState } from 'react'
import { config } from 'config'

const fnBrowserDetect = () => {
	const userAgent = navigator?.userAgent
	let browserName: string

	if (userAgent.match(/chrome|chromium|crios/i)) {
		browserName = 'chrome'
	} else if (userAgent.match(/firefox|fxios/i)) {
		browserName = 'firefox'
	} else if (userAgent.match(/safari/i)) {
		browserName = 'safari'
	} else if (userAgent.match(/opr\//i)) {
		browserName = 'opera'
	} else if (userAgent.match(/edg/i)) {
		browserName = 'edge'
	} else {
		browserName = 'No browser detection'
	}
	return browserName
}

export const useGetStoreHref = () => {
	const [ctaLink, setCtaLink] = useState<string>(config.CHROME_STORE_URL)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		const browserName = fnBrowserDetect()
		if (!isMounted) {
			if (browserName === 'firefox') {
				setCtaLink(config.FIREFOX_STORE_URL)
			}
			setIsMounted(true)
		}
	}, [isMounted])

	return ctaLink
}
