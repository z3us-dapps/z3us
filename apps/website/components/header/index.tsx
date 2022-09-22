/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars, react/require-default-props */
import React from 'react'
import Link from 'next/link'
import { Button } from 'components/button'
import { Bars4Icon } from '@heroicons/react/24/solid'
import { FlashCtaButton } from 'components/flash-cta-button'
import { Z3usText } from 'ui/src/components/z3us-text'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { TelegramIcon, TwitterIcon, GithubIcon } from './icons'
import { MobileMenu } from './mobile-menu'

interface IProps {
	className?: string
}

export const Header = ({ className }: IProps) => (
	<div className={`${className} z-20 header`}>
		<PageContainer>
			<div className="flex w-100 pt-4">
				<div className="flex-1 color-white z-30">
					<Link href="/" passHref>
						<a className="cursor-pointer inline-flex hover:text-violet-50 transition-colors mt-3">
							<Z3usText css={{ maxWidth: '130px' }} />
						</a>
					</Link>
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
						<Link href="/tokenomics" passHref>
							<a className="cursor-pointer hover:underline">Tokenomics</a>
						</Link>
					</li>
					<li>
						<Link href="/docs" passHref>
							<a className="cursor-pointer hover:underline">Docs</a>
						</Link>
					</li>

					<li className="h-6">
						<a
							className="header-icon cursor-pointer inline-flex items-center justify-center fill-white hover:fill-violet-50 transition-colors"
							href={config.TELEGRAM_URL}
						>
							<TelegramIcon />
						</a>
					</li>
					<li className="h-6">
						<a
							className="header-icon cursor-pointer inline-flex items-center justify-center fill-white hover:fill-violet-50 transition-colors"
							href={config.TWITTER_URL}
						>
							<TwitterIcon />
						</a>
					</li>
					<li className="h-6">
						<a
							className="header-icon cursor-pointer inline-flex items-center justify-center fill-white hover:fill-violet-50 transition-colors"
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
