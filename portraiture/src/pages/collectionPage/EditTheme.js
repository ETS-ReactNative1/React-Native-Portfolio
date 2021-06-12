import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import colors from '../../../assets/config/colors';
import Loading from '../../components/reusable/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { actionGetOneCollection } from '../../redux/actions/action';

export default function EditTheme({navigation}) {
  const dispatch = useDispatch();
  const {oneCollection} = useSelector(state => state.collectionReducer);
  const [pickTheme, setpickTheme] = useState('Classic');
  const [loading, setLoading] = useState(false);

  const themeSelected = [
    {id: '1', theme: 'Classic', img: require('../../img/classic.png')},
    {id: '2', theme: 'Minimalism', img: require('../../img/minimalist.png')},
    {id: '3', theme: 'Darkmode', img: require('../../img/dark.png')},
  ];

  const themeHandler = design => {
    setpickTheme(design);
  };

  const changeThemeHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('title', oneCollection.title);
    data.append('date', oneCollection.date.slice(0, 10));
    data.append('description', oneCollection.description);
    data.append('theme', pickTheme);

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
        navigation.goBack();
        dispatch(actionGetOneCollection(oneCollection.id));
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={themeSelected}
        numColumns={2}
        horizontal={false}
        renderItem={({item}) => {
          console.log(item);
          return (
            <View style={styles.themeContainer}>
              <TouchableOpacity onPress={() => themeHandler(item.theme)}>
                <View
                  style={
                    pickTheme == item.theme ? styles.themePick : styles.theme
                  }>
                  <Image style={styles.themeImg} source={item.img} />
                </View>
              </TouchableOpacity>
              <Text style={styles.themeTitle}>{item.theme}</Text>
            </View>
          );
        }}
      />
      <View style={styles.btnNext}>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            changeThemeHandler();
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  themeContainer: {
    marginHorizontal: 13,
    marginVertical: 10,
  },
  theme: {
    borderRadius: 10,
    backgroundColor: colors.wheat,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  themePick: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 10,
    backgroundColor: colors.wheat,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  themeImg: {
    width: 102,
    height: 89,
  },

  themeTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
  },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
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
    width: '96%',
    marginHorizontal: 17,
  },
});
