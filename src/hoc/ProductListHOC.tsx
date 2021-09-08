import {AppSpinner} from '@src/components';
import {ProductCard} from '@src/components/ProductCard';
import {useProducts} from '@src/hooks/useProducts';
import {productSelector} from '@src/slices/product.slice';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export const ProductListHOC = () => {
  const {isLoading} = useProducts();

  const data = useSelector(productSelector);

  console.log("data", data);
  

  if (isLoading) {
    return (
      <View style={styles.sppiner}>
        <AppSpinner />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{166} items</Text>
      <FlatList
        data={data}
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
  content: {paddingHorizontal: 10},
  sppiner: {
    marginTop: 80,
  },
});
