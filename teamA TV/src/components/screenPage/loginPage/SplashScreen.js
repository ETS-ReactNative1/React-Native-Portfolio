import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('token', (err, res) => {
      if (res) {
        setTimeout(() => {
          navigation.navigate('TabNavigator');
        }, 2500);
      } else {
        setTimeout(() => {
          navigation.navigate('RegisterScreen');
        }, 2500);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="rubberBand" duration={4000}>
        <Image
          style={styles.logo}
          source={require('../../../img/splash/thumbnail_teamATV.png')}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" duration={3000}>
        <Image
          style={styles.name}
          source={require('../../../img/splash/namelogo.png')}
        />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  logo: {
    width: 200,
    height: 200,
  },
  name: {
    top: -114,
  },
});
