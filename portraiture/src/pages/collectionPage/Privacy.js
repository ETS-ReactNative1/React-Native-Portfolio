import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import colors from '../../../assets/config/colors';
import Loading from '../../components/reusable/Loading';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import { actionGetOneCollection } from '../../redux/actions/action';

export default function Privacy({navigation}) {
  const dispatch = useDispatch();
  const {oneCollection} = useSelector(state => state.collectionReducer);
  const [gallery, setGallery] = useState(true);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [textPassword, setTextPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const revealPasswordHandler = () => {
    setSecurePassword(!securePassword);
  };
  const toggleSwitchGallery = () => setGallery(previousState => !previousState);
  const toggleSwitchEmail = () => setEmail(previousState => !previousState);
  const toggleSwitchPassword = () => {
    setPassword(previousState => !previousState);
    setTextPassword('');
  };

  const privacyHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('title', oneCollection.title);
    data.append('date', oneCollection.date.slice(0, 10));
    data.append('description', oneCollection.description);
    data.append('showGallery', gallery);
    var config = {
      method: 'put',
      url:
        'https://portraiture.gabatch11.my.id/collection?id_collection=' +
        oneCollection.id,
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        navigation.goBack();
        dispatch(actionGetOneCollection(oneCollection.id));
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const setPasswordHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('password', textPassword);

    var config = {
      method: 'put',
      url:
        'https://portraiture.gabatch11.my.id/collection/createPassword?id_collection=' +
        oneCollection.id,
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        alert('Password success to save !');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.listBar}>
        <View style={styles.switch}>
          <Switch
            trackColor={{false: '#E0E0E0', true: '#0E203D'}}
            thumbColor={gallery ? 'white' : '#E0E0E0'}
            ios_backgroundColor="#E0E0E0"
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            onValueChange={toggleSwitchGallery}
            value={gallery}
          />
        </View>
        <View style={styles.itemBar}>
          <Text style={styles.title}>Show on Gallery</Text>
          <Text style={styles.desc}>
            This collection available on your main page.
            <Text
              style={{
                color: colors.secondary,
              }}>
              {' '}
              See page
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.listBarPassword}>
        <View style={styles.switch}>
          <Switch
            trackColor={{false: '#E0E0E0', true: '#0E203D'}}
            thumbColor={password ? 'white' : '#E0E0E0'}
            ios_backgroundColor="#E0E0E0"
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            onValueChange={toggleSwitchPassword}
            value={password}
          />
        </View>

        <View style={styles.itemBar}>
          <Text style={styles.title}>Collection Password</Text>
          <Text style={styles.desc}>
            Turn on to have a generated password for all guest in order to see
            your collection.
          </Text>
          {password === true ? (
            <View>
              <TextInput
                style={styles.inputPassword}
                secureTextEntry={securePassword}
                value={textPassword}
                onChangeText={setTextPassword}
                placeholder="Set a password"
              />
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                {textPassword.length === 0 ? null : (
                  <TouchableOpacity
                    onPress={revealPasswordHandler}
                    style={styles.revealPassword}>
                    <Text style={styles.revealText}>Reveal</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    setPasswordHandler();
                  }}
                  style={styles.savePassword}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
      <ButtonPrimary
        name="Save"
        onPress={() => {
          setLoading(true);
          privacyHandler();
        }}
      />
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  listBar: {
    flexDirection: 'row',
    borderBottomColor: colors.vogue,
    borderBottomWidth: 1,
    paddingVertical: 40,
  },
  listBarPassword: {
    flexDirection: 'row',
    paddingVertical: 40,
  },
  switch: {
    flex: 0.27,
  },
  itemBar: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
    fontSize: 16,
    marginVertical: 5,
  },
  desc: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.gun,
  },
  inputPassword: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 12,
    marginVertical: 4,
    fontFamily: 'Montserrat-Regular',
  },
  savePassword: {
    backgroundColor: colors.secondary,
    width: 80,
    marginVertical: 4,
    marginLeft: 10,
    borderRadius: 4,
  },
  saveText: {
    color: colors.white,
    textAlign: 'center',
    padding: 13,
    fontFamily: 'Montserrat-Regular',
  },
  revealPassword: {
    backgroundColor: colors.white,
    width: 80,
    marginVertical: 4,
    marginLeft: 10,
    borderRadius: 4,
  },
  revealText: {
    color: colors.black,
    textAlign: 'center',
    padding: 13,
    fontFamily: 'Montserrat-Regular',
  },
});
