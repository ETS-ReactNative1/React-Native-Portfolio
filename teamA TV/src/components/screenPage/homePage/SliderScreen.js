import React, { useState } from 'react';
import {StyleSheet, Image, View, FlatList, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';

export default function SliderScreen() {

  return (
    <View style={styles.sliderContainer}>
      <Swiper autoplay activeDotColor="#FE024E" height={200}>
        <View style={styles.slide}>
          <Image
            source={require('../../../img/mortalcombat.png')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../../img/joker.jpeg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../../img/monsterhunter.jpeg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 190,
    width: '100%',
    backgroundColor:'pink'
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sliderImage: {
    width: '100%',
    height: 190,
  },
});
