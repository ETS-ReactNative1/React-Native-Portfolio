import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';

import colors from '../../../assets/config/colors';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  actionFilterProject,
  actionSearchProject,
  fetchRequestProjectItems,
  projectDetailId,
} from '../../redux/actions/action';
import axios from 'axios';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/reusable/Loading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ProjectScreen({navigation}) {
  const {projectItems} = useSelector(state => state.projectReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [planned, setPlanned] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const projectFilter =
    planned == true && completed == false
      ? '0'
      : planned == false && completed == true
      ? '1'
      : '';

  useEffect(() => {
    dispatch(fetchRequestProjectItems());
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deleteProjectHandler = async id => {
    const token = await AsyncStorage.getItem('token');
    var config = {
      method: 'delete',
      url: 'https://portraiture.gabatch11.my.id/project/delete?id=' + id,
      headers: {Authorization: `bearer ${token}`},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRequestProjectItems());
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
            placeholder="Search projects"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              setLoading(true);
              dispatch(actionSearchProject(search));
              setSearch('');
              setTimeout(() => {
                setLoading(false);
              }, 200);
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Projects</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.filter}>
          <View>
            <Icon style={styles.iconTop} name="ray-start" size={24} />
            <Icon style={styles.iconBottom} name="ray-end" size={24} />
          </View>
          <Text style={styles.textFilter}>Filter</Text>
        </TouchableOpacity>
      </View>
      {projectItems?.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'Montserrat-Bold', color: colors.primary}}>
            Project not found
          </Text>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              dispatch(fetchRequestProjectItems());
              setTimeout(() => {
                setLoading(false);
              }, 200);
            }}>
            <Text style={styles.getAllProject}>Get All Project</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <SwipeListView
          data={projectItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            console.log('asd',item);
            return (
              <View style={styles.projectList}>
                <View style={{padding: 5}}>
                  {item.isCompleted == false ? (
                    <View style={styles.labelPlanned}>
                      <Text style={styles.label}>Planned</Text>
                    </View>
                  ) : (
                    <View style={styles.labelCompleted}>
                      <Text style={styles.label}>Completed</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(projectDetailId(item.id));
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        navigation.navigate('ProjectStack');
                      }, 500);
                    }}
                    style={{width: 300}}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.date}>{item.date.slice(0, 10)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          renderHiddenItem={({item}) => {
            return (
              <View style={styles.rowBack}>
                <Text>Left</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditProject', {projectId: item});
                  }}
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                  <Icon name="pencil-outline" size={30} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteProjectHandler(item.id);
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 500);
                  }}
                  style={[styles.backRightBtn, styles.backRightBtnRight]}>
                  <Icon name="delete-outline" size={30} color={colors.white} />
                </TouchableOpacity>
              </View>
            );
          }}
          disableRightSwipe
          rightOpenValue={-150}
        />
      )}
      <View style={styles.add}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewProject')}
          style={styles.new}>
          <Text style={styles.textNew}>+ New Projects</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal style={styles.modalWrapper} isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={{flex: 1}}>
              <View style={styles.modalTitle}>
                <Text style={styles.titleFilter}>Project Filter</Text>
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
                  Status
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
                    value={planned}
                    onValueChange={setPlanned}
                  />
                  <Text style={styles.checkBoxText}>Planned</Text>
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
                    value={completed}
                    onValueChange={setCompleted}
                  />
                  <Text style={styles.checkBoxText}>Completed</Text>
                </View>
              </View>
            </View>
            <View style={styles.applyWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  dispatch(actionFilterProject(projectFilter));
                  toggleModal();
                  setTimeout(() => {
                    setLoading(false);
                  }, 200);
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 20,
    paddingVertical: Platform.OS === 'android' ? wp(0) : wp(3),
    paddingHorizontal: Platform.OS === 'android' ? wp(3) : wp(3),
    marginTop: Platform.OS === 'android' ? hp(1.5) : hp(0),
    alignItems:'center'
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
  projectWrapper: {
    flex: 0.18,
  },
  labelPlanned: {
    backgroundColor: colors.info,
    width: 90,
    borderRadius: 4,
  },
  labelCompleted: {
    backgroundColor: colors.primary,
    width: 110,
    borderRadius: 4,
  },
  label: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  name: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    marginVertical: 10,
  },
  date: {
    color: colors.ash,
    fontFamily: 'Montserrat-Regular',
  },
  editDeleteWrap: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 20,
    zIndex: 100,
    backgroundColor: 'pink',
    zIndex: 1000,
  },
  editDeleteBtn: {
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: 160,
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
  },
  editDeleteTxt: {
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    paddingVertical: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
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
    position: 'absolute',
    bottom: -20,
  },
  modalContainer: {
    backgroundColor: colors.white,
    width: wp(100),
    height: hp(38),
    marginLeft: -20,
    paddingHorizontal: 30,
    paddingVertical: 14,
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
    marginTop: hp(2),
  },
  checkBoxText: {
    marginLeft: 20,
    fontFamily: 'Montserrat-Regular',
  },
  applyWrapper: {
    justifyContent: 'center',
    bottom: 10,
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
  projectList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: colors.white,
    paddingLeft: 20,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.ash,
    marginVertical: 10,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: colors.info,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: colors.error,
    right: 0,
  },
  getAllProject: {
    fontFamily: 'Montserrat-Regular',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
});
