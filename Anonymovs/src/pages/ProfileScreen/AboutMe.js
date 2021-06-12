import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../../assets/config/Colors';

export default function AboutMe() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.h1}>About Me</Text>
        <Text style={styles.h3}>
          A competent IT professional with experience in network and
          troubleshoot software or hardware for 5 years. Extensive experience of
          working in the front line helping clients and colleagues resolve
          complex technical IT issues. Possessing excellent natural problem
          solving and analytical skills and able to contribute to the
          development of best practice, procedures and policy within a company. And just finnishing studied React Native at Glints Academy Batch 11.
        </Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 30,
  },
  h1: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 20,
    marginVertical:10
  },
  h3: {
    color: Colors.white,
  },
});
