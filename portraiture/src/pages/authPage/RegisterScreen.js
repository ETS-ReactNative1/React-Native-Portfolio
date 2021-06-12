import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/config/colors';
import Loading from '../../components/reusable/Loading';
import { fetchRequestPackageItems, fetchRequestProfileData, fetchRequestProjectItems } from '../../redux/actions/action';
import {useDispatch} from 'react-redux'

export default function RegisterScreen({navigation}) {
  const dispatch = useDispatch();
  const [secureIcon, setSecureIcon] = useState(true);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registerAccess = () => {
    axios({
      method: 'POST',
      url: 'https://portraiture.gabatch11.my.id/auth/signup',
      data: {
        name,
        businessName,
        email,
        password,
        confirmPassword,
      },
    })
      .then(({data}) => {
        AsyncStorage.setItem('token', data.token, err => {
          if (!err) {
            setName('');
            setBusinessName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            dispatch(fetchRequestProfileData());
            dispatch(fetchRequestProjectItems());
            dispatch(fetchRequestPackageItems());
            navigation.navigate('HomeTabNavigator');
            setLoading(false);
          }
        });
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const secureIconHandler = () => {
    setSecureIcon(!secureIcon);
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
        <Text style={styles.formTitle}>Signup</Text>
        <View style={styles.formInput}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.inputText}
            placeholder="Business Name"
            value={businessName}
            onChangeText={setBusinessName}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholderTextColor="#aaa"
          />
          <View style={styles.inputPassword}>
            <TextInput
              style={styles.inputTextPassword}
              placeholder="Password"
              secureTextEntry={secureIcon ? true : false}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#aaa"
            />
            <Icon
              onPress={secureIconHandler}
              style={styles.showPassword}
              name={secureIcon ? 'eye-off-outline' : 'eye'}
              size={22}
            />
          </View>
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              registerAccess();
            }}
            style={styles.signupBtn}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
          <View style={styles.loginNavigate}>
            <Text style={styles.left}>Already have account?</Text>
            <Text
              onPress={() => navigation.navigate('LoginScreen')}
              style={styles.right}>
              Login
            </Text>
          </View>
        </View>
      </View>
      <Loading isVisible={loading}/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  formWrapper: {
    backgroundColor: colors.white,
    marginHorizontal: wp(10),
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: hp(2),
  },

  logo: {
    width: wp(7),
    height: hp(4),
  },
  logoName: {
    width: wp(30),
    height: hp(2),
    marginTop: 5,
  },
  iconWraper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  formTitle: {
    textAlign: 'center',
    marginVertical: hp(7),
    fontSize: hp(3),
    fontFamily: 'Montserrat-Bold',
  },
  inputText: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: hp(2),
    padding: 8,
    fontFamily: 'Montserrat-Regular',
  },
  inputTextPassword: {
    padding: 8,
    fontFamily: 'Montserrat-Regular',
    width: '90%',
  },
  inputPassword: {
    flexDirection: 'row',
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: hp(1),
  },
  showPassword: {
    color: colors.ash,
    marginVertical: hp(1),
  },
  signupBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    margin: '7%',
  },
  signupText: {
    color: colors.white,
    padding: '5%',
    fontFamily: 'Montserrat-Bold',
  },
  loginNavigate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    color: colors.ash,
    marginRight: 5,
    fontFamily: 'Montserrat-Regular',
  },
  right: {
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
});
