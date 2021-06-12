import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../assets/config/Colors';
import * as Animatable from 'react-native-animatable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  actionDetail,
  actionGetAllMovies,
  actionReview,
  actionTopRated,
  actionUpcoming,
  actionVideoDetail,
} from '../../redux/action/actions';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const {movies} = useSelector(state => state.allReducers);
  const [selectCategory, setSelectCategory] = useState('1');
  useEffect(() => {
    dispatch(actionGetAllMovies());
  }, []);

  const categoryHandler = id => {
    setSelectCategory(id);
  };

  const category = [
    {id: '1', name: 'Now Playing'},
    {id: '2', name: 'Top Rated'},
    {id: '3', name: 'Upcoming'},
  ];

  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
  const dotPosition = Animated.divide(newSeasonScrollX, wp(100));
  return (
    <View style={styles.container}>
      <Animatable.View animation="bounceInRight" style={styles.imageContainer}>
        <Animated.FlatList
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={wp(100)}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate={0}
          contentContainerStyle={{marginTop: hp(2)}}
          data={movies}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: newSeasonScrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  dispatch(actionDetail(item.id));
                  dispatch(actionVideoDetail(item.id));
                  dispatch(actionReview(item.id));
                  navigation.navigate('Detail');
                }}>
                <View style={styles.imageThumbnail}>
                  <ImageBackground
                    style={styles.img}
                    source={{
                      uri:
                        'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
                    }}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      colors={['transparent', Colors.background]}
                      style={{
                        width: '100%',
                        height: hp(55),
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <View style={styles.movieTitle}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="star" color="gold" size={20} />
                          <Text style={{color: Colors.white, marginLeft: 2}}>
                            {item.vote_average}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </Animatable.View>
      <Animatable.View animation="bounceInRight" style={styles.detailContainer}>
        <View style={styles.dotWraper}>
          {movies.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotWidth = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [6, 20, 6],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [Colors.unactive, Colors.active, Colors.unactive],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                opacity={opacity}
                key={`dot-${index}`}
                style={{
                  borderRadius: 10,
                  marginHorizontal: 3,
                  width: dotWidth,
                  height: 6,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
        <View style={styles.categoryItems}>
          {category.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  categoryHandler(item.id);
                  if (item.id === '1') {
                    dispatch(actionGetAllMovies());
                  } else if (item.id === '2') {
                    dispatch(actionTopRated());
                  } else {
                    dispatch(actionUpcoming());
                  }
                }}
                key={item.id}
                style={styles.itemWrap}>
                <Text
                  style={
                    selectCategory == item.id
                      ? styles.itemActive
                      : styles.itemUnactive
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animatable.View>
      <View style={styles.posterWraper}>
        <FlatList
          data={movies}
          key={item => item.id}
          horizontal
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(actionDetail(item.id));
                  dispatch(actionVideoDetail(item.id));
                  dispatch(actionReview(item.id));
                  navigation.navigate('Detail');
                }}>
                <Image
                  style={styles.imgPoster}
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    flex: 2,
  },
  imageThumbnail: {
    backgroundColor: Colors.background,
    marginTop: -hp(2),
  },
  img: {
    width: wp(100),
    resizeMode: 'cover',
  },
  movieTitle: {
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: hp(5),
  },
  titleText: {
    color: Colors.white,
    fontSize: wp(6),
    textAlign: 'center',
  },
  detailContainer: {},
  dotWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp(3),
  },
  itemActive: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  itemUnactive: {
    color: Colors.ash,
    fontWeight: '500',
  },
  posterWraper: {
    justifyContent: 'center',
    flex: 1,
  },
  imgPoster: {
    width: wp(32),
    height: hp(24),
    borderRadius: 6,
    marginRight: wp(2),
  },
});
