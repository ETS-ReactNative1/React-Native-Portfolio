import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Platform
} from 'react-native';

import colors from '../../../assets/config/colors';
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {actionGetAllCollection, collectionPhotosAction} from '../../redux/actions/action';
import Loading from '../../components/reusable/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function CollectionPhotos(props) {
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState({
    mime: '',
    path: '',
    name: '',
  });
  console.log('photos', photos);
  const [radioBtn, setRadioBtn] = useState(true);
  const [save, setSave] = useState(true);

  const [loading, setLoading] = useState(false);

  const title = props.route.params.add.title;
  const description = props.route.params.add.description;
  const date = props.route.params.add.date;
  const id_user = props.route.params.add.id_user;
  const theme = props.route.params.add.pickTheme;
  const showGallery = props.route.params.add.showGallery;
  const downloadOption = props.route.params.add.downloadOption;
  const [id_collection, setId_collection] = useState();

  const [coverCheck, setCoverCheck] = useState({
    mime: '',
    path: '',
    name: '',
  });

  const toggleSave = () => {
    setSave(!save);
    setRadioBtn(!radioBtn);
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 7,
      compressImageQuality: 0.8,
    })
      .then(images => {
        console.log(images);
        setPhotos(images);
      })
      .catch(e => alert(e));
  };

  const deletePhoto = index => {
    setPhotos(prevItemState =>
      prevItemState.filter((_item, _Index) => _Index !== index),
    );
  };

  const coverHandler = item => {
    setCoverCheck({
      mime: item.mime,
      path: item.path,
      name: item.filename,
    });
  };

  const collectionDetails = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('date', date);
    data.append('id_user', id_user);
    data.append('theme', theme);
    data.append('showGallery',showGallery);
    data.append('downloadOption',downloadOption);
    data.append('image', {
      uri: Platform.OS === 'android' ? coverCheck.path : 'file://' + coverCheck.path,
      type: coverCheck.mime,
      name: coverCheck.path.split('/').pop(),
    });

    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/collection',
      headers: {Authorization: `bearer ${token}`},
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log('col 1', response.data.result.id);
        setId_collection(response.data.result.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addCollectionPhotos = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('id_collection', id_collection);
    data.append(
      'image',
      photos[0] && {
        uri: Platform.OS === 'android' ? photos[0]?.path : 'file://' + photos[0]?.path,
        type: photos[0]?.mime,
        name: photos[0]?.path.split('/').pop(),
      },
    );
    data.append(
      'image',
      photos[1] && {
        uri: Platform.OS === 'android' ? photos[1]?.path : 'file://' + photos[1]?.path,
        type: photos[1]?.mime,
        name: photos[1]?.path.split('/').pop(),
      },
    );
    data.append(
      'image',
      photos[2] && {
        uri: Platform.OS === 'android' ? photos[2]?.path : 'file://' + photos[2]?.path,
        type: photos[2]?.mime,
        name: photos[2]?.path.split('/').pop(),
      },
    );
    data.append(
      'image',
      photos[3] && {
        uri: Platform.OS === 'android' ? photos[3]?.path : 'file://' + photos[3]?.path,
        type: photos[3]?.mime,
        name: photos[3]?.path.split('/').pop(),
      },
    );
    data.append(
      'image',
      photos[4] && {
        uri: Platform.OS === 'android' ? photos[4]?.path : 'file://' + photos[4]?.path,
        type: photos[4]?.mime,
        name: photos[4]?.path.split('/').pop(),
      },
    );
    data.append(
      'image',
      photos[5] && {
        uri: Platform.OS === 'android' ? photos[5]?.path : 'file://' + photos[5]?.path,
        type: photos[5]?.mime,
        name: photos[5]?.path.split('/').pop(),
      },
    );
    data.append(
      'image',
      photos[6] && {
        uri: Platform.OS === 'android' ? photos[6]?.path : 'file://' + photos[6]?.path,
        type: photos[6]?.mime,
        name: photos[6]?.path.split('/').pop(),
      },
    );

    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/collectionImages',
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log('col img', response.data);
        dispatch(actionGetAllCollection());
        props.navigation.navigate('CollectionScreen')
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        style={styles.uploadImage}
        onPress={choosePhotoFromLibrary}>
        <Icon name="cloud-upload-outline" size={22} />
        <Text style={styles.textUpload}>Upload Image</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.descImg}>Accepts JPEG files up to 50MB each</Text>
      </View>
      {photos.length > 0 ? (
        <View>
          {save ? (
            <TouchableOpacity onPress={toggleSave}>
              <Text style={styles.chCover}>Choose cover</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                collectionDetails();
                setLoading(true);
                toggleSave();
                setTimeout(() => {
                  setLoading(false);
                }, 500);
              }}>
              <Text style={styles.chCover}>Save changes</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
      <View style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            console.log('and p',item);
            return (
              <ScrollView>
                <View style={styles.photoContainer}>
                  {radioBtn ? (
                    <TouchableOpacity
                      onPress={() => deletePhoto(index)}
                      style={styles.IconBtn}>
                      <Icon
                        name="close-circle"
                        size={30}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.checkBox}>
                      <TouchableOpacity
                        onPress={async () => coverHandler(item)}>
                        <Icon
                          name="radiobox-marked"
                          size={27}
                          color={
                            coverCheck?.path == item.path
                              ? colors.primary
                              : colors.white
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <AutoHeightImage
                    style={styles.imageList}
                    width={370}
                    source={{uri: item.path}}
                  />
                </View>
              </ScrollView>
            );
          }}
        />
      </View>
      <View style={styles.btnNext}>
        {id_collection !== undefined ? (
          <TouchableOpacity
            onPress={() => {
              if (coverCheck.path === '') {
                alert('Choose a cover image first');
              } else {
                setLoading(true);
                addCollectionPhotos();
              }
            }}
            style={styles.next}>
            <Text style={styles.nextTxt}>Save Collection</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.notNext}>
            <Text style={styles.noNextTxt}>Choose Cover to Save ...</Text>
            <ActivityIndicator size="small" color={colors.secondary} />
          </View>
        )}
      </View>
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  uploadImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  textUpload: {
    padding: 14,
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    alignItems: 'center',
  },
  descImg: {
    marginVertical: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },

  next: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notNext: {
    backgroundColor: colors.vogue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nextTxt: {
    color: 'white',
    fontSize: 16,
    padding: 14,
    fontFamily: 'Montserrat-Bold',
  },
  noNextTxt: {
    color: colors.secondary,
    fontSize: 16,
    padding: 14,
    fontFamily: 'Montserrat-Bold',
  },

  chCover: {
    textAlign: 'center',
    color: colors.secondary,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  photoContainer: {
    marginBottom: 10,
  },
  imageList: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  IconBtn: {
    position: 'absolute',
    zIndex: 100,
    right: 10,
    top: 10,
  },
  checkBox: {
    position: 'absolute',
    zIndex: 100,
    right: 10,
    top: 10,
    borderRadius: 10,
  },
});
