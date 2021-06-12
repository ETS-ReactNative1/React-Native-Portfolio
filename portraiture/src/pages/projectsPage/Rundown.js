import React, {useState, useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  actionEventRundown,
  fetchAddPersonRundown,
} from '../../redux/actions/action';
import Schedule from '../../components/reusable/Schedule';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from '../../components/reusable/Loading';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

export default function Rundown(props) {
  const dispatch = useDispatch();
  const {person} = useSelector(state => state.projectReducer);
  const {event} = useSelector(state => state.projectReducer);
  console.log('e', event);
  const [addState, setAddState] = useState('');
  const [nameState, setNameState] = useState(false);
  const [addPerson, setAddPerson] = useState('');
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [desc, setDesc] = useState('');
  const [themeColor, setThemeColor] = useState('1');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleTimeFrom, setModalVisibleTimeFrom] = useState(false);
  const [isModalVisibleTimeTo, setModalVisibleTimeTo] = useState(false);

  const timeMinutes = from.getMinutes() === 0 ? '00' : from.getMinutes();
  const timeFrom = from.getHours() + ':' + timeMinutes;

  const timeMinutesTo = to.getMinutes() === 0 ? '00' : to.getMinutes();
  const timeTo = to.getHours() + ':' + timeMinutesTo;

  const [themePicker, setThemePicker] = useState(false);
  const [addPersonName, setAddPersonName] = useState();
  const [addPersonId, setAddPersonId] = useState();

  useEffect(() => {
    dispatch(fetchAddPersonRundown(projectId));
  }, []);

  const addPersonNameHandler = item => {
    setAddPersonName(item.person);
    setAddPersonId(item.id_rundown);
  };

  const themeChange = name => {
    setThemeColor(name);
    setThemePicker(!themePicker);
  };

  const toggleTheme = () => {
    setThemePicker(!themePicker);
  };

  const toggleModalTime = () => {
    setModalVisibleTimeFrom(!isModalVisibleTimeFrom);
  };

  const toggleModalTimeTo = () => {
    setModalVisibleTimeTo(!isModalVisibleTimeTo);
  };

  const toggleModal = () => {
    if (addPersonName == undefined || addPersonName == '+ Add Person') {
      alert('Choose some person first !');
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const projectId = props.route.params.package.id;

  const addStateHandler = id => {
    setAddState(id);
  };
  console.log('id', addState);

  const namePersonHandler = () => {
    setNameState(!nameState);
  };

  const addPersonHandler = async () => {
    const token = await AsyncStorage.getItem('token');

    var FormData = require('form-data');
    var data = new FormData();
    data.append('id_project', projectId);
    data.append('person', addPerson);

    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/rundown',
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };
    axios(config)
      .then(function (response) {
        dispatch(fetchAddPersonRundown(projectId));
        setAddState(!addState);
        setAddPerson('');
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const themeList = [
    {key: Math.random().toString(), name: '1'},
    {key: Math.random().toString(), name: '2'},
  ];

  const rundownEvent = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('id_rundown', addState);
    data.append('name', eventName);
    data.append('from', timeFrom);
    data.append('to', timeTo);
    data.append('description', desc);
    data.append('theme', themeColor);

    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/event',
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(actionEventRundown(addPersonId));
        setEventName('');
        setDesc('');
        setModalVisible(!isModalVisible);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Icon
          onPress={() => props.navigation.goBack()}
          name="chevron-left"
          size={38}
        />
        <View style={styles.headerMid}>
          <Text style={styles.headerDate}>
            Rundown | {props.route.params.package.date}
          </Text>
          <Text style={styles.headerTitle}>
            {props.route.params.package.title}
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.addPerson}>
        {person.length === 0 && (
          <TouchableOpacity onPress={() => addStateHandler(999)}>
            <Text> + Add Person</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={person}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            console.log('i', item);
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(actionEventRundown(item.id_rundown));
                  addStateHandler(item.id_rundown);
                  addPersonNameHandler(item);
                }}
                style={styles.personList}>
                <Text
                  style={
                    item.id_rundown === 999
                      ? styles.addPersonName
                      : addPersonName == item.person
                      ? styles.personName
                      : styles.personNameUn
                  }>
                  {item.person}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{flex: 1}}>
        {addState == 999 && (
          <View style={styles.inputPerson}>
            <TextInput
              style={styles.textPerson}
              autoFocus={true}
              placeholder="Type person name"
              value={addPerson}
              onChangeText={setAddPerson}
            />
            <View style={styles.buttonAdd}>
              <Icon
                onPress={() => {
                  setLoading(true);
                  addPersonHandler();
                }}
                name="check-bold"
                size={28}
                color={colors.success}
              />
              <Icon
                onPress={() => setAddState()}
                name="close-thick"
                size={28}
                color={colors.error}
              />
            </View>
          </View>
        )}

        <View style={styles.scheduleWrapper}>
          <Schedule
            onPress={toggleModal}
            eventName1={event !== undefined && event[0]?.name}
            from1={event !== undefined && event[0]?.from}
            to1={event !== undefined && event[0]?.to}
            desc1={event !== undefined && event[0]?.description}
            theme1={event !== undefined && event[0]?.theme}
            eventName2={event !== undefined && event[1]?.name}
            from2={event !== undefined && event[1]?.from}
            to2={event !== undefined && event[1]?.to}
            desc2={event !== undefined && event[1]?.description}
            theme2={event !== undefined && event[1]?.theme}
          />
        </View>
      </View>
      <Modal style={styles.modalWraper} onBackdropPress={toggleModal} isVisible={isModalVisible}>
        <ScrollView>
          <View style={{flex: 1}}>
            <Text style={styles.timeText}>{addPersonName}</Text>
            <TextInput
              style={styles.eventName}
              value={eventName}
              onChangeText={setEventName}
              placeholder="Event Name"
            />
            <View style={styles.timeSchedule}>
              <View>
                <Text style={styles.timeText}>From</Text>
                <View style={styles.eventFTT}>
                  <Text style={styles.timeText}>{timeFrom}</Text>
                  <TouchableOpacity onPress={toggleModalTime}>
                    <Icon name="chevron-down" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.timeText}>To</Text>
                <View style={styles.eventFTT}>
                  <Text style={styles.timeText}>{timeTo}</Text>
                  <TouchableOpacity onPress={toggleModalTimeTo}>
                    <Icon name="chevron-down" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.timeText}>Theme</Text>
                <View style={styles.eventFTT}>
                  <Icon
                    name="square"
                    size={24}
                    color={themeColor == 1 ? colors.info : colors.secondary}
                  />
                  <TouchableOpacity onPress={toggleTheme}>
                    <Icon name="chevron-down" size={24} />
                  </TouchableOpacity>
                </View>

                {themePicker == true ? (
                  <View>
                    {themeList.map(e => {
                      return (
                        <TouchableOpacity
                          onPress={() => themeChange(e.name)}
                          key={e.key}>
                          <Icon
                            name="square"
                            size={24}
                            color={e.name == 1 ? colors.info : colors.secondary}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            </View>
            <Modal isVisible={isModalVisibleTimeFrom}>
              <View style={styles.modalWrapper}>
                <DatePicker
                  minuteInterval={30}
                  mode="time"
                  date={from}
                  onDateChange={setFrom}
                />
                <ButtonPrimary onPress={toggleModalTime} name="Confirm" />
              </View>
            </Modal>
            <Modal isVisible={isModalVisibleTimeTo}>
              <View style={styles.modalWrapper}>
                <DatePicker
                  minuteInterval={30}
                  mode="time"
                  date={to}
                  onDateChange={setTo}
                />
                <ButtonPrimary onPress={toggleModalTimeTo} name="Confirm" />
              </View>
            </Modal>
            <View style={styles.details}>
              <Text style={{fontFamily: 'Montserrat-Bold'}}>Details</Text>
              <TextInput
                style={styles.detailsBox}
                multiline
                placeholder="Add event description"
                value={desc}
                onChangeText={setDesc}
              />
            </View>
            <View style={{flex: 1, marginTop:hp(4)}}>
              <ButtonPrimary
                onPress={() => {
                  rundownEvent();
                  setModalVisible(!isModalVisible);
                }}
                name="Save"
              />
            </View>
          </View>
        </ScrollView>
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
  header: {
    backgroundColor: colors.wheat,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  headerMid: {
    marginLeft: 20,
  },
  headerDate: {
    fontFamily: 'Montserrat-Bold',
  },
  headerTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  addPerson: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  personName: {
    fontFamily: 'Montserrat-Bold',
    marginRight: 50,
  },
  personNameUn: {
    fontFamily: 'Montserrat-Regular',
    marginRight: 50,
  },
  addPersonName: {
    fontFamily: 'Montserrat-Bold',
    marginRight: 50,
    color: colors.secondary,
  },
  inputPerson: {
    borderColor: colors.ash,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginHorizontal: 30,
  },
  textPerson: {
    flex: 1,
  },
  buttonAdd: {
    flexDirection: 'row',
    marginLeft: 10,
    flex: 0.23,
    justifyContent: 'space-between',
  },
  scheduleWrapper: {
    flex: 1,
  },
  modalWraper: {
    backgroundColor: 'white',
    marginTop:'80%',
    paddingHorizontal:40,
    paddingTop:10,
    marginHorizontal:-20,
    marginBottom:-20
  },
  timeSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalWrapper: {
    backgroundColor: 'rgba(244,244,244,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 0.4,
  },
  eventFTT: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    paddingBottom: 5,
  },
  eventName: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    fontFamily: 'Montserrat-Bold',
  },
  timeText: {
    fontFamily: 'Montserrat-Regular',
  },
  details: {
    height: '30%',
    marginVertical:20
  },
  detailsBox: {
    padding: 20,
    marginTop: 10,
    borderColor: colors.ash,
    borderWidth: 1,
    height: '100%',
  },
});
