import Link from 'next/link'
import { Z3usLogo } from 'ui/src/components/z3us-logo'
import { PageContainer } from 'components/page-container'
import { ThemeSelector } from './theme-selector'

interface IProps {
	className?: string
}

export const Footer = ({ className }: IProps) => (
		<div className={`header ${className}`}>
			<PageContainer>
				<div className="block sm:flex w-100 items-center">
					<div className="flex-1 flex items-center fill-white">
						<Link href="/" passHref>
							<a className="cursor-pointer inline-flex items-center justify-center fill-white hover:fill-violet-50 transition-colors">
								<Z3usLogo className="transition-colors" />
							</a>
						</Link>
						<span className="text-xs pl-2">&copy; {new Date().getFullYear()} Z3US</span>
					</div>
					<ul className="text-sm flex items-center pt-2 sm:pt-0">
						<li className="pr-3">
							<Link href="/privacy" passHref>
								<a className="hover:underline">Privacy</a>
							</Link>
						</li>
						<li className="pr-2">
							<Link href="/terms" passHref>
								<a className="hover:underline">Terms</a>
							</Link>
						</li>
						<li>
							<ThemeSelector />
						</li>
					</ul>
				</div>
			</PageContainer>
		</div>
	)
