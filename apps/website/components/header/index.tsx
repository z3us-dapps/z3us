import clsx from 'clsx'
import { FlashCtaButton } from 'components/flash-cta-button'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { useScroll } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Z3usText } from 'ui/src/components/z3us-text'

import { GithubIcon, TelegramIcon, TwitterIcon } from './icons'
import { MobileMenu } from './mobile-menu'

interface IProps {
	className?: string | undefined
	isBetaButtonVisible?: boolean
	isDocsButtonVisible?: boolean
	notTabletSticky?: boolean
}

const defaultProps = {
	isBetaButtonVisible: true,
	isDocsButtonVisible: true,
	className: undefined,
	notTabletSticky: false,
}

export const Header: React.FC<IProps> = ({ className, isBetaButtonVisible, isDocsButtonVisible, notTabletSticky }) => {
	const [isSticky, setIsSticky] = useState<boolean>(false)
	const { scrollY } = useScroll()

	useEffect(
		() =>
			scrollY.onChange(latest => {
				if (window.innerWidth > 768 && notTabletSticky) return
				setIsSticky(latest > 0)
			}),
		[],
	)

	return (
		<div
			className={clsx(
				'z-20 header transition-all h-16',
				className,
				isSticky ? 'sticky top-0 header--sticky backdrop-blur-md shadow-sm dark:shadow-md dark:shadow-[#12001f]' : '',
				notTabletSticky ? 'md:relative' : '',
			)}
		>
			<PageContainer>
				<div className="flex w-100 py-5">
					<div className="flex-1 color-white z-30 flex items-start">
						<Link href="/" passHref>
							<a className="cursor-pointer inline-flex hover:opacity-60 transition-opacity mt-1">
								<Z3usText css={{ maxWidth: '112px' }} />
							</a>
						</Link>
					</div>
					<MobileMenu />
					<ul className="font-medium text-sm gap-3 lg:gap-5 hidden md:flex items-center">
						<li>
							<Link href={config.HELLO_NEXT_FEEDBACK_URL} passHref>
								<a className="cursor-pointer hover:underline decoration-from-font underline-offset-4" target="_blank">
									Feedback
								</a>
							</Link>
						</li>
						<li>
							<Link href="/roadmap" passHref>
								<a className="cursor-pointer hover:underline decoration-from-font underline-offset-4">Road map</a>
							</Link>
						</li>
						{isDocsButtonVisible ? (
							<li>
								<Link href="/docs" passHref>
									<a className="cursor-pointer hover:underline decoration-from-font underline-offset-4">Docs</a>
								</Link>
							</li>
						) : null}
						<li className="h-6">
							<a
								className="header-icon cursor-pointer inline-flex items-center justify-center fill-inherit hover:opacity-60 transition-opacity"
								href={config.TELEGRAM_URL}
							>
								<TelegramIcon />
							</a>
						</li>
						<li className="h-6">
							<a
								className="header-icon cursor-pointer inline-flex items-center justify-center fill-inherit hover:opacity-60 transition-opacity"
								href={config.TWITTER_URL}
							>
								<TwitterIcon />
							</a>
						</li>
						<li className="h-6">
							<a
								className="header-icon cursor-pointer inline-flex items-center justify-center fill-inherit hover:opacity-60 transition-opacity"
								href={config.GITHUB_URL}
							>
								<GithubIcon />
							</a>
						</li>
						{isBetaButtonVisible ? (
							<li>
								<FlashCtaButton size="base" variant="secondary">
									<span className="hidden lg:block">Get BETA access</span>
									<span className="lg:hidden">Get BETA</span>
								</FlashCtaButton>
							</li>
						) : null}
					</ul>
				</div>
			</PageContainer>
		</div>
	)
}

Header.defaultProps = defaultProps
