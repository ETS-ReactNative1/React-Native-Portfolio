import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import colors from '../../../assets/config/colors';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from '../../components/reusable/Loading';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import {actionGetOneCollection} from '../../redux/actions/action';

export default function Download({navigation}) {
  const dispatch = useDispatch();
  const {oneCollection} = useSelector(state => state.collectionReducer);
  const [download, setDownload] = useState(true);
  const [limit, setLimit] = useState(false);
  const [limitTxt, setLimitTxt] = useState('');
  const [loading, setLoading] = useState(false);
  const [limitNum, setLimitNum] = useState()

  useEffect(() => {
    let num = []
    for(let i = 0;i <= 99;i++){
      num.push(i)
      setLimitNum(num.toString())
    }
  }, [])


  const downloadOption = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('title', oneCollection.title);
    data.append('date', oneCollection.date.slice(0,10));
    data.append('description', oneCollection.description);
    data.append('downloadOption',download)

    var config = {
      method: 'put',
      url:
        'https://portraiture.gabatch11.my.id/collection?id_collection=' +
        oneCollection.id,
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(actionGetOneCollection(oneCollection.id));
        navigation.goBack();
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const limitDownload = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('limit', limitTxt);

    var config = {
      method: 'put',
      url: 'https://portraiture.gabatch11.my.id/collection/downloadSetting?id_collection='+oneCollection.id,
      headers: {Authorization: 'bearer ' + token},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        alert('Limit download has been saved');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.listBar}>
        <View style={styles.switch}>
          <Switch
            trackColor={{false: '#E0E0E0', true: '#0E203D'}}
            thumbColor={download ? 'white' : '#E0E0E0'}
            ios_backgroundColor="#E0E0E0"
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            value={download}
            onValueChange={setDownload}
          />
        </View>
        <View style={styles.item}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: colors.primary,
              marginTop: 5,
            }}>
            Download Option
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              marginTop: 10,
            }}>
            Turn on to allow your client to download photos from this collection
          </Text>

        </View>
      </View>
      <View style={styles.limitBar}>
        <View style={{flex: 0.2}}>
          <Switch
            trackColor={{false: '#E0E0E0', true: '#0E203D'}}
            thumbColor={limit ? 'white' : '#E0E0E0'}
            ios_backgroundColor="#E0E0E0"
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            value={limit}
            onValueChange={setLimit}
          />
        </View>
        <View style={styles.limitItem}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: colors.primary,
              marginTop: 5,
            }}>
            Limit Total Collection Download
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              marginTop: 10,
            }}>
            Guess only able to download collection up to the download limit
          </Text>
          {limit === true && (
            <View style={styles.inputEmail}>
              <TextInput
                placeholder="eg. 2"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="numeric"
                value={limitTxt}
                onChangeText={setLimitTxt}
              />
              <TouchableOpacity
                onPress={() => {
                  if(limitNum.includes(limitTxt)){
                    setLoading(true);
                    limitDownload();
                  }else{
                    alert('Limit should be filled / numeric')
                  }
                }}
                style={styles.addEmail}>
                <Text style={styles.textAdd}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ButtonPrimary
        name="Save"
        onPress={() => {
          setLoading(true);
          downloadOption();
        }}
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
  listBar: {
    flexDirection: 'row',
    borderBottomColor: colors.vogue,
    borderBottomWidth: 1,
    paddingBottom: 40,
    marginTop: 20,
  },
  switch: {
    flex: 0.2,
  },
  item: {
    flex: 1,
  },
  imageSize: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  sizeWrapper: {
    backgroundColor: colors.wheat,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  inputEmail: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Regular',
  },
  addEmail: {
    backgroundColor: colors.secondary,
    marginLeft: 10,
  },
  textAdd: {
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emailList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  list: {
    fontFamily: 'Montserrat-Regular',
  },
  limitBar: {
    flexDirection: 'row',
    marginTop: 40,
    flex:5
  },
  limitItem: {
    flex: 1,
  },
});
