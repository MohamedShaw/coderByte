import * as React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {TabbarItem} from './TabbarItem';
import {colors, SCREEN} from '@src/theme';
import {useSelector} from 'react-redux';
import {favoriteCounter} from '@src/slices/product.slice';

const MAIN_TABBAR_HEIGHT = 50;
const TOP_OVERFLOW = 12;
export const TABBAR_HEIGHT = MAIN_TABBAR_HEIGHT + TOP_OVERFLOW;

export function CustomTabbar({
  descriptors,
  state,
  navigation,
}: BottomTabBarProps) {
  const count = useSelector(favoriteCounter);
  const handlePress = React.useCallback(
    ({key, name}: typeof state.routes[0], index: number, activeIndex: number) =>
      () => {
        if (activeIndex !== index) {
          const descriptor = descriptors[key];
          descriptor.navigation.jumpTo(name);
        }
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [descriptors],
  );

  return (
    <View style={styles.wrapContainer}>
      <View style={[styles.row, styles.container]}>
        <TabbarItem
          options={descriptors[state.routes[0].key].options}
          image={require('@src/assets/home.png')}
          title="Home"
          onPress={handlePress(state.routes[0], 0, state.index)}
          activeTab={state.index === 0}
          imageContainerStyle={styles.homeImage}
        />

        <TabbarItem
          options={descriptors[state.routes[1].key].options}
          image={require('@src/assets/category.png')}
          title="Category"
          onPress={handlePress(state.routes[1], 1, state.index)}
          activeTab={state.index === 1}
          imageContainerStyle={styles.walletImage}
        />

        <View style={{flex: 1}}>
          <TabbarItem
            options={descriptors[state.routes[2].key].options}
            image={require('@src/assets/favorite.png')}
            title="Favorite"
            onPress={handlePress(state.routes[2], 2, state.index)}
            activeTab={state.index === 2}
            imageContainerStyle={styles.activityImage}
          />
          {count > 0 ? (
            <View style={styles.fav}>
              <Text style={{fontSize: 10, color: 'white'}}>25</Text>
            </View>
          ) : null}
        </View>
        <TabbarItem
          options={descriptors[state.routes[3].key].options}
          image={require('@src/assets/profile.png')}
          title="Profile"
          onPress={handlePress(state.routes[3], 3, state.index)}
          activeTab={state.index === 3}
          imageContainerStyle={styles.profileImage}
        />
      </View>

      <SafeAreaView style={styles.safeArea} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  safeArea: {backgroundColor: colors.white},
  wrapContainer: {position: 'absolute', bottom: 0, left: 0, right: 0},
  homeImage: {width: 17.8, height: 17.8},
  walletImage: {width: 19.01, height: 15.48},
  activityImage: {width: 19.16, height: 15.61},
  profileImage: {width: 13.72, height: 17.41},
  scanImage: {width: 23, height: 23},
  container: {
    height: TABBAR_HEIGHT,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
  },
  scanItemContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    aspectRatio: 1,
    borderRadius: 100,
    height: 50,

    alignSelf: 'center',
  },
  scanItem: {
    aspectRatio: 1,
    padding: 5,
    borderRadius: 200,
    height: TABBAR_HEIGHT + 20 / SCREEN.scale,
    transform: [{translateY: -50 / SCREEN.scale}],
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fav: {
    position: 'absolute',
    top: 5,
    left: '30%',
    width: 20,
    height: 20,
    backgroundColor: '#E7B944',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
