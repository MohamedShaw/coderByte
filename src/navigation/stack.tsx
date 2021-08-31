import * as React from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import * as Screens from '@src/screens';
import {routeNames} from './routeNames';
import {Screen, screens} from './types';

const appStack = createNativeStackNavigator();

export function Stack() {
  return (
    <NavigationContainer>
      <appStack.Navigator
        screenOptions={{
          direction: 'ltr',
          headerShown: false,
          statusBarStyle: 'dark',
        }}
        initialRouteName={routeNames.home}>
        {screens.map((screen: Screen) => (
          <appStack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              statusBarStyle: 'light',
            }}
          />
        ))}
      </appStack.Navigator>
    </NavigationContainer>
  );
}
