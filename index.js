/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Entry} from './src/navigation/entry';

AppRegistry.registerComponent(appName, () => Entry);
