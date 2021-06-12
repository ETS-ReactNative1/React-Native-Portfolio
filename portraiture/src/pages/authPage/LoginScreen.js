import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import colors from '../../../assets/config/colors';
import Loading from '../../components/reusable/Loading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginAccess = () => {
    axios({
      method: 'POST',
      url: 'https://portraiture.gabatch11.my.id/auth/signin',
      data: {
        email,
        password,
      },
    })
      .then(({data}) => {
        AsyncStorage.setItem('token', data.token, err => {
          console.log(data.token);
          if (!err) {
            setEmail('');
            setPassword('');
            navigation.navigate('HomeTabNavigator');
            setLoading(false);
          }
        });
      })
      .catch(function (err) {
        if (err.message === 'Request failed with status code 400') {
          alert(
            'The email address or password you entered is not connected to an account.',
          );
          setLoading(false);
        } else {
          alert('The password that you have entered is incorrect. ');
          setLoading(false);
        }
      });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../img/patern.png')}>
      <StatusBar barStyle="light-content" />
      <View style={styles.formWrapper}>
        <View style={styles.iconWraper}>
          <Image style={styles.logo} source={require('../../img/logo.png')} />
          <Image
            style={styles.logoName}
            source={require('../../img/portraiture.png')}
          />
        </View>
        <Text style={styles.formTitle}>Login</Text>
        <View style={styles.formInput}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholderTextColor={colors.ash}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            value={password}
            autoCapitalize="none"
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor={colors.ash}
          />
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              loginAccess();
            }}
            style={styles.signupBtn}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.loginNavigate}>
            <Text style={styles.left}>Dont have account?</Text>
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={styles.right}>
              Signup
            </Text>
          </View>
        </View>
      </View>
      <Loading isVisible={loading} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent:'center'
  },
  formWrapper: {
    backgroundColor: colors.white,
    marginHorizontal: hp(5.5),
    borderRadius: 10,
    paddingVertical:hp(3),
  },

  logo: {
    width: wp(7),
    height: hp(5),
    marginTop: '10%',
  },
  logoName: {
    width: wp(27),
    height: hp(2),
    marginTop: '2%',
  },
  iconWraper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  formTitle: {
    textAlign: 'center',
    marginVertical: hp(10),
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(6.5),
  },
  inputText: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    marginHorizontal: '7%',
    marginVertical: '6%',
    padding: 10,
    fontFamily: 'Montserrat-Regular',
  },
  signupBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: '7%',
    margin: '7%',
  },
  signupText: {
    color: colors.white,
    fontSize: wp(4),
    padding: '5%',
    fontFamily: 'Montserrat-Bold',
  },
  loginNavigate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    color: 'grey',
    marginRight: 5,
    fontFamily: 'Montserrat-Regular',
  },
  right: {
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
});
