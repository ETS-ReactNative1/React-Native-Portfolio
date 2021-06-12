import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import colors from '../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../../components/reusable/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {actionGetOneCollection} from '../../redux/actions/action';

export default function Edit(props) {
  const dispatch = useDispatch();
  const {oneCollection} = useSelector(state => state.collectionReducer);

  const [dropdownDetail, setDropdownDetail] = useState(false);
  const [dropdownPhoto, setDropdownPhoto] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const imgShow = oneCollection.collectionImages;
  const [title, setTitle] = useState(oneCollection.title);
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState(oneCollection.description);
  const id_collection = oneCollection.id;
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [labelDelete, setLabelDelete] = useState('');
  const [cover, setCover] = useState({
    mime: '',
    path: '',
    name: '',
  });

  const labelDeleteHandler = id => {
    setLabelDelete(id);
  };
  useEffect(() => {
    var imgFilter = [];
    if (imgShow.length == 0) {
      setImg([]);
    } else {
      for (let i = 0; i <= imgShow.length; i++) {
        if (i % 2) {
          imgFilter.push(imgShow[i]);
          setImg(imgFilter);
        }
      }
    }
  }, [imgShow]);

  const dropdownDetailHandler = () => {
    setDropdownDetail(!dropdownDetail);
  };
  const dropdownPhotoHandler = () => {
    setDropdownPhoto(!dropdownPhoto);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    dispatch(actionGetOneCollection(id_collection));
  }, []);

  var months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  var days = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];
  const formattedDate =
    date.getFullYear() +
    '/' +
    months[date.getMonth()] +
    '/' +
    days[date.getDate() - 1];

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageQuality: 0.8,
    })
      .then(images => {
        setCover({
          mime: images.mime,
          path: images.path,
          name: images.filename,
        });
      })
      .catch(e => alert(e));
  };

  const editColelctionHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('title', title);
    data.append('date', formattedDate);
    data.append('description', desc);

    var config = {
      method: 'put',
      url:
        'https://portraiture.gabatch11.my.id/collection?id_collection=' +
        id_collection,
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        props.navigation.goBack();
        dispatch(actionGetOneCollection(id_collection));
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const changeCoverHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('title', title);
    data.append('date', formattedDate);
    data.append('description', desc);
    data.append('image', {
      uri: 'file://' + cover.path,
      type: cover.mime,
      name: cover.name,
    });

    var config = {
      method: 'put',
      url:
        'https://portraiture.gabatch11.my.id/collection?id_collection=' +
        id_collection,
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(actionGetOneCollection(id_collection));
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const deleteImageHandler = id => {
    var config = {
      method: 'delete',
      url: 'https://portraiture.gabatch11.my.id/collectionImages/one?id=' + id,
    };
    axios(config)
      .then(function (response) {
        console.log('i', response.data);
        setLabelDelete(true);
        dispatch(actionGetOneCollection(id_collection));
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={styles.wrapper}>
          <View>
            <TouchableOpacity
              onPress={dropdownDetailHandler}
              style={styles.dropdown}>
              <Text style={styles.textDropdown}>Collection Details</Text>
              <Icon
                name={dropdownDetail == false ? 'chevron-down' : 'chevron-up'}
                size={30}
                color={colors.primary}
              />
            </TouchableOpacity>
            {dropdownDetail == true ? (
              <View style={styles.input}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                  style={styles.textInput}
                  value={title}
                  onChangeText={setTitle}
                />
                <Text style={styles.title}>Date</Text>
                <TouchableOpacity
                  style={styles.textInput}
                  onPress={toggleModal}>
                  <Text style={{fontFamily: 'Montserrat-Regular'}}>
                    {formattedDate}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.title}>Description</Text>
                <TextInput
                  multiline
                  style={styles.textInput}
                  value={desc}
                  onChangeText={setDesc}
                />
                <View style={{flex: 1}}>
                  <Modal isVisible={isModalVisible}>
                    <View style={styles.modalWrapper}>
                      <DatePicker
                        mode="date"
                        date={date}
                        onDateChange={setDate}
                      />
                      <TouchableOpacity
                        style={styles.confirmDate}
                        onPress={toggleModal}>
                        <Text style={styles.confirmText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.containerPhotos}>
          <TouchableOpacity
            onPress={dropdownPhotoHandler}
            style={styles.dropdown}>
            <Text style={styles.textDropdown}>Collection Photos</Text>
            <Icon
              name={dropdownPhoto == false ? 'chevron-down' : 'chevron-up'}
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
          {dropdownPhoto == true ? (
            <View style={{marginVertical: 20, flex: 1}}>
              <View>
                <TouchableOpacity
                  style={styles.uploadImage}
                  onPress={choosePhotoFromLibrary}>
                  <Icon name="cloud-upload-outline" size={22} />
                  <Text style={styles.textUpload}>Choose Cover Image</Text>
                </TouchableOpacity>
                {cover.mime !== '' && (
                  <TouchableOpacity
                    onPress={() => {
                      setLoading(true);
                      changeCoverHandler();
                    }}
                    style={{alignItems: 'center', marginVertical: 5}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: colors.secondary,
                      }}>
                      Change Cover
                    </Text>
                  </TouchableOpacity>
                )}
                <View>
                  <View style={styles.coverWrap}>
                    <Text style={styles.coverlabel}>Cover</Text>
                  </View>
                  <AutoHeightImage
                    style={styles.imageList}
                    width={374}
                    source={{uri: oneCollection.cover}}
                  />
                </View>
              </View>
              <View
                style={{flex: 1, marginTop: 10}}
                showsVerticalScrollIndicator={false}>
                {img.map(item => {
                  return (
                    <View key={item.id} style={styles.photoContainer}>
                      {labelDelete == item.id ? (
                        <View
                          style={{
                            position: 'absolute',
                            backgroundColor: colors.error,
                            zIndex: 1000,
                            width: '100%',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              color: 'white',
                              paddingVertical: 5,
                            }}>
                            Deleted
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setLoading(true);
                            deleteImageHandler(item.id);
                            labelDeleteHandler(item.id);
                          }}
                          style={styles.IconBtn}>
                          <Icon
                            name="close-circle"
                            size={30}
                            color={colors.white}
                          />
                        </TouchableOpacity>
                      )}
                      <AutoHeightImage
                        style={styles.imageList}
                        width={374}
                        source={{uri: item.image}}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.btnNext}>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            editColelctionHandler();
          }}
          style={styles.next}>
          <Text style={styles.nextTxt}>Save</Text>
        </TouchableOpacity>
      </View>
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 20,
  },
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.mint,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
  },
  textDropdown: {
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  modalWrapper: {
    backgroundColor: 'rgba(244,244,244,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  confirmDate: {
    backgroundColor: colors.primary,
    marginBottom: 20,
    borderRadius: 6,
  },
  confirmText: {
    color: 'white',
    padding: 15,
    width: 300,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  picker: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 30,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },

  uploadImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondary,
    borderWidth: 2,
    marginBottom: 10,
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

  chCover: {
    textAlign: 'center',
    color: colors.secondary,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  photoContainer: {
    marginBottom: 10,
    flex: 1,
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
  containerPhotos: {
    flex: 1,
    paddingHorizontal: 20,
  },

  btnNext: {
    marginHorizontal: 20,
  },
  next: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextTxt: {
    color: 'white',
    fontSize: 16,
    padding: 14,
    fontFamily: 'Montserrat-Bold',
  },
  coverlabel: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    textAlign: 'center',
    paddingVertical: 5,
  },
  coverWrap: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: 70,
    position: 'absolute',
    zIndex: 100,
    left: 10,
    top: 10,
  },
});
