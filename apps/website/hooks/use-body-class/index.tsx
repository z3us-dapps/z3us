import { useEffect } from 'react'
import { useRouter } from 'next/router'

const bodyClasses = {
	home: { className: 'home-page', path: '/' },
	tokenomics: { className: 'tokenomics-page', path: '/tokenomics' },
	roadmap: { className: 'roadmap-page', path: '/roadmap' },
	docs: { className: 'docs-page', path: '/docs' },
	terms: { className: 'docs-page', path: '/terms' },
	privacy: { className: 'docs-page', path: '/privacy' },
}

export const getPageClassName = (page: string) => {
	let className = ''
	if (page === bodyClasses.home.path) {
		className = bodyClasses.home.className
	}
	if (page === bodyClasses.tokenomics.path) {
		className = bodyClasses.tokenomics.className
	}
	if (page === bodyClasses.roadmap.path) {
		className = bodyClasses.roadmap.className
	}
	if (page.includes(bodyClasses.docs.path)) {
		className = bodyClasses.docs.className
	}
	return className
}

export const useBodyClass = () => {
	const router = useRouter()

	useEffect(() => {
		const topLevelPath = router.asPath.split('/')?.[1]
		const current = Object.values(bodyClasses).find(({ path }) => path.includes(topLevelPath))

		if (!document.body.classList.contains(current?.className)) {
			Object.values(bodyClasses).forEach(entry => document.body.classList.remove(entry?.className))

			document.body.classList.add(current?.className)
		}
	}, [router.asPath])
}
