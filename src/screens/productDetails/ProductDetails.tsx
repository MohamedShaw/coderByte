import {ParamListBase, RouteProp} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  route: RouteProp<ParamListBase, any>;
}
export function ProductDetails({route: {params}}: Props) {
  const {data} = params;

  return (
    <>
      <Header hideBack={false}/>
      <View style={styles.container}>
        <Text style={styles.describtion}>{data.description}</Text>
        <Text style={styles.price}>${data.price}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  describtion: {
    color: '#34283E',
    fontSize: 16,
    fontWeight: '300',
  },
  price: {
    color: '#34283E',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 37,
  },
});
