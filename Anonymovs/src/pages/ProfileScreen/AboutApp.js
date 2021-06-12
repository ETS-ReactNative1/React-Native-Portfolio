import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import Colors from '../../../assets/config/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AboutApp() {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{marginBottom:40}}>
        <View style={styles.desc}>
          <Text style={styles.title}>What is Anonymovs</Text>
          <Text style={styles.description}>
            Anonymovs is a mobile application that i build for Technical Assessment from
            Glints Academy and written and built programmatically in React Native. This app is just a simple collection movies for
            person who want to know all movies that played in the cinema,
            upcaming or top rated. You can also give some rating to a movie and
            add movie to your favorite list.
          </Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.title}>Features</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Search for a Movies</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Save and Delete a Movie</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Display information of a getAllMovies</Text>
          </View>
        </View>
        <View style={styles.desc}>
          <Text style={styles.title}>Frameworks</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>The MovieDB API</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Vector Icon</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Animatable</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Linear Gradient</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>AirBnB Rating</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Youtube iFrame</Text>
          </View>
        </View>
        <View style={styles.desc}>
          <Text style={styles.title}>Tech</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>Redux Saga</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>XCode & Anroid Studio</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
            <Icon style={{marginRight:10}} name="square" size={10} color="white" />
            <Text style={styles.description}>VSCode</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 30,
  },
  desc: {
    marginBottom: 20,
  },
  title: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 20,
    marginVertical: 10,
  },
  description: {
    color: Colors.white,
  },
  h2: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 10,
  },
});
