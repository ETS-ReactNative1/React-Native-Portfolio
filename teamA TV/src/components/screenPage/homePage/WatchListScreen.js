import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Rating} from 'react-native-rating-element';
import {
  removeFavorite,
} from '../../../redux/action/favoriteAction';
import {getMovieDetails} from '../../../redux/action/moviesAction';
import {getProfileWatchlist} from '../../../redux/action/favoriteAction';
import { getAllReviews } from '../../../redux/action/reviewAction';

export default function WatchListScreen({navigation}) {
  const favorites = useSelector(state => state.favoriteReducer.favorites);
  const dispatch = useDispatch();
  console.log('watch', favorites);

  useEffect(() => {
    dispatch(getProfileWatchlist())
  }, [])

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>My Watchlist</Text>
      </SafeAreaView>
      <View style={styles.content}>
        <FlatList
          data={favorites}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item}) => {
            console.log('t', item);
            return (
              <View style={styles.card}>
                <ImageBackground
                  style={styles.imgBg}
                  source={{uri: item.backdrop}}>
                  <View style={styles.favContent}>
                    <View style={styles.left}>
                      <Image
                        style={styles.poster}
                        source={{uri: item.poster}}
                      />
                    </View>
                    <View style={styles.center}>
                      <View>
                        <Text style={styles.titleFav}>{item.title}</Text>
                        <Rating
                          rated={item.avg_rating}
                          totalCount={5}
                          ratingColor="gold"
                          ratingBackgroundColor="#d4d4d4"
                          size={16}
                          readonly 
                          icon="ios-star"
                        />
                      </View>
                      <TouchableOpacity
                        onPress={async() => {
                          await dispatch(getMovieDetails(item.id));
                          await dispatch(getAllReviews(item.id));
                          navigation.navigate('DetailScreen');
                        }}
                        style={styles.detail}>
                        <Text style={styles.detailText}>Go to detail</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.right}>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(removeFavorite(item));
                        }}>
                        <Icon name="delete-circle" size={34} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </View>
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
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 0.06,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 10,
    color:'#FE024E'
  },
  content: {
    flex: 1,
  },
  card: {
    width: '100%',
    height: 160,
    marginTop: 10,
    marginBottom: 4,
  },
  imgBg: {
    flex: 1,
  },
  favContent: {
    backgroundColor: 'rgba(111,111,111,0.6)',
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  poster: {
    width: 100,
    height: 140,
  },
  center: {
    marginLeft: 10,
    flex: 6,
    justifyContent: 'space-between',
  },
  titleFav: {
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
  },
  right: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  detail: {
    borderColor: 'white',
    borderWidth: 2,
    width: 110,
    alignItems: 'center',
    padding: 4,
    borderRadius: 6,
  },
});
