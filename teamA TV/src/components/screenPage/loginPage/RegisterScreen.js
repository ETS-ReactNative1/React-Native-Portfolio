import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerAccess = () => {
    axios({
      method: 'POST',
      url: 'https://team-a.gabatch11.my.id/auth/signup',
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    })
      .then(({data}) => {
        console.log('dataregis', data);
        AsyncStorage.setItem('token', data.token, err => {
          if (!err) {
            console.log(data.message);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('TabNavigator');
          }
        });
      })
      .catch(function (error) {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image source={require('../../../img/teamATV.png')} />
      </View>
      <View style={styles.loginWrap}>
        <TextInput
          style={styles.loginPlaceHolder}
          placeholder="Name"
          value={name}
          autoCapitalize="none"
          onChangeText={setName}
          placeholderTextColor="#8C8989"
        />
        <TextInput
          style={styles.loginPlaceHolder}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#8C8989"
        />
        <TextInput
          style={styles.loginPlaceHolder}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="#8C8989"
        />
        <TextInput
          style={styles.loginPlaceHolder}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="#8C8989"
        />
        <View style={styles.signInContent}>
          <TouchableOpacity onPress={registerAccess} style={styles.signIn}>
            <Text style={styles.signInText}>SIGN UP</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={styles.accSignUpLeft}>Already have an account?</Text>
            <Text
              onPress={() => navigation.navigate('LoginScreen')}
              style={styles.accSignUpRight}>
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonProfile: {
    position: 'absolute',
    right: 10,
  },
  profileFoto: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderColor: '#8C8989',
    borderWidth: 2,
  },
  profileEdit: {
    width: 30,
    height: 30,
  },
  loginWrap: {
    flex: 2,
  },
  loginPlaceHolder: {
    fontSize: 16,
    paddingBottom: 6,
    width: 330,
    borderBottomColor: '#8C8989',
    borderBottomWidth: 1,
    marginBottom: 28,
    color: 'black',
    fontWeight: '400',
  },
  signIn: {
    width: 330,
    height: 45,
    backgroundColor: '#FE024E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 30,
  },
  signInText: {
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
  },
  signInContent: {
    alignItems: 'center',
  },
  signUp: {
    flexDirection: 'row',
    marginTop: 30,
  },
  accSignUpLeft: {
    color: '#8C8989',
    fontSize: 15,
    fontWeight: '700',
  },
  accSignUpRight: {
    color: '#FE024E',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
  },
  modalContent: {
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
  },
});
