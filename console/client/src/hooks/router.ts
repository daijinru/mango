import React from 'react'
import { UNSAFE_NavigationContext, unstable_HistoryRouter } from 'react-router-dom'
import { type History } from '@remix-run/router'

export const useHistory = () => {
  const navigator = React.useContext(UNSAFE_NavigationContext).navigator
  return navigator as History
}
