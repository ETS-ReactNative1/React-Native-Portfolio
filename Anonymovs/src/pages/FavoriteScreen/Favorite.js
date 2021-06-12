import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../assets/config/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  actionDetail,
  actionReview,
  actionVideoDetail,
  removeFavorite,
} from '../../redux/action/actions';

export default function Favorite({navigation}) {
  const {favorites} = useSelector(state => state.allReducers);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            console.log('it', item);
            return (
              <ImageBackground
                style={styles.imgBg}
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
                }}>
                <View style={styles.detailFavs}>
                  <Image
                    style={styles.poster}
                    source={{
                      uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                    }}
                  />
                  <View style={styles.descFavs}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.title}>{item.title}</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="star" color="gold" size={wp(5)} />
                        <Text style={styles.vote}>{item.vote_average}</Text>
                      </View>
                    </View>
                    <Text style={styles.overview}>
                      {item.overview.slice(0, 100)}
                      <Text
                        style={styles.overview}
                        onPress={() => {
                          dispatch(actionDetail(item.id));
                          dispatch(actionVideoDetail(item.id));
                          dispatch(actionReview(item.id));
                          navigation.navigate('Detail');
                        }}>
                        ... See More Detail
                      </Text>
                    </Text>
                    <View style={styles.delete}>
                      <Icon
                        onPress={() => dispatch(removeFavorite(item))}
                        name="delete-outline"
                        size={wp(6)}
                        color={Colors.error}
                      />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imgBg: {
    width: wp(100),
    height: hp(22),
    marginVertical: hp(1),
  },
  detailFavs: {
    backgroundColor: 'rgba(1,1,1,0.6)',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    alignItems: 'center',
  },
  poster: {
    width: wp(24),
    height: hp(20),
    resizeMode: 'contain',
  },
  descFavs: {
    flexGrow: 1,
    height: '100%',
    width: '75%',
    padding: Platform.OS === 'android' ? wp(1) : wp(3),
    paddingRight: wp(2),
  },
  title: {
    color: Colors.white,
    fontSize: wp(4),
  },
  vote: {
    color: Colors.white,
    marginLeft: wp(1),
  },
  overview: {
    color: Colors.vogue,
    marginTop:hp(1)
  },
  delete: {
    flex: 1,
    marginRight: wp(1),
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
});
