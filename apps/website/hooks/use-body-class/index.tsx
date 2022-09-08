import { useEffect } from 'react'
import { useRouter } from 'next/router'

const bodyClasses = {
	home: { className: 'home-page', path: '/' },
	tokenomics: { className: 'tokenomics-page', path: '/tokenomics' },
}

export const getPageClassName = (page: string) => {
	let className = ''

	if (page === bodyClasses.home.path) {
		className = bodyClasses.home.className
	}
	if (page === bodyClasses.tokenomics.path) {
		className = bodyClasses.tokenomics.className
	}

	return className
}

export const useBodyClass = () => {
	const router = useRouter()

	useEffect(() => {
		const current = Object.values(bodyClasses).find(({ path }) => path === router.asPath)

		if (!document.body.classList.contains(current?.className)) {
			Object.values(bodyClasses).forEach(entry => document.body.classList.remove(entry?.className))

			document.body.classList.add(current?.className)
		}
	}, [router.asPath])
}
