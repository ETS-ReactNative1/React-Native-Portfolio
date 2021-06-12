import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../../../assets/config/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {actionLoginName, actionToken} from '../../redux/action/actions';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [loginName, setLoginName] = useState('');
  const [loginPush, setLoginPush] = useState(false);

  const loginHandler = () => {
    setLoginPush(true);
    dispatch(actionLoginName(loginName));
    dispatch(actionToken())
    setTimeout(() => {
      navigation.navigate('HomeTabNavigator');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image source={require('../../../assets/img/logo-only.png')} />
      <View style={styles.inputWrapper}>
        <TextInput
          //   autoFocus
          placeholder="Input a name to enter"
          placeholderTextColor={Colors.ash}
          style={styles.textInput}
          value={loginName}
          onChangeText={setLoginName}
        />
        <TouchableOpacity
          onPress={() => {
            if (loginName.length <= 3) {
              alert('Input minim 3 chararcter');
            } else {
              loginHandler();
            }
          }}
          style={styles.submitBtn}>
          <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
      {loginPush == true && (
        <Animatable.View animation="bounceInRight">
          <View style={styles.loginStatus}>
            <Text style={styles.loginName}>You're login as {loginName}</Text>
            <Icon
              name="check-circle-outline"
              size={20}
              color={Colors.success}
            />
          </View>
          <ActivityIndicator size="small" color={Colors.white} />
        </Animatable.View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? hp(14) : hp(16),
    alignItems: 'center',
  },
  textInput: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    width: wp(55),
    maxWidth: wp(55),
    padding: wp(3),
    color: Colors.white,
  },
  submitBtn: {
    marginLeft: wp(5),
    backgroundColor: Colors.active,
    borderRadius: 4,
    marginTop: Platform.OS === 'android' ? hp(2) : hp(0),
  },
  submitTxt: {
    color: Colors.white,
    padding: wp(3),
  },
  loginName: {
    color: Colors.white,
    marginRight: wp(2),
  },
  loginStatus: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
});
