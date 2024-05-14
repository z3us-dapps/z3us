import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDebounceCallback, useEventListener, useResizeObserver } from 'usehooks-ts'

interface IAccountsExpandObj {
	isExpanded: boolean
	onExpandAccounts: () => void
}

const MIN_SCROLL_HEIGHT = 370

const useAccountsExpand = (
	mainRef: React.RefObject<HTMLElement>,
	buttonsRef: React.RefObject<HTMLElement>,
): IAccountsExpandObj => {
	const location = useLocation()
	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const [minScrollHeight, setMinScrollHeight] = useState<number>(MIN_SCROLL_HEIGHT)

	const handleClickExpandAccounts = useCallback(() => {
		const elem = mainRef.current as HTMLElement

		if (isExpanded) {
			elem?.scrollTo({ behavior: 'smooth', top: 0 })
		} else {
			elem?.scrollTo({ behavior: 'smooth', top: minScrollHeight })
		}
	}, [mainRef.current, isExpanded, minScrollHeight])

	const handleScroll = useCallback(
		(event: Event) => {
			if (!mainRef.current) return

			const { scrollHeight, clientHeight } = mainRef.current
			const elem = event.target as HTMLElement
			const { scrollTop } = elem
			const maxScroll = scrollHeight - clientHeight

			setIsExpanded(scrollTop >= minScrollHeight || scrollTop === maxScroll)
		},
		[mainRef.current, isExpanded, minScrollHeight],
	)

	useEventListener('scroll', handleScroll, mainRef)

	const getMinScrollHeight = () => {
		const mainScrollElem = mainRef.current as HTMLElement
		const buttonElem = buttonsRef.current as HTMLElement

		if (mainScrollElem && buttonElem) {
			const mainRect = mainScrollElem.getBoundingClientRect()
			const buttonRect = buttonElem.getBoundingClientRect()
			const distance = buttonRect.top - mainRect.top

			setMinScrollHeight(distance)
		}
	}

	const onResize = useDebounceCallback(getMinScrollHeight, 200)

	useResizeObserver({
		ref: mainRef,
		onResize,
	})

	useEffect(() => {
		getMinScrollHeight()
	}, [mainRef.current, buttonsRef.current, location.pathname])

	return {
		isExpanded,
		onExpandAccounts: handleClickExpandAccounts,
	}
}

export default useAccountsExpand
