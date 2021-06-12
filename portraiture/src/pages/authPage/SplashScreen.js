import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../assets/config/colors';
import {useDispatch} from 'react-redux'

import {
  fetchRequestPackageItems,
  fetchRequestProfileData,
  fetchRequestProjectItems,
} from '../../redux/actions/action';

export default function SplashScreen({navigation}) {
  const dispatch = useDispatch();

  useEffect(async () => {
    await AsyncStorage.getItem('token', (err, res) => {
      console.log(res);
      if (res) {
        dispatch(fetchRequestPackageItems());
        dispatch(fetchRequestProjectItems());
        dispatch(fetchRequestProfileData());
        setTimeout(() => {
          navigation.navigate('HomeTabNavigator');
        }, 500);
      } else {
        setTimeout(() => {
          navigation.navigate('RegisterScreen');
        }, 500);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.bg}
        source={require('../../img/patern.png')}>
        <Image
          style={{tintColor: colors.white}}
          source={require('../../img/logo.png')}
        />
        <Text style={styles.title}>portraiture</Text>
        <ActivityIndicator size="large" color={colors.white} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    fontSize: 30,
  },
});
