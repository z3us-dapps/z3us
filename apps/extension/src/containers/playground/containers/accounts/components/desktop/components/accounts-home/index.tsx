/* eslint-disable */
import React from 'react'
import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { motion, LayoutGroup } from 'framer-motion'

import './accounts-home.css'

export const AccountsHome = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100 opacity-5">accounts</div>
	</div>
)
