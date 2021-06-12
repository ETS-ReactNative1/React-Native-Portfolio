import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import TextinputPrimary from '../../components/reusable/TextinputPrimary';
import {fetchRequestProfileData} from '../../redux/actions/action';
import Loading from '../../components/reusable/Loading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

export default function ProfileScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const {profile} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const pathImage = 'https://portraiture.gabatch11.my.id';
  const [name, setName] = useState(profile?.name);
  const [businessName, setBusinessName] = useState(profile?.businessName);
  const [address, setAddress] = useState(profile?.address);
  const [photo, setPhoto] = useState({
    mime: 'image/png',
    path: pathImage + profile?.photo,
    name: '',
    data: '',
  });

  const signOutHandler = () => {
    AsyncStorage.removeItem('token', err => {
      navigation.replace('LoginScreen');
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      includeBase64: true,

      // forceJpg: true,
      // compressImageQuality: 0.8,
    })
      .then(images => {
        console.log(images);
        setPhoto({
          mime: 'image/png',
          path: images.path,
          name: images.filename,
          data : images.data,
        });
      })
      .catch(e => alert(e));
  };

  const editProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('name', name);
    data.append('businessName', businessName);
    data.append('address', address);
    if (photo.name !== '') {
      data.append('photo', {
        uri: Platform.OS === 'android' ? photo.path : 'file://' + photo.path,
        type: photo.mime,
        name: photo.path.split('/').pop(),
        data: photo.data
      });
    } else {
      null;
    }
    var config = {
      method: 'put',
      url: 'https://portraiture.gabatch11.my.id/user',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        dispatch(fetchRequestProfileData());
        navigation.goBack();
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.header}>
        <View style={styles.iconHeader}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={40}
          />
          <Text style={styles.titleHeader}>Edit Profile</Text>
          <Icon onPress={signOutHandler} name="logout-variant" size={30} />
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Bussiness Detail</Text>
          <TextinputPrimary
            title="Name*"
            value={businessName}
            onChangeText={setBusinessName}
          />
          <TextinputPrimary
            title="Address"
            value={address}
            onChangeText={setAddress}
            multiline={true}
          />
          <View style={{marginVertical: 10}}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Logo</Text>
            <TouchableOpacity onPress={choosePhotoFromLibrary}>
              <Image source={{uri: photo?.path}} style={styles.imageLogo} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Account Detail</Text>
          <TextinputPrimary title="Name*" value={name} onChangeText={setName} />
          <TextinputPrimary
            title="Email*"
            value={profile?.email}
            editable={false}
            color="grey"
          />
        </View>
        <View style={{flex: 1, marginHorizontal: 20,marginTop:hp(7)}}>
          <ButtonPrimary
            onPress={() => {
              setLoading(true);
              editProfile();
            }}
            name="Save"
          />
        </View>
      </ScrollView>
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.wheat,
  },
  iconHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleHeader: {
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(3.5),
  },
  signout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary,
  },
  imageLogo: {
    width: wp(35),
    height: hp(17),
    marginVertical: hp(1),
    borderColor: colors.ash,
    borderWidth: 1,
    borderRadius: 4,
  },
});
