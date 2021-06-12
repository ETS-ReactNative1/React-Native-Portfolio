import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token', (err, res)=> {
      if (res) {
        navigation.navigate('TabNavigator');
      }
    });
  }, []);

  const loginAccess = () => {
    axios({
      method: 'POST',
      url: 'https://team-a.gabatch11.my.id/auth/login',
      data: {
        email,
        password,
      },
    })
      .then((data) => {
        console.log('login data',data)
        AsyncStorage.setItem('token', data.data.token, err => {
          if (!err) {
            console.log('sucesslogin',data.token);
            setEmail('');
            setPassword('');
            navigation.navigate('TabNavigator');
          }
        });
      })
      .catch(function (err) {
        if(err.message === 'Request failed with status code 400'){
          Alert.alert('The email address or password you entered is not connected to an account.')
        }else{
          Alert.alert('The password that you have entered is incorrect. ')
        }
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
        <View style={styles.signInContent}>
          <TouchableOpacity onPress={loginAccess} style={styles.signIn}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={styles.accSignUpLeft}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.accSignUpRight}>Sign Up</Text>
            </TouchableOpacity>
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
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 100,
  },
  iconApp: {
    backgroundColor: '#FE024E',
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  nameApp: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 10,
  },
  loginWrap: {
    flex: 2,
  },
  loginPlaceHolder: {
    fontSize: 16,
    width: 330,
    borderBottomColor: '#8C8989',
    borderBottomWidth: 1,
    marginBottom: 28,
    color: 'black',
    fontWeight: '400',
    paddingBottom: 10,
  },
  forgotPass: {
    color: '#8C8989',
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 100,
  },
  signIn: {
    width: 330,
    height: 45,
    backgroundColor: '#FE024E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
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
});
