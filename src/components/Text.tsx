import {colors} from '@src/theme'
import {FONTS} from '@src/theme/font'
import React from 'react'
import {Text as RnText, TextProps, StyleSheet} from 'react-native'

interface Props extends TextProps {
  children: React.ReactNode
}

export function Text({style, ...props}: Props) {
  return <RnText style={[styles.base, style]} {...props} />
}

const styles = StyleSheet.create({
  base: {
    ...FONTS.poppinsRegular,
    color: colors.black,
  },
})
