import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView
} from 'react-native';

import colors from '../../../assets/config/colors';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  actionFilterCollection,
  actionGetAllCollection,
  actionGetOneCollection,
  actionSearchCollection,
  fetchRequestProfileData,
} from '../../redux/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from '../../components/reusable/Loading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CollectionScreen(props) {
  const {collection} = useSelector(state => state.collectionReducer);
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [privateCheck, setPrivateCheck] = useState(false);
  const [publicCheck, setPublicCheck] = useState(false);
  const [classicCheck, setClassicCheck] = useState(false);
  const [minimalistCheck, setMinimalistCheck] = useState(false);
  const [darkmodeCheck, setDarkmodeCheck] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [passingId, setPassingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const classic = classicCheck == true ? '1' : '';
  const minim = minimalistCheck == true ? '2' : '';
  const dark = darkmodeCheck == true ? '3' : '';
  const privateC = privateCheck == true ? '1' : '0';
  const publicC = publicCheck == true ? '1' : '0';

  const filter = {classic, minim, dark, privateC, publicC};

  useEffect(() => {
    dispatch(actionGetAllCollection());
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const editDeleteHandler = id => {
    if (setPassingId(id)) {
      setPassingId(!passingId);
    }
  };

  const delCollection = async () => {
    const token = await AsyncStorage.getItem('token');
    var config = {
      method: 'delete',
      url:
        'https://portraiture.gabatch11.my.id/collection/delete?id_collection=' +
        passingId,
      headers: {Authorization: `bearer ${token}`},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(actionGetAllCollection());
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={24} color={colors.black} />
          <TextInput
            style={styles.textInput}
            placeholder="Search collection"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              setLoading(true);
              setTimeout(() => {
                dispatch(actionSearchCollection(search));
                setSearch('');
                setLoading(false);
              }, 300);
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Collection</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.filter}>
          <View>
            <Icon style={styles.iconTop} name="ray-start" size={24} />
            <Icon style={styles.iconBottom} name="ray-end" size={24} />
          </View>
          <Text style={styles.textFilter}>Filter</Text>
        </TouchableOpacity>
      </View>
      {collection.length !== 0 && (
        <View style={styles.content}>
          <FlatList
            data={collection}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              console.log(item);
              return (
                <View style={styles.items}>
                  <View style={styles.imgItems}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(actionGetOneCollection(item.id));
                        if (item.theme == 'Classic') {
                          props.navigation.navigate('Classic', {item: item});
                        } else if (item.theme == 'Minimalism') {
                          props.navigation.navigate('Minimalist', {item: item});
                        } else {
                          props.navigation.navigate('DarkMode', {item: item});
                        }
                      }}>
                      <Image
                        source={{uri: item.cover}}
                        style={styles.imgCollection}
                      />
                    </TouchableOpacity>
                    <View style={styles.top}>
                      <View style={styles.descCol}>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.date}>
                          {item.date.slice(0, 10)}
                        </Text>
                      </View>
                      {passingId !== item.id ? (
                        <TouchableOpacity
                        style={{alignItems:'center',justifyContent:'center'}}
                          onPress={() => editDeleteHandler(item.id)}>
                          <Icon
                            name="dots-horizontal"
                            size={25}
                            color={colors.gun}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                        style={{alignItems:'center',justifyContent:'center'}}
                          onPress={() => setPassingId(!passingId)}>
                          <Icon
                            name="dots-horizontal-circle-outline"
                            size={25}
                            color={colors.gun}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    {passingId == item.id ? (
                      <View style={styles.editDeleteWrap}>
                        <View style={styles.editDeleteBtn}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                dispatch(actionGetOneCollection(item.id));
                                props.navigation.navigate('Detail', {
                                  item: item,
                                });
                                setPassingId(!passingId);
                              }}>
                              <Icon
                                name="cog-sync-outline"
                                size={24}
                                color={colors.info}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setLoading(true);
                                delCollection();
                              }}>
                              <Icon
                                name="delete-outline"
                                size={24}
                                color={colors.error}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
      {collection.length == 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text style={{fontFamily: 'Montserrat-Bold', color: colors.primary}}>
            Collection Not Found !
          </Text>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                dispatch(actionGetAllCollection());
                setLoading(false);
              }, 300);
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                borderColor: colors.secondary,
                color: colors.primary,
                borderWidth: 1,
                padding: 10,
                marginTop: 10,
              }}>
              Get all collection
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.add}>
        <TouchableOpacity
          onPress={() => {
            dispatch(fetchRequestProfileData());
            props.navigation.navigate('NewCollectionStack');
          }}
          style={styles.new}>
          <Text style={styles.textNew}>+ New Collection</Text>
        </TouchableOpacity>
      </View>
      <Modal style={styles.modalWrapper} isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitle}>
            <Text style={styles.titleFilter}>Collections Filter</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat-Bold',
              }}>
              Privacy
            </Text>
            <Text style={{color: colors.ash, fontFamily: 'Montserrat-Regular'}}>
              You may select more than one
            </Text>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                disabled={false}
                boxType="square"
                lineWidth={2}
                tintColor={colors.primary}
                onFillColor={colors.primary}
                onCheckColor={colors.white}
                onTintColor={colors.primary}
                style={{width: 26, height: 26}}
                value={privateCheck}
                onValueChange={newValue => setPrivateCheck(newValue)}
              />
              <Text style={styles.checkBoxText}>Private</Text>
            </View>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                disabled={false}
                boxType="square"
                lineWidth={2}
                tintColor={colors.primary}
                onFillColor={colors.primary}
                onCheckColor={colors.white}
                onTintColor={colors.primary}
                style={{width: 26, height: 26}}
                value={publicCheck}
                onValueChange={newValue => setPublicCheck(newValue)}
              />
              <Text style={styles.checkBoxText}>Public</Text>
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat-Bold',
              }}>
              Theme
            </Text>
            <Text style={{color: colors.ash, fontFamily: 'Montserrat-Regular'}}>
              You may select more than one
            </Text>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                disabled={false}
                boxType="square"
                lineWidth={2}
                tintColor={colors.primary}
                onFillColor={colors.primary}
                onCheckColor={colors.white}
                onTintColor={colors.primary}
                style={{width: 26, height: 26}}
                value={classicCheck}
                onValueChange={newValue => setClassicCheck(newValue)}
              />
              <Text style={styles.checkBoxText}>Classic</Text>
            </View>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                disabled={false}
                boxType="square"
                lineWidth={2}
                tintColor={colors.primary}
                onFillColor={colors.primary}
                onCheckColor={colors.white}
                onTintColor={colors.primary}
                style={{width: 26, height: 26}}
                value={minimalistCheck}
                onValueChange={newValue => setMinimalistCheck(newValue)}
              />
              <Text style={styles.checkBoxText}>Minimalist</Text>
            </View>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                disabled={false}
                boxType="square"
                lineWidth={2}
                tintColor={colors.primary}
                onFillColor={colors.primary}
                onCheckColor={colors.white}
                onTintColor={colors.primary}
                style={{width: 26, height: 26}}
                value={darkmodeCheck}
                onValueChange={newValue => setDarkmodeCheck(newValue)}
              />
              <Text style={styles.checkBoxText}>Dark Mode</Text>
            </View>
          </View>
          <View style={styles.applyWrapper}>
            <TouchableOpacity
              onPress={() => {
                dispatch(actionFilterCollection(filter));
                toggleModal()
              }}
              style={styles.apply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </Modal>
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems:'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: Platform.OS === 'android' ? wp(0) : wp(3),
    paddingHorizontal: Platform.OS === 'android' ? wp(3) : wp(3),
    marginTop: Platform.OS === 'android' ? hp(1.5) : hp(0),
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 20,
  },
  textInput: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    width: '90%',
    maxWidth: '90%',
  },
  title: {
    fontSize: 17,
    marginVertical: 20,
    fontFamily: 'Montserrat-Bold',
  },
  textFilter: {
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
  },
  items: {
    marginRight: 15,
    marginBottom: 10,
  },
  imgItems: {
    // width: 180,
  },
  imgCollection: {
    width: wp(43),
    height: hp(17),
    backgroundColor: colors.ash,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  descCol:{
    width:wp(30)
  },
  name: {
    fontFamily: 'Montserrat-Bold',
  },
  date: {
    color: colors.ash,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  editDeleteWrap: {
    position: 'absolute',
    width: '100%',
    bottom: 42,
  },
  editDeleteBtn: {
    paddingTop: 12,
    backgroundColor: colors.wheat,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTop: {
    top: 7,
  },
  iconBottom: {
    bottom: 7,
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  new: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  textNew: {
    color: colors.white,
    padding: 14,
    fontFamily: 'Montserrat-Bold',
  },
  modalWrapper: {
    flex: 1,
    position: 'absolute',
    bottom: -20,
  },
  modalContainer: {
    backgroundColor: colors.white,
    width: wp(100),
    height: hp(53),
    marginLeft: -20,
    paddingHorizontal: 30,
    paddingTop:hp(2)
  },
  modalTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleFilter: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: 'Montserrat-Bold',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? hp(0) : hp(1.5),
  },
  checkBoxText: {
    marginLeft: 20,
    fontFamily: 'Montserrat-Regular',
  },
  applyWrapper: {
    justifyContent: 'center',
    flex: 1,
    marginTop:hp(2)
  },
  apply: {
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  applyText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    padding: 14,
    fontFamily: 'Montserrat-Bold',
  },
});
