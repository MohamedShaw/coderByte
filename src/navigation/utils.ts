import {CommonActions} from '@react-navigation/native';
import {NavigationT} from './types';
import {routeNames} from './routeNames';
export declare type ValueOf<T> = T[keyof T];

export function resetToRoute<T extends object>(
  navigation: NavigationT,
  route: ValueOf<typeof routeNames>,
  params?: T,
) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: route, params: params || {}}],
    }),
  );
}
