import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { useResourceType } from '../../../hooks/use-resource-type'

interface IScrollCtx {
	scrollableNode: HTMLElement | undefined
	isScrolledTop: boolean
}

interface IAccountsScrollObj {
	leftScrollCtx: IScrollCtx
	rightScrollCtx: IScrollCtx
	isLeftScrollUpButtonVisible: boolean
	isRightScrollUpButtonVisible: boolean
	isMainScrollUpButtonVisible: boolean
	showTopShadow: boolean
	showBottomShadow: boolean
	onLeftScrollUpBtnClick: () => void
	onRightScrollUpBtnClick: () => void
}

const SCROLL_TOP_BUTTON_VISIBLE_PX = 100

const useAccountsScroll = (
	leftRef: React.RefObject<HTMLElement>,
	rightRef: React.RefObject<HTMLElement>,
	mainRef: React.RefObject<HTMLElement>,
): IAccountsScrollObj => {
	const isMobile = useIsMobileWidth()
	const location = useLocation()
	const resourceType = useResourceType()
	const { resourceId = '', nftId = '' } = useParams()
	const [currentPath, setCurrentPath] = useState<string>(location.pathname)
	const [isLeftScrolledTop, setIsLeftScrolledTop] = useState<boolean>(true)
	const [isRightScrolledTop, setIsRightScrolledTop] = useState<boolean>(true)
	const [isLeftScrollUpButtonVisible, setIsLeftScrollUpButtonVisible] = useState<boolean>(false)
	const [isRightScrollUpButtonVisible, setIsRightScrollUpButtonVisible] = useState<boolean>(false)
	const [isMainScrollUpButtonVisible, setIsMainScrollUpButtonVisible] = useState<boolean>(false)
	const [showTopShadow, setShowTopShadow] = useState<boolean>(false)
	const [showBottomShadow, setShowBottomShadow] = useState<boolean>(false)

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

	const handleLeftScroll = useCallback(
		(event: Event) => {
			const { scrollTop = 0, scrollHeight = 0, offsetHeight = 0 } = event.target as HTMLElement

			setShowTopShadow(scrollTop > 0)
			setShowBottomShadow(scrollTop + offsetHeight < scrollHeight)

			setIsLeftScrolledTop(scrollTop === 0)
			setIsLeftScrollUpButtonVisible(!isMobile && scrollTop > SCROLL_TOP_BUTTON_VISIBLE_PX)
			setIsMainScrollUpButtonVisible(isMobile && scrollTop > SCROLL_TOP_BUTTON_VISIBLE_PX)
		},
		[
			isLeftScrolledTop,
			isLeftScrollUpButtonVisible,
			leftScrollCtx.scrollableNode,
			isMobile,
			showBottomShadow,
			showTopShadow,
		],
	)

	const handleRightScroll = useCallback(
		(event: Event) => {
			const { scrollTop } = event.target as HTMLElement

			setIsRightScrolledTop(scrollTop === 0)
			setIsRightScrollUpButtonVisible(scrollTop > SCROLL_TOP_BUTTON_VISIBLE_PX)
		},
		[isRightScrolledTop, setIsRightScrollUpButtonVisible, rightScrollCtx.scrollableNode],
	)

	useEffect(() => {
		const scrollElemLeft = leftScrollCtx?.scrollableNode as HTMLElement
		const scrollElemRight = rightScrollCtx?.scrollableNode as HTMLElement

		if (scrollElemLeft && scrollElemRight) {
			scrollElemLeft.addEventListener('scroll', handleLeftScroll)
			scrollElemRight.addEventListener('scroll', handleRightScroll)
		}

		// Cleanup function to remove the event listener
		return () => {
			if (scrollElemLeft && scrollElemRight) {
				scrollElemLeft.removeEventListener('scroll', handleLeftScroll)
				scrollElemRight.removeEventListener('scroll', handleRightScroll)
			}
		}
	}, [leftScrollCtx.scrollableNode, rightScrollCtx.scrollableNode])

	useEffect(() => {
		if (location.pathname === currentPath) return

		rightScrollCtx.scrollableNode?.scrollTo({
			top: 0,
		})

		if (isMobile) {
			mainRef.current?.scrollTo({
				top: 0,
			})
		}

		setCurrentPath(location.pathname)
	}, [location.pathname, isMobile, rightScrollCtx.scrollableNode, mainRef.current])

	useEffect(() => {
		if ((resourceType !== 'nfts' && resourceId) || (resourceType === 'nfts' && nftId)) return
		leftScrollCtx.scrollableNode?.scrollTo({
			top: 0,
		})
	}, [resourceType, resourceId, nftId, leftScrollCtx.scrollableNode])

	return {
		leftScrollCtx,
		rightScrollCtx,
		isLeftScrollUpButtonVisible,
		isRightScrollUpButtonVisible,
		isMainScrollUpButtonVisible,
		showTopShadow,
		showBottomShadow,
		onLeftScrollUpBtnClick: handleLeftScrollUpButtonClick,
		onRightScrollUpBtnClick: handleRightScrollUpButtonClick,
	}
}

export default useAccountsScroll
