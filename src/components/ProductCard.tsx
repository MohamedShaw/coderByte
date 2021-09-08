import {useNavigation} from '@react-navigation/native';
import {PRODUCT} from '@src/hooks/useProducts';
import {useStyle} from '@src/hooks/useStyle';
import {routeNames} from '@src/navigation/routeNames';
import {NavigationT} from '@src/navigation/types';
import {addToFavorite} from '@src/slices';
import {productFavorive, removeFromFavorite} from '@src/slices/product.slice';
import {colors} from '@src/theme';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
interface Props {
  data: PRODUCT;
}
export const ProductCard = ({data}: Props) => {
  const {image, title, price, id} = data;
  const {navigate} = useNavigation<NavigationT>();

  const favorite = useSelector(productFavorive);

  useEffect(() => {
    const isFound = Object.values(favorite).find(item => item.id === id);
    if (isFound) {
      setFavorite(true);
    }
  }, []);
  const [isFavorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  const backgroundColorStyle = useStyle(() => {
    return {backgroundColor: isFavorite ? colors.active : 'white'};
  }, [isFavorite]);

  const tintColorStyle = useStyle(() => {
    return {tintColor: isFavorite ? 'white' : colors.active};
  }, [isFavorite]);

  function onToggleFav() {
    if (isFavorite) {
      setFavorite(false);
      dispatch(removeFromFavorite(id));
    } else {
      setFavorite(true);
      dispatch(addToFavorite(data));
    }
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate(routeNames.productDetails, {data});
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        onPress={onToggleFav}
        style={[styles.favorite, backgroundColorStyle]}>
        <Image
          source={require('@src/assets/favorite.png')}
          style={[styles.favIcon, tintColorStyle]}
        />
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.price}>${price}</Text>
    </TouchableOpacity>
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
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 40,
    zIndex: 100,
    position: 'absolute',
    top: 138,
    right: 10,
    elevation: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {width: 25, height: 25},
});
