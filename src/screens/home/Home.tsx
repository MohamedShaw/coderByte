import React from 'react';
import {View} from 'react-native';
import {RecordVideo} from '../media';
import {styles} from './styles';

interface Props {}
export function Home({}: Props) {
  return (
    <View style={styles.container}>
      <RecordVideo />
    </View>
  );
}
