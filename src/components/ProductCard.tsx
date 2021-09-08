import {PRODUCT} from '@src/hooks/useProducts';
import {addToFavorite} from '@src/slices';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
interface Props {
  data: PRODUCT;
}
export const ProductCard = ({data}: Props) => {
  const {image, title, price} = data;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          dispatch(addToFavorite(data));
        }}
        style={styles.favorite}>
        <Image
          source={require('@src/assets/favorite.png')}
          style={styles.favIcon}
        />
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderRadius: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    marginBottom: 24,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    height: 163,
    borderTopLeftRadius: 10,
  },
  imageContainer: {borderRadius: 10, backgroundColor: 'white', flex: 1},
  title: {marginTop: 25, color: '#34283E', fontSize: 14, fontWeight: '400'},
  price: {marginTop: 5, color: '#34283E', fontSize: 17, fontWeight: '700'},
  favorite: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 45,
    zIndex: 100,
    position: 'absolute',
    top: 138,
    left: 10,
    elevation: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {width: 25, height: 25},
});
