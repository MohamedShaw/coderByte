import * as React from 'react'
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native'

import {colors} from '@src/theme'

interface Props extends ActivityIndicatorProps {
  active?: boolean
}

export function AppSpinner({color = '#FDE460', active = true}: Props) {
  if (!active) return null
  return <ActivityIndicator color={color} size={35}/>
}
