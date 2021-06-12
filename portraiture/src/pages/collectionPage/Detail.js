import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  actionGetAllCollection,
  actionGetOneCollection,
} from '../../redux/actions/action';
import Loading from '../../components/reusable/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function CollectionDetail(props) {
  const {oneCollection} = useSelector(state => state.collectionReducer);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const item = props.route.params.item;

  const delCollection = async () => {
    const token = await AsyncStorage.getItem('token');
    var config = {
      method: 'delete',
      url:
        'https://portraiture.gabatch11.my.id/collection/delete?id_collection=' +
        oneCollection.id,
      headers: {Authorization: `bearer ${token}`},
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        props.navigation.goBack();
        dispatch(actionGetAllCollection());
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.cover}
        source={{uri: oneCollection?.cover}}>
        <SafeAreaView style={styles.coverText}>
          {/* {isLoading ? (
            <View style={styles.success}>
              <Text style={styles.successText}>
                Collection succesfully created
              </Text>
            </View>
          ) : null} */}
          <TouchableOpacity
            onPress={() => {
              dispatch(actionGetAllCollection());
              props.navigation.goBack();
            }}
            style={styles.backBtn}>
            <Icon name="chevron-left" size={40} color="white" />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 28,
                color: 'white',
                fontFamily: 'Montserrat-Bold',
              }}>
              {oneCollection?.title}
            </Text>
            <Text style={{color: 'white', fontFamily: 'Montserrat-Regular'}}>
              {oneCollection?.date?.slice(0, 10)}
            </Text>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontFamily: 'Montserrat-Regular',
              }}>
              {oneCollection?.collectionImages?.length / 2} Photos
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={styles.delete}>
            <Icon name="dots-vertical" size={30} color="white" />
          </TouchableOpacity>
          {show ? (
            <View style={styles.deleteWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  delCollection();
                }}
                style={styles.deleteBtn}>
                <Icon name="trash-can-outline" size={20} />
                <Text style={{fontFamily: 'Montserrat-Regular'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.content}>
        <View style={{marginBottom: 20}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 15,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Bold',
              }}>
              {item.title}
            </Text>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              {item.date.slice(0, 10)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              {item.collectionImages.length / 2} Photos
            </Text>
            {/* <Text style={{fontFamily: 'Montserrat-Regular'}}>54 Views</Text> */}
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              {item.totalDownload} Download
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditCollection', {item: item})
            }
            style={styles.items}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              Edit Collection
            </Text>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ChangeTheme')}
            style={styles.items}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Theme</Text>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Privacy')}
            style={styles.items}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Privacy</Text>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Download')}
            style={styles.items}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Download</Text>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewShare}>
          <TouchableOpacity
            onPress={() => {
              if (oneCollection.theme == '1') {
                props.navigation.navigate('Classic', {item: item});
              } else if (oneCollection.theme == '2') {
                props.navigation.navigate('Minimalist', {item: item});
              } else {
                props.navigation.navigate('DarkMode', {item: item});
              }
            }}
            style={styles.view}>
            <Icon name="eye-outline" size={22} />
            <Text style={{marginLeft: 10, fontFamily: 'Montserrat-Regular'}}>
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cover: {
    flex: 0.5,
  },
  coverText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.4)',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top:50
  },
  delete: {
    position: 'absolute',
    right: 0,
    top:50
  },
  deleteWrapper: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    bottom: 90,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  success: {
    backgroundColor: colors.info,
    borderRadius: 14,
    position: 'absolute',
    top: 50,
  },
  successText: {
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: 'Montserrat-Regular',
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F8F8F8',
    padding: 10,
    marginVertical: 6,
    borderRadius: 4,
  },
  viewShare: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.vogue,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  share: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
});
