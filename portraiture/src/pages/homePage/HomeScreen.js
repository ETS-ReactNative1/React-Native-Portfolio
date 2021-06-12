import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {
  actionGetAllCollection,
  actionGetOneCollection,
  fetchRequestPackageItems,
  fetchRequestProfileData,
  fetchRequestProjectItems,
  projectDetailId,
} from '../../redux/actions/action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const {collection} = useSelector(state => state.collectionReducer);
  const {profile} = useSelector(state => state.authReducer);
  const {projectItems} = useSelector(state => state.projectReducer);
  const {packageItems} = useSelector(state => state.packageReducer);
  const [passingId, setPassingId] = useState('');

  useEffect(() => {
    dispatch(fetchRequestProfileData());
    dispatch(fetchRequestProjectItems());
    dispatch(fetchRequestPackageItems());
    dispatch(actionGetAllCollection());
  }, []);

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

  const pathImg = 'https://portraiture.gabatch11.my.id';
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.imageBg}
        source={require('../../img/home.png')}>
        <View style={styles.headerLogo}>
          <Image
            style={styles.logoImg}
            source={{uri: pathImg + profile?.photo}}
          />
          <Text style={styles.username}>{profile?.businessName}</Text>
        </View>
        {projectItems?.length !== 0 && (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileScreen')}
            style={styles.accountBtn}>
            <Icon name="account" size={30} color={colors.white} />
          </TouchableOpacity>
        )}
        {projectItems?.length == 0 ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileScreen')}
            style={styles.setupBtn}>
            <Text style={styles.setupTxt}>Set up my studio</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.upcomingProject}>
            <Text style={styles.titleUpProject}>Last Project</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  projectDetailId(projectItems[projectItems.length - 1].id),
                );
                props.navigation.navigate('ProjectStack');
              }}>
              <Text style={styles.projTitle}>
                {projectItems[projectItems?.length - 1].title}
              </Text>
              <Text style={styles.projDate}>
                {projectItems[projectItems?.length - 1].date}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ProjectScreen')}
                style={styles.seeDetails}>
                <Text style={styles.cDetailText}>See details</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {projectItems?.length == 0 ? (
            <View>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>
                It’s really nice have you here
              </Text>
              <Text style={{fontFamily: 'Montserrat-Bold'}}>
                Let’s check out what you can do!
              </Text>
            </View>
          ) : null}
          {projectItems?.length === 0 ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('NewProject')}
              style={styles.create}>
              <View style={styles.createTop}>
                <MaskedView
                  style={{height: 30, width: 30}}
                  maskElement={
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="briefcase-variant"
                        size={30}
                        color={colors.primary}
                      />
                    </View>
                  }>
                  <LinearGradient
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    colors={[colors.primary, colors.secondary]}
                    style={{flex: 1}}
                  />
                </MaskedView>
                <Text style={styles.createName}>Create a new Project</Text>
              </View>
              <Text style={styles.desc}>
                Input a package, manage your schedule rundown and invoice.
              </Text>
            </TouchableOpacity>
          ) : null}
          {packageItems?.length == 0 ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('NewPackage')}
              style={styles.create}>
              <View style={styles.createTop}>
                <MaskedView
                  style={{height: hp(3), width: wp(7)}}
                  maskElement={
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="folder" size={30} color={colors.primary} />
                    </View>
                  }>
                  <LinearGradient
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    colors={[colors.primary, colors.secondary]}
                    style={{flex: 1}}
                  />
                </MaskedView>
                <Text style={styles.createName}>Create a new Package</Text>
              </View>
              <Text style={styles.desc}>
                Create a package items and price into your project.
              </Text>
            </TouchableOpacity>
          ) : null}
          {collection?.length == 0 ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('NewCollectionStack')}
              style={styles.create}>
              <View style={styles.createTop}>
                <MaskedView
                  style={{height: 30, width: 30}}
                  maskElement={
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="image" size={30} color={colors.primary} />
                    </View>
                  }>
                  <LinearGradient
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    colors={[colors.primary, colors.secondary]}
                    style={{flex: 1}}
                  />
                </MaskedView>
                <Text style={styles.createName}>Create a new Collection</Text>
              </View>
              <Text style={styles.desc}>
                A collection photos for a client to view and download.
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  marginBottom: 10,
                  fontSize: 16,
                }}>
                My Collection
              </Text>
              <View>
              <FlatList
                data={collection}
                keyExtractor={item => item.id}
                horizontal={false}
                numColumns={2}
                renderItem={({item}) => {
                  console.log(item);
                  return (
                    <View style={styles.items}>
                      <View style={styles.imgItems}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(actionGetOneCollection(item.id));
                            if (item.theme == 'Classic') {
                              props.navigation.navigate('Classic', {
                                item: item,
                              });
                            } else if (item.theme == 'Minimalism') {
                              props.navigation.navigate('Minimalist', {
                                item: item,
                              });
                            } else {
                              props.navigation.navigate('DarkMode', {
                                item: item,
                              });
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
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onPress={() => editDeleteHandler(item.id)}>
                              <Icon
                                name="dots-horizontal"
                                size={25}
                                color={colors.gun}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
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
            </View>
          )}
          <View style={{marginBottom: hp(5)}}></View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageBg: {
    flex: 0.5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: wp(4.5),
  },
  username: {
    color: colors.white,
    fontSize: wp(4),
    marginBottom: hp(5),
    marginTop: hp(5.5),
    fontFamily: 'Montserrat-Bold',
  },
  titleUpProject: {
    fontFamily: 'Montserrat-Regular',
    color: colors.ash,
  },
  projTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#684211',
    fontSize: 15,
  },
  cDetailText: {
    color: colors.gun,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Regular',
  },
  projDate: {
    fontFamily: 'Montserrat-Regular',
    color: colors.gun,
  },
  accountBtn: {
    right: 20,
    top: hp(8),
    position: 'absolute',
  },
  logoImg: {
    width: wp(22),
    height: hp(10),
    top: hp(5),
    borderRadius: 10,
  },
  upcomingProject: {
    backgroundColor: colors.cream,
    justifyContent: 'space-between',
    padding: 10,
    height: hp(12),
    bottom: -70,
    marginTop: -70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 6,
  },
  seeDetails: {
    alignItems: 'flex-end',
  },
  setupBtn: {
    backgroundColor: colors.secondary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setupTxt: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: hp(2),
    paddingTop:hp(6)
  },
  create: {
    backgroundColor: colors.cream,
    padding: wp(4),
    borderRadius: 10,
    marginTop: hp(2.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  createTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createName: {
    color: colors.primary,
    fontSize: wp(4),
    marginLeft: wp(3),
    fontFamily: 'Montserrat-Bold',
  },
  desc: {
    color: colors.primary,
    marginTop: hp(1.5),
    fontFamily: 'Montserrat-Regular',
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
    height: hp(18),
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
});
