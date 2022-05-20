import React from 'react'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface FrontMatter {
	title: string
	hideFromMenu?: boolean
	order?: number
}

interface Doc {
	slug: string
	frontMatter: FrontMatter
}

interface IProps {
	docs: Array<Doc>
}

export const SideMenu: React.FC<IProps> = ({ docs }) => {
	const { pathname, query } = useRouter()
	return (
		<Box>
			<Box
				as="ul"
				css={{
					pt: '$8',
					position: 'sticky',
					top: '81px',
					maxWidth: '240px',
					li: {
						a: {
							position: 'relative',
							transition: '$default',
							br: '12px',
							paddingLeft: '24px',
							display: 'flex',
							alignItems: 'center',
							height: '58px',
							'&:hover': {
								backgroundColor: '$bgPanelHover',
							},
						},
					},
				}}
			>
				{docs
					.filter(doc => !doc.frontMatter.hideFromMenu)
					.sort((a, b) => a.frontMatter.order - b.frontMatter.order)
					.map(doc => (
						<Box as="li" key={doc.slug}>
							<Link href={doc.slug === 'introduction' ? '/docs' : `/docs/${doc.slug}`} passHref>
								<StyledLink
									css={{
										backgroundColor:
											(doc.slug === 'introduction' && pathname === '/docs') || doc.slug === query.slug
												? '$bgPanelHover'
												: 'transparent',
									}}
								>
									<Text displayRound size="5">
										{doc.frontMatter.title}
									</Text>
								</StyledLink>
							</Link>
						</Box>
					))}
			</Box>
		</Box>
	)
}
