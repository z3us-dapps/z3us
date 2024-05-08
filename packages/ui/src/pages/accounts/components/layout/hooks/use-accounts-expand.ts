import { useCallback, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

interface IAccountsExpandObj {
	isExpanded: boolean
	onExpandAccounts: () => void
}

const MIN_SCROLL_HEIGHT = 370

const useAccountsExpand = (mainRef: React.RefObject<HTMLElement>): IAccountsExpandObj => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false)

	const handleClickExpandAccounts = useCallback(() => {
		const elem = mainRef.current as HTMLElement

		if (isExpanded) {
			elem?.scrollTo({ behavior: 'smooth', top: 0 })
		} else {
			elem?.scrollTo({ behavior: 'smooth', top: MIN_SCROLL_HEIGHT })
		}
	}, [mainRef.current, isExpanded])

	const handleScroll = useCallback(
		(event: Event) => {
			if (!mainRef.current) return

			const { scrollHeight, clientHeight } = mainRef.current
			const elem = event.target as HTMLElement
			const { scrollTop } = elem
			const maxScroll = scrollHeight - clientHeight

			setIsExpanded(scrollTop >= MIN_SCROLL_HEIGHT || scrollTop === maxScroll)
		},
		[mainRef.current, isExpanded],
	)

	useEventListener('scroll', handleScroll, mainRef)

	return {
		isExpanded,
		onExpandAccounts: handleClickExpandAccounts,
	}
}

export default useAccountsExpand
