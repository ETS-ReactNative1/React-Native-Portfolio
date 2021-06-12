import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import colors from '../../../assets/config/colors';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {fetchRequestProfileData} from '../../redux/actions/action';
import {fetchRequestProjectItems} from '../../redux/actions/action';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/reusable/Loading';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import TextinputPrimary from '../../components/reusable/TextinputPrimary';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}
export default function NewProjects({navigation}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRequestProfileData());
  }, []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
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

  const addNewProjectHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('title', title);
    data.append('date', formattedDate);
    data.append('description', description);
    data.append('clientName', clientName);
    data.append('clientAddress', clientAddress);
    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/project',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        dispatch(fetchRequestProjectItems());
        setTitle('');
        setDescription('');
        setClientName('');
        setClientAddress('');
        navigation.goBack();
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView>
        <FocusAwareStatusBar barStyle="dark-content" />
        <View style={{padding: 20}}>
          <Text style={styles.detailTitle}>Project Details</Text>
          <TextinputPrimary
            title="Project Title*"
            placeholder="e.g. Leon & Stella"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.title}>Date*</Text>
          <TouchableOpacity style={styles.textInput} onPress={toggleModal}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              {formattedDate}
            </Text>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalWrapper}>
              <DatePicker mode="date" date={date} onDateChange={setDate} />
              <ButtonPrimary onPress={toggleModal} name="Confirm" />
            </View>
          </Modal>
          <TextinputPrimary
            title="Description"
            multiline
            placeholder="Type collection description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.detailTitle}>Client Details</Text>
          <TextinputPrimary
            title="Client Name*"
            placeholder="e.g. Leon Handoko"
            value={clientName}
            onChangeText={setClientName}
          />
          <TextinputPrimary
            title="Client Address*"
            multiline
            placeholder="e.g. Sunset Boulevard, Pakuwon City
          Kecamatan Mulyorejo, Surabaya
          Jawa Timur 
          60111"
            value={clientAddress}
            onChangeText={setClientAddress}
          />
        </View>
        <View style={{flex: 1, marginHorizontal: 20,marginTop:hp(5)}}>
          <ButtonPrimary
            name="Save"
            onPress={() => {
              addNewProjectHandler();
              setLoading(true);
            }}
          />
        </View>
        <Loading isVisible={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 10,
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 30,
    fontFamily: 'Montserrat-Regular',
  },
  picker: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
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
  modalWrapper: {
    backgroundColor: 'rgba(244,244,244,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 0.35,
  },
  detailTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 20,
  },
});
