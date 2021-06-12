import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  StatusBar,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {actionGetAllCollection, fetchRequestProfileData} from '../../../redux/actions/action';
import colors from '../../../../assets/config/colors';
import AutoHeightImage from 'react-native-auto-height-image';
import ButtonPrimary from '../../../components/reusable/ButtonPrimary';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DarkMode(props) {
  const {oneCollection} = useSelector(state => state.collectionReducer);
  const {profile} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [img, setImg] = useState([]);
  const item = props.route.params.item;
  const imgShow = item.collectionImages;
console.log('id',oneCollection);
  const imgPath = 'https://portraiture.gabatch11.my.id';

  useEffect(() => {
    dispatch(fetchRequestProfileData());
  }, []);

  useEffect(() => {
    var imgFilter = [];
    for (let i = 0; i < imgShow.length; i++) {
      if (i % 2) {
        imgFilter.push(imgShow[i]);
        setImg(imgFilter);
      }
    }
  }, []);

  console.log('dark', img);
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        blurRadius={5}
        style={styles.imgBg}
        source={{uri: item.cover}}>
        <SafeAreaView style={styles.bgImg}>
          <Image source={{uri: imgPath + profile.photo}} style={styles.logo} />
          <Text style={styles.regFont}>{profile.businessName}</Text>
        </SafeAreaView>
      </ImageBackground>
      <View style={{top: -120, marginBottom: -120}}>
        <View style={styles.shadowCover}>
          <Image source={{uri: item.cover}} style={styles.coverImg} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.boldFont}>{item.title}</Text>
        <Text style={styles.regFont}>{item.date.slice(0, 10)}</Text>
        <Text style={styles.descFont}>{item.description}</Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'http://portraiture.gabatch11.my.id/collectionImages/download/' +
                item.id +
                '/original',
            )
          }
          style={{flexDirection: 'row', marginBottom: 30}}>
          <Icon name="download" size={20} color={colors.secondary} />
          <Text
            style={{fontFamily: 'Montserrat-Regular', color: colors.secondary}}>
            Download
          </Text>
        </TouchableOpacity>
        {img.map(e => {
          return (
            <View key={e.id} style={{alignItems: 'center', marginBottom: 20}}>
              <AutoHeightImage
                width={370}
                style={styles.autoHeigh}
                source={{uri: e.image}}
              />
            </View>
          );
        })}
        <ButtonPrimary name="Back" onPress={() => {
          dispatch(actionGetAllCollection(item.id));
          props.navigation.goBack()}
          } />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gun,
  },
  imgBg: {
    height: 255,
  },
  bgImg: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 5,
  },
  regFont: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
  },
  descFont: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    marginVertical: 20,
  },
  regFontContent: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
  },
  boldFontContent: {
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  boldFont: {
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
    fontSize: 20,
  },
  coverImg: {
    width: '90%',
    height: 250,
  },
  shadowCover: {
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 20,
    alignItems: 'center',
  },
  content: {
    padding: 20,
    marginTop: 20,
  },
});
