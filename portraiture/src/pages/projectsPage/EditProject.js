import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import colors from '../../../assets/config/colors';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {fetchRequestProjectItems} from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextinputPrimary from '../../components/reusable/TextinputPrimary';
import Loading from '../../components/reusable/Loading';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProject(props) {
  const projectData = props.route.params.projectId;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(projectData.title);
  const [description, setDescription] = useState(projectData.description);
  const [clientName, setClientName] = useState(projectData.clientName);
  const [clientAddress, setClientAddress] = useState(projectData.clientAddress);
  const [date, setDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const dispatch = useDispatch();

  const projectComplete = isPaid == true ? '1' : '0';

  const isPaidHandle = () => {
    setIsPaid(!isPaid);
  };

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const editProjectHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var qs = require('qs');
    var data = qs.stringify({
      id_user: projectData.id_user,
      title: title,
      date: formattedDate,
      description: description,
      clientName: clientName,
      clientAddress: clientAddress,
      isCompleted: projectComplete,
    });
    var config = {
      method: 'put',
      url: 'https://portraiture.gabatch11.my.id/project?id=' + projectData.id,
      headers: {Authorization: `bearer ${token}`},
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(fetchRequestProjectItems());
        setTimeout(() => {
          props.navigation.navigate('ProjectScreen');
        }, 600);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.detailTitle}>Project Details</Text>
      <TextinputPrimary
        title="Project Title*"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.titleDate}>Date*</Text>
      <TouchableOpacity style={styles.dateInput} onPress={toggleModal}>
        <Text style={{fontFamily: 'Montserrat-Regular'}}>{formattedDate}</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalWrapper}>
          <DatePicker mode="date" date={date} onDateChange={setDate} />
          <ButtonPrimary name="Confirm" onPress={toggleModal} />
        </View>
      </Modal>
      <TextinputPrimary
        title="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={{marginTop: 20}}>
        <Text style={styles.detailTitle}>Client Details</Text>
        <TextinputPrimary
          title="Client Name*"
          value={clientName}
          onChangeText={setClientName}
        />
        <TextinputPrimary
          multiline
          title="Client Address*"
          value={clientAddress}
          onChangeText={setClientAddress}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Icon
          onPress={isPaidHandle}
          name={isPaid ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={30}
        />
        <Text style={{fontFamily: 'Montserrat-Regular', marginLeft: 10}}>
          Is Project Complete ?
        </Text>
      </View>
      <ButtonPrimary
        onPress={() => {
          setLoading(true);
          editProjectHandler();
        }}
        name="Save"
      />
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  dateInput: {
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
  titleDate: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    marginTop: 20,
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
