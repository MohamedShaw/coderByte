import {CATEGORY} from '@src/hooks';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

interface Props {
  category: CATEGORY;
}

export const Category = ({category}: Props) => {
  return (
    <View>
      <ScrollView
        style={{
          transform: [{scaleX: -1}],
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {category.map(item => (
          <View style={styles.tags} key={item}>
            <Text>{item}</Text>
          </View>
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
    transform: [
      {
        scaleX: -1,
      },
    ],
  },
  content: {paddingStart: 15, marginTop: 15},
});
