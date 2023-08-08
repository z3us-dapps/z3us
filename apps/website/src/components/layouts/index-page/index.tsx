import dynamic from 'next/dynamic'
import React from 'react'

const AppPage = dynamic(() => import('../app-page'), { ssr: false })

export const IndexPage: React.FC = () => <AppPage />
