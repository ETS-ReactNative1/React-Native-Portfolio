import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/config/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchRequestPackageItems,
  fetchRequestProjectItems,
  fetchSelectedPackage,
} from '../../redux/actions/action';
import Loading from '../../components/reusable/Loading';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectPackage(props) {
  console.log(props.route.params.select.package)
  const [loading, setLoading] = useState(false);
  const {packageItems} = useSelector(state => state.packageReducer);
  const dispatch = useDispatch();
  const [selectResult, setSelectResult] = useState(null);
  console.log('pi', packageItems)
  const selectedPackageHandler = item => {
    setSelectResult(item);
  };

  useEffect(() => {
    dispatch(fetchRequestPackageItems());
  }, []);

  const saveSelectHandler = () => {
    if (selectResult === null) {
      alert('Pick one to save');
    } else {
      setLoading(true);
      dispatch(fetchRequestProjectItems());
      dispatch(fetchSelectedPackage(selectResult.id));
      setTimeout(() => {
        props.navigation.goBack();
      }, 400);
    }
  };

  const editPorjectId = async() => {
    const token = await AsyncStorage.getItem('token');
    var qs = require('qs');
    var data = qs.stringify({
      id_package: selectResult.id,
    });
    var config = {
      method: 'put',
      url: 'https://portraiture.gabatch11.my.id/project/addPackage?id='+props.route.params.select.package.id,
      headers: {AUTHORIZATION: 'Bearer '+token},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Icon
          onPress={() => props.navigation.goBack()}
          name="chevron-left"
          size={40}
        />
        <View style={styles.headInner}>
          <Text style={styles.headTitle}>Select Package</Text>
          <Text style={styles.headDesc}>
            {props.route.params.select.package.title}
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.content}>
        {packageItems.length == 0 ? (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontFamily:'Montserrat-Regular'}}>No Package Available</Text>
          </View>
        ) : (
        <FlatList
          data={packageItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => selectedPackageHandler(item)}
                style={
                  selectResult?.id == item.id
                    ? styles.selectPackageWrapSelected
                    : styles.selectPackageWrap
                }>
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
                      <Icon name="square" size={12} color={colors.secondary} />
                      <Text style={styles.items}>{item.packageItems.length} Items</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        )}
      </View>
      <TouchableOpacity onPress={()=>{
        editPorjectId();
        saveSelectHandler();
        }} style={styles.saveWrapper}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    backgroundColor: colors.wheat,
    height: 48 * 2,
  },
  headInner: {
    marginLeft: 20,
  },
  headTitle: {
    fontFamily: 'Montserrat-Bold',
  },
  headDesc: {
    fontFamily: 'Montserrat-Regular',
  },
  content: {
    flex:1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom:60
  },
  addWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPackageBox: {
    backgroundColor: colors.mint,
    borderColor: colors.primary,
    borderWidth: 2,
    borderStyle: 'dashed',
    paddingHorizontal: 120,
    paddingVertical: 100,
  },
  addPackageText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
  },
  imgList: {
    width: '100%',
    height: 200,
  },
  packageDesc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  descName: {
    fontFamily: 'Montserrat-Bold',
    marginVertical: 5,
  },
  items: {
    marginLeft: 5,
    fontFamily: 'Montserrat-Regular',
  },
  selectPackageWrap: {
    marginHorizontal: 30,
    marginBottom: 10,
  },
  selectPackageWrapSelected: {
    marginHorizontal: 30,
    borderColor: colors.secondary,
    borderWidth: 3,
    marginBottom: 10,
  },
  saveWrapper: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '90%',
    marginHorizontal: 20,
    height: 50,
  },
  saveText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
  },
});
