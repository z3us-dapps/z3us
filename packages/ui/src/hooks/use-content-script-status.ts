import { useContext } from 'react'

import { ContentScriptStatusContext } from 'ui/src/context/content-script'

export const useContentScriptStatus = () => useContext(ContentScriptStatusContext)!
