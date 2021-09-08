import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  title?: string;
  hideBack?: boolean;
}
export const Header = ({title, hideBack = true}: Props) => {
  const {goBack} = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: '#4B385B'}}>
      <View style={styles.wrapper}>
        {!hideBack && (
          <TouchableOpacity onPress={goBack}>
            <Image
              source={require('@src/assets/vector.png')}
              style={{height: 19, width: 27}}
            />
          </TouchableOpacity>
        )}
        <View style={{flex: 1, alignItems:'center'}}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
            {title}
          </Text>
        </View>
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
    flexDirection: 'row',
  },
});
