import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeaderHome({navigation}) {
  return (
    <View style={styles.header}>
      <View style={styles.iconApp}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../../../img/teamATV.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.nameApp}>TeamATV</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Icon name="magnify" size={28} color="#FE024E" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: 333,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconApp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 40,
  },
  nameApp: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    color:'#FE024E'
  },
});
