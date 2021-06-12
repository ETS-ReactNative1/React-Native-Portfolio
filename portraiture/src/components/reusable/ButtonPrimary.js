import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colors from '../../../assets/config/colors';

export default function ButtonPrimary(props) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  container: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    padding: 15,
  },
});
