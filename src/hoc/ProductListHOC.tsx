import {AppSpinner} from '@src/components';
import {ProductCard} from '@src/components/ProductCard';
import {useProducts} from '@src/hooks/useProducts';
import {productFilters} from '@src/slices/filter.clice';
import {productSelector} from '@src/slices/product.slice';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export const ProductListHOC = () => {
  const {isLoading} = useProducts();

  const data = useSelector(productSelector);
  const filters = useSelector(productFilters);

  const products = filters.filterData.length ? filters.filterData : data;

  if (isLoading) {
    return (
      <View style={styles.sppiner}>
        <AppSpinner />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{products.length} items</Text>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({item}) => <ProductCard data={item} />}
        contentContainerStyle={styles.content}
        keyExtractor={() => Math.random().toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  text: {marginHorizontal: 15, marginVertical: 20, fontWeight: 'bold'},
  content: {paddingHorizontal: 10, paddingBottom: 70},
  sppiner: {
    marginTop: 80,
  },
});
