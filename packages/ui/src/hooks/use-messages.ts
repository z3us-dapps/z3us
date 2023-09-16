import { useContext } from 'react'

import { MessagesContext } from 'ui/src/context/messages'

export const useMessages = () => useContext(MessagesContext)!
