import Link from 'next/link'
import { Button } from 'components/button'
import { Z3usText } from 'ui/src/components/z3us-text'
// import { Z3usLogoText } from '../z3us-logo-text'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { TelegramIcon, TwitterIcon, GithubIcon } from './icons'

interface IProps {
	className?: string
}

export const Header = ({ className }: IProps) => (
		<div className={`${className} header`}>
			<PageContainer>
				<div className="flex w-100 pt-4">
					<div className="flex-1 color-white">
						<Link href="/" passHref>
							<a className="cursor-pointer inline-flex hover:text-violet-50 transition-colors mt-3">
								<Z3usText css={{ maxWidth: '108px' }} />
							</a>
						</Link>
					</div>
					<ul className="font-medium text-sm gap-5 hidden md:flex items-center">
						<li>
							<a className="cursor-pointer hover:underline" href={config.GITHUB_FEEDBACK_URL}>
								Feedback
							</a>
						</li>
						<li>
							<Link href="/road-map" passHref>
								<a className="cursor-pointer hover:underline">Road map</a>
							</Link>
						</li>
						{/* <li> */}
						{/* 	<Link href="/tokenomics" passHref> */}
						{/* 		<a className="cursor-pointer hover:underline">Tokenomics</a> */}
						{/* 	</Link> */}
						{/* </li> */}
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
								href={config.DISCORD_URL}
							>
								<TwitterIcon />
							</a>
						</li>
						<li>
							{/* <Button variant="secondary" href={config.CHROME_STORE_URL}> */}
							<Button variant="secondary" href="#">
								Get BETA access
							</Button>
						</li>
					</ul>
				</div>
			</PageContainer>
		</div>
	)
