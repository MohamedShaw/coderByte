import {NavigationProp} from '@react-navigation/native';
import {Home} from '@src/screens';
import {routeNames} from './routeNames';

export type NavigationT = NavigationProp<any>;

export interface Screen {
  name: string;
  component: React.FunctionComponent<any>;
}
export const screens: Screen[] = [{name: routeNames.home, component: Home}];
