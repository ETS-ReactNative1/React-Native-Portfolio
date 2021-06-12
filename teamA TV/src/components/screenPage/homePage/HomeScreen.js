import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import HeaderHome from './HeaderHome';
import SliderScreen from './SliderScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from '../../navigator/LoadingScreen';
import {useSelector, useDispatch} from 'react-redux';

import {
  getAllMovies,
  getMovieByGenre,
  getMovieDetails,
} from '../../../redux/action/moviesAction';
import {getGenres, getTitleMovies} from '../../../redux/action/genresAction';
import {getAllReviews} from '../../../redux/action/reviewAction';

export default function HomeScreen({navigation}) {
  const {movies} = useSelector(state => state.moviesReducer);
  const {genres} = useSelector(state => state.moviesReducer);
  const {genreTitle} = useSelector(state => state.moviesReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getGenres());
    setLoading(false);
  }, []);

  const exists = item => {
    if (genreTitle === item.genre) {
      return true;
    }
    else {
      return false;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <HeaderHome navigation={navigation} />
      </SafeAreaView>
      <SliderScreen />
      <View style={styles.content}>
        <View style={styles.bestGenre}>
          <Text style={styles.titleHome}>Browse by Genre</Text>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              data={genres}
              horizontal={true}
              keyExtractor={item => item._id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.flatList}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(getMovieByGenre(item.genre));
                        dispatch(getTitleMovies(item.genre));
                      }}
                      style={
                        exists(item) ? styles.genreList : styles.genreListNone 
                      }>
                      <Text style={styles.genreName}>{item.genre}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.moviesContainer}>
          <View style={styles.seeAll}>
            <Text style={styles.titleHomeMovies}>Top {genreTitle} Movies</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AllMovies')}>
                <Icon name="chevron-right" size={34} color="#8C8989" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.movieDetail}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                data={movies}
                keyExtractor={item => item.id}
                horizontal={false}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <View style={styles.itemBox}>
                      <TouchableOpacity
                        onPress={ async () => {
                          await dispatch(getMovieDetails(item.id));
                          await dispatch(getAllReviews(item.id));
                          navigation.navigate('DetailScreen');
                        }}
                        style={styles.listContainer}>
                        <ImageBackground
                          style={styles.movieImg}
                          source={{
                            uri: item.poster,
                          }}>
                          <View style={styles.star}>
                            <Icon name="star" size={20} color="gold" />
                            <Text style={styles.vote_average}>
                              {item.avg_rating.toString().slice(0,4)}
                            </Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  titleHome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8C8989',
    marginBottom: 10,
  },
  titleHomeMovies: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8C8989',
    marginBottom: 10,
    marginTop: 10,
  },
  bestGenre: {
    flex: 0.22,
    paddingLeft: 10,
    marginTop: 6,
  },
  genreName: {
    color: 'white',
    fontWeight: '500',
  },
  seeAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allGenre: {
    backgroundColor: '#EB507F',
    marginRight: 5,
    padding: 12,
    borderRadius: 6,
  },
  genreList: {
    backgroundColor: '#EB507F',
    marginRight: 5,
    padding: 12,
    borderRadius: 6,
  },
  genreListNone: {
    backgroundColor: '#aaa',
    marginRight: 5,
    padding: 12,
    borderRadius: 6,
  },
  moviesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  listContainer: {
    alignItems: 'center',
  },
  itemBox: {
    width: 118,
    borderColor: '#aaa',
    borderWidth: 1,
    marginRight: 10,
    paddingTop: 1,
    marginBottom: 10,
  },
  movieImg: {
    width: 114,
    height: 160,
    backgroundColor: '#aaa',
  },
  star: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote_average: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  movieTitle: {
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
    padding: 4,
  },
});
