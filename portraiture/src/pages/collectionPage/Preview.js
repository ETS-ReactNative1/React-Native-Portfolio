import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import colors from '../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { collectionDetailsAction } from '../../redux/actions/action';

export default function Preview(props) {
  // const mock = useSelector(state => state.collectionReducer);

  const dispatch = useDispatch();

  const a1 = props.route.params.props[0];
  const a2 = props.route.params.props[1];
  const a3 = props.route.params.props[2];
  const a4 = props.route.params.props[3];
  const a5 = props.route.params.props[4];
  const a6 = props.route.params.props[5];

  const addCollection = [a1, a2, a3, a4, a5, a6];

  // const passingData = async() =>{
  //    dispatch(collectionDetailsAction(addCollection))
  //   await props.navigation.navigate('CollectionScreen')
  // }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.cover}
        source={require('../../img/cover1.png')}>
        <SafeAreaView style={styles.coverText}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.backBtn}>
            <Icon name="chevron-left" size={40} color="white" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 28,
                color: 'white',
                fontFamily: 'Montserrat-Bold',
              }}>
              You & Me
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Regular',
                textAlign: 'center',
              }}>
              21 February 2021
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.containerContent}>
        <View style={styles.titleDownload}>
          <View>
            <Text style={{fontFamily: 'Montserrat-Bold'}}>You & Me</Text>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              Justin Studio
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="download" size={23} />
            <Text style={{fontFamily: 'Montserrat-Regular', marginLeft: 10}}>
              Download
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../img/cover4.png')}
            style={styles.imagePreview}
          />
          <Image
            source={require('../../img/cover2.png')}
            style={styles.imagePreview}
          />
          <Image
            source={require('../../img/cover3.png')}
            style={styles.imagePreview}
          />
          <View style={styles.btnNext}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CollectionScreen',{collScreen:addCollection})}
              style={styles.next}>
              <Text style={styles.nextTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
  },
  containerContent: {
    padding: 20,
    flex: 1,
  },
  titleDownload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    marginBottom: 20,
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
  btnNext: {},
});
