import React from 'react'
import browser, { Scripting } from 'webextension-polyfill'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { constcontentScriptId } from '@src/config'
import { CheckboxIcon } from '@radix-ui/react-icons'

export const Inject = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/inject/:id')

	const { action, approveWebsite, blockWebsite } = useNoneSharedStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		approveWebsite: state.approveWebsiteAction,
		blockWebsite: state.blockWebsiteAction,
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const { host, request = {} } = action
	const { tabUrl = '' } = request

	const handleBlock = async () => {
		blockWebsite(host)
		window.close()
	}

	const handleConfirm = async () => {
		const url = new URL(tabUrl)
		const origin = `${url.origin}/*`
		const origins = [origin]

		const hasPermissions = await browser.permissions.contains({
			origins,
		})
		if (!hasPermissions) {
			const granted = await browser.permissions.request({ origins })
			if (!granted) {
				window.close()
				return
			}
		}
		const currentScripts = await browser.scripting.getRegisteredContentScripts({ ids: [constcontentScriptId] })
		if (currentScripts.length > 0) {
			const [contentScript] = currentScripts
			contentScript.matches.push(origin)
			await browser.scripting.updateContentScripts([contentScript as Scripting.UpdateContentScriptsScriptsItemType])
		} else {
			const contentScript = {
				id: constcontentScriptId,
				allFrames: true,
				persistAcrossSessions: true,
				runAt: 'document_start',
				js: ['src/lib/content-script.js'],
				matches: [origin],
			}
			await browser.scripting.registerContentScripts([contentScript as Scripting.RegisteredContentScript])
		}
		approveWebsite(host)
		window.close()
	}

	return (
		<>
			<PageWrapper css={{ flex: '1' }}>
				<Box>
					<PageHeading>Connect</PageHeading>
					<PageSubHeading>
						Connect to{' '}
						<StyledLink underline href="#" target="_blank">
							{host}
						</StyledLink>
					</PageSubHeading>
				</Box>
				<Box
					css={{
						borderTop: '1px solid $borderPanel',
						py: '$5',
					}}
				>
					<Text medium size="5">
						{host}
					</Text>
					<Text size="3" color="muted" css={{ mt: '$2' }}>
						This host would like to:
					</Text>
					<Box as="ul" css={{ mt: '$4' }}>
						<Flex align="center" as="li">
							<Box css={{ mr: '$2', mt: '2px' }}>
								<CheckboxIcon />
							</Box>
							<Text>View wallet balance.</Text>
						</Flex>
						<Flex align="center" as="li" css={{ mt: '$1' }}>
							<Box css={{ mr: '$2', mt: '2px' }}>
								<CheckboxIcon />
							</Box>
							<Text>Request approval for transactions.</Text>
						</Flex>
					</Box>
				</Box>
			</PageWrapper>

			<PageWrapper css={{ display: 'flex' }}>
				<Button
					onClick={handleBlock}
					size="6"
					color="tertiary"
					aria-label="block"
					css={{ px: '0', flex: '1', mr: '$1' }}
				>
					Block
				</Button>
				<Button
					onClick={handleConfirm}
					size="6"
					color="primary"
					aria-label="confirm"
					css={{ px: '0', flex: '1', ml: '$1' }}
				>
					Allow and connect
				</Button>
			</PageWrapper>
		</>
	)
}

export default Inject
