import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as Screens from '@src/screens';

import {CustomTabbar} from './component/CustomTabbar';
import {routeNames} from './routeNames';
import {colors} from '@src/theme';

const bottomTabs = createBottomTabNavigator();

export const BOTTOM_TABS_STATUS_BAR_STYLE: Record<
  string,
  'auto' | 'inverted' | 'light' | 'dark' | undefined
> = {
  [routeNames.home]: 'light',
  [routeNames.category]: 'light',

  [routeNames.favorite]: 'light',
  [routeNames.profile]: 'light',
};

function Home() {
  return null;
}
function Favorite() {
  return null;
}
function Profile() {
  return null;
}
export function Tabbar() {
  return (
    <bottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.inActive,
      }}
      initialRouteName={routeNames.category}
      tabBar={props => <CustomTabbar {...props} />}>
      <bottomTabs.Screen name={routeNames.home} component={Home} />
      <bottomTabs.Screen
        name={routeNames.category}
        component={Screens.Category}
      />

      <bottomTabs.Screen name={routeNames.favorite} component={Favorite} />
      <bottomTabs.Screen name={routeNames.profile} component={Profile} />
    </bottomTabs.Navigator>
  );
}
