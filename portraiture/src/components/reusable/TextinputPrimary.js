import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import colors from '../../../assets/config/colors';

export default function TextinputPrimary(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={styles.textinput}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        editable={props.editable}
        color={props.color}
        multiline={props.multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginVertical:10
  },
  title:{
    fontFamily: 'Montserrat-Regular'
  },
  textinput:{
    borderBottomColor: colors.ash,
    borderBottomWidth:1,
    padding:10,
    fontFamily: 'Montserrat-Regular'
  }
});
