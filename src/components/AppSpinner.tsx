import * as React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

interface Props extends ActivityIndicatorProps {
  active?: boolean;
}

export function AppSpinner({color = '#4B385B', active = true}: Props) {
  if (!active) {
    return null;
  }
  return <ActivityIndicator color={color} size={25} />;
}
