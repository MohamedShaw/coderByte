import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

interface Props {
  title?: string;
}
export const Header = ({title}: Props) => {
  return (
    <SafeAreaView style={{backgroundColor: '#4B385B'}}>
      <View style={styles.wrapper}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    height: 67,
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 5,
  },
});
