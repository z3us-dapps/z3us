/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars, react/require-default-props */
import React, { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import clsx from 'clsx'
import Link from 'next/link'
// import Pill from 'ui/src/components/pill'
import { Button } from 'components/button'
import { Bars4Icon } from '@heroicons/react/24/solid'
import { FlashCtaButton } from 'components/flash-cta-button'
import { Z3usText } from 'ui/src/components/z3us-text'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { TelegramIcon, TwitterIcon, GithubIcon } from './icons'
import { MobileMenu } from './mobile-menu'

interface IProps {
	className?: string | undefined
	isStickyHeader?: boolean
}

const defaultProps = {
	isStickyHeader: false,
}

export const Header: React.FC<IProps> = ({ className, isStickyHeader }) => {
	const [isSticky, setIsSticky] = useState<boolean>(false)
	const { scrollY } = useScroll()

	useEffect(
		() =>
			scrollY.onChange(latest => {
				if (isStickyHeader) {
					setIsSticky(latest > 0)
				}
			}),
		[],
	)

	return (
		<div
			className={clsx(
				'z-20 header transition-all',
				className,
				isSticky && 'sticky top-0 header--sticky backdrop-blur-md shadow-sm dark:shadow-md dark:shadow-[#12001f]',
			)}
		>
			<PageContainer>
				<div className="flex w-100 py-4">
					<div className="flex-1 color-white z-30 flex items-start">
						<Link href="/" passHref>
							<a className="cursor-pointer inline-flex mt-3 hover:opacity-60 transition-opacity">
								<Z3usText css={{ maxWidth: '130px' }} />
							</a>
						</Link>
						{/* <div className="inline-flex pl-2 pt-3"> */}
						{/* 	<Pill data-test-e2e="pill" color="gradientGreen"> */}
						{/* 		BETA */}
						{/* 	</Pill> */}
						{/* </div> */}
					</div>
					<MobileMenu isScrolled={false} />
					<ul className="font-medium text-sm gap-3 lg:gap-5 hidden md:flex items-center">
						<li>
							<Link href="" passHref>
								<a className="cursor-pointer hover:underline">Feedback</a>
							</Link>
						</li>
						<li>
							<Link href="/roadmap" passHref>
								<a className="cursor-pointer hover:underline">Road map</a>
							</Link>
						</li>
						<li>
							<Link href="/docs" passHref>
								<a className="cursor-pointer hover:underline">Docs</a>
							</Link>
						</li>
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
						<li>
							<FlashCtaButton size="base" variant="secondary">
								<span className="hidden lg:block">Get BETA access</span>
								<span className="lg:hidden">Get BETA</span>
							</FlashCtaButton>
						</li>
					</ul>
				</div>
			</PageContainer>
		</div>
	)
}

Header.defaultProps = defaultProps
