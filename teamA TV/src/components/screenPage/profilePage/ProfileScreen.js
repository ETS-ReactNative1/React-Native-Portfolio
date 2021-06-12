import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {getProfileData} from '../../../redux/action/registerAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator} from 'react-native-paper';
import {getAllReviews, getMyReview} from '../../../redux/action/reviewAction';

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.loginReducer);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [loading, setLoading] = useState(true);
  const [profile_picture, setProfile_picture] = useState({
    mime: '',
    path: '',
    name: '',
  });
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setName('');
    setEmail('');
    setPassword('');
    setConfirm_password('');
  };

  useEffect(() => {
    dispatch(getProfileData());
    setProfile_picture({uri: data.profile_picture})
    setLoading(false);
  }, []);

  const editProfileHandler = () => {

    var FormData = require('form-data');
    const formData = new FormData();

    formData.append('profile_picture', {
      uri: 'file://'+profile_picture.path,
      type: profile_picture.mime,
      name: profile_picture.name,
    });
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirm_password);

    AsyncStorage.getItem('token', (err, userToken) => {
      axios({
        method: 'PUT',
        url: 'https://team-a.gabatch11.my.id/user/userUpdate/' + data.id,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
        .then(({data}) => {
          dispatch(getProfileData(data.data));
          dispatch(getAllReviews());
          setModalVisible(!isModalVisible);
        })
        .catch(err => console.log(err.message));
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfile_picture({
        mime: image.mime,
        path: image.path,
        name: image.filename,
      });
    });
  };

  const signOutHandler = () => {
    AsyncStorage.removeItem('token', err => {
      navigation.replace('LoginScreen');
    });
  };

  {
    if (loading) {
      <ActivityIndicator size="large" />;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image style={styles.profilePic} source={{uri: data.profile_picture}} />
        <Text style={styles.profileName}>{data.name}</Text>
        <Text style={styles.profileEmail}>{data.email}</Text>
      </View>
      <View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeBtn} onPress={toggleModal}>
              <Icon name="close-circle" size={40} color="coral" />
            </TouchableOpacity>
            <View style={styles.logoWrap}>
              <TouchableOpacity onPress={choosePhotoFromLibrary}>
                <Image
                  style={styles.profileFoto}
                  source={{uri: profile_picture?.path}}
                />
              </TouchableOpacity>
            </View>
            <View></View>
            <View style={styles.flexD}>
              <TextInput
                style={styles.editTextName}
                value={name}
                placeholder={data.name}
                onChangeText={setName}
                autoCapitalize="none"
                placeholderTextColor="grey"
              />
              <Icon
                name="pencil"
                style={styles.iconP}
                size={20}
                color="#EB507F"
              />
            </View>
            <View style={styles.editInput}>
              <TextInput
                style={styles.editText}
                placeholder={data.email}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor="grey"
              />
              <TextInput
                style={styles.editText}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={setPassword}
                placeholderTextColor="grey"
              />
              <TextInput
                style={styles.editText}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={setConfirm_password}
                placeholder="Confirm password"
                placeholderTextColor="grey"
              />
            </View>
            <TouchableOpacity
              onPress={editProfileHandler}
              style={styles.onPress}>
              <Text style={styles.onPressText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={styles.profileContent}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyReview');
          }}
          style={styles.proileBtn}>
          <Icon name="chat-processing-outline" size={30} color="#EB507F" />
          <Text style={styles.text}>My Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal} style={styles.proileBtn}>
          <Icon name="account-edit-outline" size={30} color="#FE024E" />
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutHandler} style={styles.signOut}>
          <Icon name="exit-to-app" size={30} color="white" />
          <Text style={styles.textSignOut}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  profileContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  profilePic: {
    width: 160,
    height: 160,
    marginBottom: 50,
    borderRadius:20,
    borderColor:'#aaa',
    borderWidth:1
  },
  profileName: {
    fontSize: 34,
    fontWeight: '800',
  },
  profileEmail: {
    fontWeight: '300',
    fontSize: 16,
    marginTop: 10,
  },
  proileBtn: {
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  signOut: {
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#EB507F',
  },
  text: {
    marginTop: 10,
    color: 'grey',
    fontWeight: '500',
  },
  textSignOut:{
    marginTop: 10,
    color: 'white',
    fontWeight: '500',
  },
  modal: {
    backgroundColor: 'white',
    flex: 0.7,
    borderRadius: 20,
  },
  editInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonProfile: {
    left: 60,
    bottom: 40,
  },
  profileFoto: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: '#8C8989',
    borderWidth: 2,
  },
  profileEdit: {
    width: 30,
    height: 30,
  },
  editTextName: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
  },
  editText: {
    fontSize: 16,
    fontWeight: '500',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    width: 300,
    maxWidth: 300,
    paddingVertical: 10,
  },
  flexD: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  iconP: {
    marginLeft: 1,
    bottom: 10,
  },
  closeBtn: {
    alignItems: 'flex-end',
    bottom: 27,
    left: 10,
  },
  onPress: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#EB507F',
    marginHorizontal: 50,
    padding: 16,
    borderRadius: 10,
  },
  onPressText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
});
