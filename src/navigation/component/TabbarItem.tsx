import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
  View,
  ImageStyle,
  Text,
} from 'react-native';

import {useStyle} from '@src/hooks/useStyle';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

interface Props {
  title?: string;
  onPress(): void;
  activeTab: boolean;
  image: ImageSourcePropType;
  style?: ViewStyle;
  options: BottomTabNavigationOptions;
  imageContainerStyle: ImageStyle;
}

export function TabbarItem({
  options,
  onPress,
  activeTab,
  image: source,
  style,
  imageContainerStyle,
  title,
}: Props) {
  const imageStyle = useStyle(
    () => ({
      tintColor: activeTab
        ? options.tabBarActiveTintColor
        : options.tabBarInactiveTintColor,
    }),
    [activeTab],
  );

  const textStyle = useStyle(
    () => ({
      color: activeTab
        ? options.tabBarActiveTintColor
        : options.tabBarInactiveTintColor,
    }),
    [activeTab],
  );

  return (
    <TouchableOpacity
      style={[styles.itemContainer, style]}
      onPress={onPress}
      disabled={activeTab}
      activeOpacity={0.7}>
      <View style={[styles.imageContainer]}>
        <Image source={source} style={[imageContainerStyle, imageStyle]} />
      </View>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    alignSelf: 'center',
  },
});
