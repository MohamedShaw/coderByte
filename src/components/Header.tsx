import * as React from 'react'
import {SafeAreaView, View, StyleSheet, TouchableOpacity, ViewStyle, StyleProp} from 'react-native'

import {FONTS, SCREEN, colors} from '@src/theme'
import {Icon} from './Icon'
import {icons} from '@src/assets'
import {useNavigation} from '@react-navigation/native'
import {Text} from './Text'

interface Props {
  title?: string
  rightButtons?: React.ReactNode
  centerTitle?: string
  style?: StyleProp<ViewStyle>
  dark?: boolean
  transparent?: boolean
  hideBack?: boolean
}
export function Header({title, rightButtons, centerTitle, style, dark, transparent, hideBack = false}: Props) {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={[styles.container, style, dark && styles.dark, transparent && styles.transparent]}>
      {/* {Platform.OS === 'android' && <View style={{height: StatusBar.currentHeight}} />} */}
      <View style={styles.wrapper}>
        <View style={styles.left}>
          {!hideBack && (
            <TouchableOpacity style={styles.backImageContainer} onPress={navigation.goBack}>
              {dark ? (
                <Icon name={icons.arrowLeft} color={colors.white} />
              ) : (
                <Icon name={icons.arrowLeft} color={colors.black} />
              )}
            </TouchableOpacity>
          )}

          <Text style={[dark ? styles.darkTitle : styles.title]}>{title}</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>{centerTitle}</Text>
        </View>
        {rightButtons}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  dark: {
    backgroundColor: colors.navBarPrimaryColor,
  },
  transparent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    right: SCREEN.width * 0.3,
    width: SCREEN.width * 0.45,
  },
  title: {
    marginVertical: 20,
    ...FONTS.poppinsSemiBold,
    fontSize: 22,
  },
  darkTitle: {
    color: colors.white,
    marginVertical: 20,
    ...FONTS.poppinsSemiBold,
    fontSize: 22,
  },
  backImageContainer: {
    marginRight: 11,
  },
})
