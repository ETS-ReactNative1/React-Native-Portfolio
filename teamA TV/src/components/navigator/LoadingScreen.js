import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function LoadingScreen() {
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}>
      <Animatable.Image 
      animation='rubberBand'
      duration={1800}
      source={require('../../img/teamATV.png')} 
      />
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({});
