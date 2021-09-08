import {CATEGORY} from '@src/hooks';
import {filterProduct} from '@src/slices/filter.clice';
import {
  filterByCategory,
  productSelector,
  selectCategory,
} from '@src/slices/product.slice';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

interface Props {
  category: CATEGORY;
}

export const Category = ({category}: Props) => {
  const filterCategory = useSelector(filterByCategory);
  const data = useSelector(productSelector);
  const dispatch = useDispatch();

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {category.map(item => (
          <TouchableOpacity
            onPress={() => {
              dispatch(selectCategory(item));
              const dataToFilter = {
                category: item,
                data,
              };
              dispatch(filterProduct(dataToFilter));
            }}
            style={filterCategory === item ? styles.selectedTag : styles.tags}
            key={item}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tags: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 25,
    backgroundColor: 'white',
    marginEnd: 10,
    justifyContent: 'center',
  },
  content: {paddingStart: 15, marginTop: 15},
  selectedTag: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#E7B944',
    marginEnd: 10,
    justifyContent: 'center',
  },
});
