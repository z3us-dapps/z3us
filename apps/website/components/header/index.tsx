import clsx from 'clsx'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { GithubIcon, TelegramIcon, XIcon } from './icons'

// import { MobileMenu } from './mobile-menu'

interface IProps {
	className?: string | undefined
	notTabletSticky?: boolean
}

const defaultProps = {
	className: undefined,
	notTabletSticky: false,
}

export const Header: React.FC<IProps> = ({ className, notTabletSticky }) => {
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
								<Image src="/images/landing-page-2023/header-z3us-logo.svg" alt="Z3US logo" width={424.5} height={24} />
							</a>
						</Link>
					</div>
					{/* <MobileMenu /> */}
					<ul className="font-medium text-sm gap-3 lg:gap-5 hidden md:flex items-center">
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
								className="header-icon-x cursor-pointer inline-flex items-center justify-center fill-inherit hover:opacity-60 transition-opacity"
								href={config.TWITTER_URL}
							>
								<XIcon />
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
					</ul>
				</div>
			</PageContainer>
		</div>
	)
}

Header.defaultProps = defaultProps
