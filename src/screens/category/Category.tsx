import {Header} from '@src/components/Header';
import {CategoryHOC, ProductListHOC} from '@src/hoc';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface Props {}
export function Category({}: Props) {
  return (
    <View style={styles.container}>
      <Header title="Clothing" />
      <CategoryHOC />
      <ProductListHOC />
    </View>
  );
}
