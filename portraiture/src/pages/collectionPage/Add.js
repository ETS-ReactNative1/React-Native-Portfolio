import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import colors from '../../../assets/config/colors';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/reusable/Loading';
import {collectionDetailsAction} from '../../redux/actions/action';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

export default function AddNewCollection(props) {
  const {profile} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [gallery, setGallery] = useState(true);
  const [download, setDownload] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
console.log(gallery,download);
  const toggleSwitchGallery = () => setGallery(previousState => !previousState);
  const toggleSwitchDownload = () =>
    setDownload(previousState => !previousState);

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
    date.getFullYear() + '/' + months[date.getMonth()] + '/' + days[date.getDate()-1];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addCollection = [title, description, formattedDate, profile.id, gallery, download];

  const collectionAddHandler = async() => {
    dispatch(collectionDetailsAction(addCollection)); 
    setLoading(false);
    await navigation.navigate('Photos');
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <View>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Mullet & Stella"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.title}>Date</Text>
        <TouchableOpacity style={styles.textInput} onPress={toggleModal}>
          <Text style={{fontFamily: 'Montserrat-Regular'}}>
            {formattedDate}
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Description</Text>
        <TextInput
          multiline
          style={styles.textInput}
          placeholder="Type collection description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View>
        <Text onPress={() => setShow(!show)} style={styles.advance}>
          Advance Options
        </Text>
        <View style={{flex: 1}}>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalWrapper}>
              <DatePicker mode="date" date={date} onDateChange={setDate} />
              <TouchableOpacity
                style={styles.confirmDate}
                onPress={toggleModal}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      {show ? (
        <View>
          <View style={styles.switch}>
            <Switch
              trackColor={{false: '#E0E0E0', true: '#0E203D'}}
              thumbColor={gallery ? 'white' : '#E0E0E0'}
              ios_backgroundColor="#E0E0E0"
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
              value={gallery}
              onValueChange={toggleSwitchGallery}
            />
            <View style={{marginLeft: 14, flex: 1}}>
              <Text
                style={{
                  fontSize: 15,
                  marginVertical: 5,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Show on Gallery
              </Text>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>
                This collection available on your main page.
              </Text>
            </View>
          </View>
          <View style={styles.switch}>
            <Switch
              trackColor={{false: '#E0E0E0', true: '#0E203D'}}
              thumbColor={download ? 'white' : '#E0E0E0'}
              ios_backgroundColor="#E0E0E0"
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
              value={download}
              onValueChange={toggleSwitchDownload}
            />
            <View style={{marginLeft: 14, flex: 1}}>
              <Text
                style={{
                  fontSize: 15,
                  marginVertical: 5,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Download Option
              </Text>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>
                Turn on to allow your client to download photos from this
                collection.
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              color: 'grey',
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
            }}>
            You can adjust later on privacy and download settings
          </Text>
        </View>
      ) : null}
      <View style={styles.btnNext}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Theme',{addC:addCollection})
          }}
          style={styles.next}>
          <Text style={styles.nextTxt}>Next</Text>
        </TouchableOpacity>
      </View>
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
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
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  advance: {
    color: colors.secondary,
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },
  switch: {
    flexDirection: 'row',
    marginVertical: 20,
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
  btnNext: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    marginHorizontal: 20,
  },
});
