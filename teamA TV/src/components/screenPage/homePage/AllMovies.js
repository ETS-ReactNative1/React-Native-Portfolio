import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAllMovieList,
  getAllMovies,
  getMovieDetails,
} from '../../../redux/action/moviesAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoadingScreen from '../../navigator/LoadingScreen';
import HeaderHome from '../homePage/HeaderHome';
import {getAllReviews} from '../../../redux/action/reviewAction';

export default function AllMovies({navigation}) {
  const {movies} = useSelector(state => state.moviesReducer);
  const {genreTitle} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllMovieList());
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <HeaderHome navigation={navigation} />
      </SafeAreaView>
      <View style={styles.content}>
        <View style={styles.titleName}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={34}
            color="#8C8989"
          />
          <Text style={styles.textTitle}>{genreTitle} Movies</Text>
        </View>
        <FlatList
          data={movies}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(getMovieDetails(item.id));
                  dispatch(getAllReviews(item.id));
                  navigation.navigate('DetailScreen');
                }}
                style={styles.item}>
                <ImageBackground
                  source={{uri: item.poster}}
                  style={styles.poster}>
                  <View style={styles.star}>
                    <Icon name="star" size={24} color="gold" />
                    <Text style={styles.ratingSmall}>{item.avg_rating.toString().slice(0,4)}</Text>
                  </View>
                </ImageBackground>
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
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: 114,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  poster: {
    width: 114,
    height: 164,
    backgroundColor: '#ccc',
  },
  titleName: {
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'grey',
  },
  star:{
    flexDirection:'row',
    alignItems:'center',
    padding:2
  },
  ratingSmall:{
    color:'white',
    fontWeight:'700'
  }
});
