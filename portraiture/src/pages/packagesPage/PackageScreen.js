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
} from 'react-native';

import colors from '../../../assets/config/colors';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '../../components/Slider';
import {useSelector, useDispatch} from 'react-redux';
import {
  actionFilterPackage,
  actionSearchPackage,
  fetchRequestPackageItems,
} from '../../redux/actions/action';
import axios from 'axios';
import Loading from '../../components/reusable/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SliderWrapper = styled.View`
  justify-content: center;
`;

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`;
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LabelText = styled.Text`
  font-size: 12px;
`;

export default function PackageScreen({navigation}) {
  const {packageItems} = useSelector(state => state.packageReducer);
  console.log('packageItems', packageItems);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [ps, setPs] = useState(false);
  const [vid, setVid] = useState(false);
  const [print, setPrint] = useState(false);
  const [digital, setDigital] = useState(false);

  const [dropdown, setDropdown] = useState(false);
  const [passingId, setPassingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [getAll, setGetAll] = useState(false);

  const photoSession = ps === true ? 'Photo Session' : '';
  const video = vid === true ? 'Videography' : '';
  const prints = print === true ? 'Print' : '';
  const digitals = digital === true ? 'Digital' : '';
  const [multiSliderValue, setMultiSliderValue] = useState([0, 20000000]);

  const multiSliderValuesChange = values => setMultiSliderValue(values);

  const price1 = multiSliderValue[0];
  const price2 = multiSliderValue[1];
  console.log(price1, price2);
  const itemCategory = {photoSession, video, prints, digitals, price1, price2};

  useEffect(() => {
    dispatch(fetchRequestPackageItems());
  }, []);

  const editDeleteHandler = id => {
    if (setPassingId(id)) {
      setPassingId(!passingId);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deletePackageHandler = async id => {
    const token = await AsyncStorage.getItem('token');
    var config = {
      method: 'delete',
      url: 'https://portraiture.gabatch11.my.id/package/delete?packageId=' + id,
      headers: {Authorization: `bearer ${token}`},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setPassingId(!id);
        dispatch(fetchRequestPackageItems());
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
            placeholder="Search packages"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            onSubmitEditing={() => {
              setGetAll(true);
              setLoading(true);
              dispatch(actionSearchPackage(search));
              setSearch('');
              setTimeout(() => {
                setLoading(false);
              }, 100);
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Packages</Text>
        {getAll == false && (
          <TouchableOpacity onPress={toggleModal} style={styles.filter}>
            <View>
              <Icon style={styles.iconTop} name="ray-start" size={24} />
              <Icon style={styles.iconBottom} name="ray-end" size={24} />
            </View>
            <Text style={styles.textFilter}>Filter</Text>
          </TouchableOpacity>
        )}
        {getAll == true && (
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              dispatch(fetchRequestPackageItems());
              setGetAll(false);
              setTimeout(() => {
                setLoading(false);
              }, 100);
            }}
            style={styles.allPackage}>
            <Text style={styles.allpackageText}>Get All Package</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        {packageItems?.length == 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{fontFamily: 'Montserrat-Bold', color: colors.primary}}>
              Package not found
            </Text>
          </View>
        ) : (
          <FlatList
            data={packageItems}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <>
                  <View>
                    <Image
                      resizeMode="cover"
                      source={{uri: item.image}}
                      style={styles.imgList}
                    />
                    <View style={styles.packageDesc}>
                      <View>
                        <Text style={styles.descName}>{item.name}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 20,
                          }}>
                          <Icon
                            name="square"
                            size={12}
                            color={colors.secondary}
                          />
                          <Text style={styles.items}>
                            {item.packageItems.length} Items
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => editDeleteHandler(item.id)}>
                        <Icon
                          name="dots-horizontal"
                          size={30}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                    {passingId == item.id ? (
                      <View style={styles.editDeleteWrap}>
                        <View style={styles.editDeleteBtn}>
                          <TouchableOpacity
                            style={{alignItems: 'flex-end'}}
                            onPress={() => {
                              setPassingId(!item.id);
                            }}>
                            <Icon
                              name="close-circle"
                              size={30}
                              color={colors.secondary}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('EditPackage', {
                                packageId: item,
                              });
                              setPassingId(!item.id);
                            }}>
                            <Icon
                              name="pencil"
                              size={20}
                              color={colors.primary}
                            />
                            <Text style={styles.editDeleteTxt}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setLoading(true);
                              deletePackageHandler(item.id);
                              setTimeout(() => {
                                setLoading(false);
                              }, 1500);
                            }}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="delete"
                              size={20}
                              color={colors.primary}
                            />
                            <Text style={styles.editDeleteTxt}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </>
              );
            }}
          />
        )}
      </View>
      <View style={styles.add}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewPackage')}
          style={styles.new}>
          <Text style={styles.textNew}>+ New Package</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal style={styles.modalWrapper} isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitle}>
              <Text style={styles.titleFilter}>Package Filter</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={{fontFamily: 'Montserrat-Regular'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 20}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Item Category
              </Text>
              <Text
                style={{color: colors.ash, fontFamily: 'Montserrat-Regular'}}>
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
                  value={ps}
                  onValueChange={setPs}
                />
                <Text style={styles.checkBoxText}>Photo Session</Text>
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
                  value={vid}
                  onValueChange={setVid}
                />
                <Text style={styles.checkBoxText}>Videography</Text>
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
                  value={print}
                  onValueChange={setPrint}
                />
                <Text style={styles.checkBoxText}>Print</Text>
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
                  value={digital}
                  onValueChange={setDigital}
                />
                <Text style={styles.checkBoxText}>Digital</Text>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat-Bold'}}>
                Total Price
              </Text>
              {/* <Slider /> */}
              <ViewContainer>
                <SliderWrapper>
                  <MultiSlider
                    markerStyle={{
                      ...Platform.select({
                        ios: {
                          height: 30,
                          width: 30,
                          shadowColor: '#000000',
                          shadowOffset: {
                            width: 1,
                            height: 3,
                          },
                          shadowRadius: 1,
                          shadowOpacity: 0.1,
                        },
                        android: {
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                          backgroundColor: colors.secondary,
                        },
                      }),
                    }}
                    pressedMarkerStyle={{
                      ...Platform.select({
                        android: {
                          height: 30,
                          width: 30,
                          borderRadius: 20,
                          backgroundColor: colors.secondary,
                        },
                      }),
                    }}
                    selectedStyle={{
                      backgroundColor: colors.secondary,
                    }}
                    trackStyle={{
                      backgroundColor: '#CECECE',
                    }}
                    touchDimensions={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      slipDisplacement: 40,
                    }}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={320}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={20000000}
                    step={1}
                    selectedStyle={{
                      backgroundColor: colors.secondary,
                      height: 4,
                    }}
                    snapped
                    allowOverlap={false}
                    minMarkerOverlapDistance={30}
                  />
                  <LabelWrapper>
                    <LabelText>
                      Rp.
                      {multiSliderValue[0].toLocaleString({
                        maximumFractionDigits: 2,
                      })}
                    </LabelText>
                    <LabelText>
                      Rp.
                      {multiSliderValue[1].toLocaleString({
                        maximumFractionDigits: 2,
                      })}
                    </LabelText>
                  </LabelWrapper>
                </SliderWrapper>
              </ViewContainer>
            </View>
            <View style={styles.applyWrapper}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(actionFilterPackage(itemCategory));
                  toggleModal();
                }}
                style={styles.apply}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
    width: '90%',
    maxWidth: '90%',
    fontFamily: 'Montserrat-Regular',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  items: {
    width: '48%',
  },
  imgCollection: {
    width: '100%',
    height: 150,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  editDeleteBtn: {
    backgroundColor: colors.white,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: 150,
    borderRadius: 7,
  },
  editDeleteTxt: {
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 23,
    paddingVertical: 8,
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    height: 480,
    marginLeft: -20,
    paddingHorizontal: 30,
    paddingTop: hp(2),
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
    marginTop: 20,
  },
  checkBoxText: {
    marginLeft: 20,
    fontFamily: 'Montserrat-Regular',
  },
  applyWrapper: {
    justifyContent: 'center',
    flex: 1,
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
  imgList: {
    width: '100%',
    height: 230,
    backgroundColor: colors.ash,
  },
  packageDesc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descName: {
    fontFamily: 'Montserrat-Bold',
    marginVertical: 5,
  },
  items: {
    marginLeft: 5,
    fontFamily: 'Montserrat-Regular',
  },
  allpackageText: {
    fontFamily: 'Montserrat-Regular',
    borderColor: colors.ash,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
});
