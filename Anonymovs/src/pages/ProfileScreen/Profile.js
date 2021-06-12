import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../assets/config/Colors';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Profile({navigation}) {
  const {name} = useSelector(state => state.allReducers);
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={{color: 'white', fontSize: 20}}>Helloo .... {name}</Text>
      </View>
      <View style={styles.contentWrapper}>
        <TouchableOpacity onPress={()=>navigation.navigate('AboutApp')} style={styles.content}>
          <Text style={styles.text}>About this app</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AboutMe')} style={styles.content}>
          <Text style={styles.text}>About Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.ash,
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(3),
    marginVertical: hp(1),
    borderRadius: wp(2),
  },
  text:{
      fontWeight:'500',
      color: Colors.black
  }
});
