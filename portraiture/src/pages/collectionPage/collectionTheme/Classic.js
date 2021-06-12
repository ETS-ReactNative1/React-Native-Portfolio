import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {actionGetOneCollection, fetchRequestProfileData} from '../../../redux/actions/action';
import colors from '../../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AutoHeightImage from 'react-native-auto-height-image';
import ButtonPrimary from '../../../components/reusable/ButtonPrimary';

export default function Classic(props) {
  const {oneCollection} = useSelector(state => state.collectionReducer);
  const {profile} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [img, setImg] = useState([]);
  const item = props.route.params.item;

  useEffect(() => {
    dispatch(fetchRequestProfileData());
  }, []);

  const imgPath = 'https://portraiture.gabatch11.my.id';
  const imgShow = item.collectionImages;

  useEffect(() => {
    var imgFilter = [];
    for (let i = 0; i < imgShow.length; i++) {
      if (i % 2) {
        imgFilter.push(imgShow[i]);
        setImg(imgFilter);
      }
    }
  }, []);

  console.log('oc',oneCollection);

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <ImageBackground resizeMode='cover' source={{uri: item.cover}} style={styles.coverBg}>
        <View style={styles.bgWraper}>
          <View style={styles.borderBg}>
            <View style={styles.bgContainer}>
              <Image
                source={{uri: imgPath + profile.photo}}
                style={styles.logo}
              />
              <Text style={styles.regFont}>{profile.businessName}</Text>
            </View>
            <View style={styles.bgContainer}>
              <Text style={styles.boldFont}>{item.title}</Text>
              <Text style={styles.regFont}>{item.date.slice(0, 10)}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.boldFontContent}>{item.title}</Text>
        <Text style={styles.regFontContent}>{item.description}</Text>
        {oneCollection.downloadOption == true ? (
        <TouchableOpacity
          onPress={() => Linking.openURL('http://portraiture.gabatch11.my.id/collectionImages/download/'+item.id+'/original')}
          style={{flexDirection: 'row', marginVertical: 30}}>
          <Icon name="download" size={20} color={colors.primary} />
          <Text
            style={{fontFamily: 'Montserrat-Regular', color: colors.primary}}>
            Download
          </Text>
        </TouchableOpacity>
        ) : null}
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
          dispatch(actionGetOneCollection(oneCollection.id));
          props.navigation.goBack()}
          } />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  coverBg: {
    height: 570,
  },
  bgWraper: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  borderBg: {
    borderWidth: 5,
    borderColor: 'white',
    flex: 1,
    marginHorizontal: 33,
    marginTop: 70,
    marginBottom: 30,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  regFont: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
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
  bgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    flex: 1,
  },
});
