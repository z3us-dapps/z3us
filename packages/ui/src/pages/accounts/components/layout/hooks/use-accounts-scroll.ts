import { useCallback, useEffect, useMemo, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

interface IScrollCtx {
	scrollableNode: HTMLElement | undefined
	isScrolledTop: boolean
}

interface IAccountsScrollObj {
	leftScrollCtx: IScrollCtx
	rightScrollCtx: IScrollCtx
	isLeftScrollUpButtonVisible: boolean
	isRightScrollUpButtonVisible: boolean
	onLeftScrollUpBtnClick: () => void
	onRightScrollUpBtnClick: () => void
}

const SCROLL_TOP_BUTTON_VISIBLE_PX = 100

const useAccountsScroll = (
	leftRef: React.RefObject<HTMLElement>,
	rightRef: React.RefObject<HTMLElement>,
	mainRef: React.RefObject<HTMLElement>,
	pathName = '',
): IAccountsScrollObj => {
	const isMobile = useIsMobileWidth()
	const [isLeftScrolledTop, setIsLeftScrolledTop] = useState<boolean>(true)
	const [isRightScrolledTop, setIsRightScrolledTop] = useState<boolean>(true)
	const [isLeftScrollUpButtonVisible, setIsLeftScrollUpButtonVisible] = useState<boolean>(false)
	const [isRightScrollUpButtonVisible, setIsRightScrollUpButtonVisible] = useState<boolean>(false)
	const [currentPath, setCurrentPath] = useState<string>(pathName)

	const rightScrollCtx = useMemo(
		() => ({
			scrollableNode: rightRef.current,
			isScrolledTop: isRightScrolledTop,
		}),
		[rightRef.current, isRightScrolledTop],
	)

	const leftScrollCtx = useMemo(
		() => ({
			scrollableNode: isMobile ? mainRef.current : leftRef.current,
			isScrolledTop: isLeftScrolledTop,
		}),
		[leftRef.current, isLeftScrolledTop, isMobile],
	)

	const handleLeftScroll = useCallback(
		(event: Event) => {
			const { scrollTop } = event.target as HTMLElement

			setIsLeftScrolledTop(scrollTop === 0)
			setIsLeftScrollUpButtonVisible(scrollTop > SCROLL_TOP_BUTTON_VISIBLE_PX)
		},
		[isLeftScrolledTop, isLeftScrollUpButtonVisible],
	)

	const handleLeftScrollUpButtonClick = useCallback(() => {
		if (leftScrollCtx.scrollableNode) {
			leftScrollCtx.scrollableNode.scrollTo({
				top: 0,
			})
		}
	}, [leftScrollCtx.scrollableNode])

	const handleRightScrollUpButtonClick = useCallback(() => {
		if (rightScrollCtx.scrollableNode) {
			rightScrollCtx.scrollableNode.scrollTo({
				top: 0,
			})
		}
	}, [rightScrollCtx.scrollableNode])

	const handleRightScroll = useCallback(
		(event: Event) => {
			const { scrollTop } = event.target as HTMLElement

			setIsRightScrolledTop(scrollTop === 0)
			setIsRightScrollUpButtonVisible(scrollTop > SCROLL_TOP_BUTTON_VISIBLE_PX)
		},
		[isRightScrolledTop, setIsRightScrollUpButtonVisible],
	)

	useEventListener('scroll', handleLeftScroll, leftRef)

	useEventListener('scroll', handleRightScroll, rightRef)

	useEffect(() => {
		if (pathName !== currentPath) {
			rightScrollCtx.scrollableNode.scrollTo({
				top: 0,
			})

			if (pathName === '/accounts') {
				leftScrollCtx.scrollableNode.scrollTo({
					top: 0,
				})
			}
		}

		setCurrentPath(pathName)
	}, [pathName, rightScrollCtx.scrollableNode])

	return {
		leftScrollCtx,
		rightScrollCtx,
		isLeftScrollUpButtonVisible,
		isRightScrollUpButtonVisible,
		onLeftScrollUpBtnClick: handleLeftScrollUpButtonClick,
		onRightScrollUpBtnClick: handleRightScrollUpButtonClick,
	}
}

export default useAccountsScroll
