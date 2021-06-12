import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Alert,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useSelector, useDispatch} from 'react-redux';
import {Rating} from 'react-native-rating-element';
import {AirbnbRating} from 'react-native-ratings';
import LoadingScreen from '../../navigator/LoadingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addFavorite,
  removeFavorite,
} from '../../../redux/action/favoriteAction';
import {
  getMyReview,
  postMyReview,
} from '../../../redux/action/reviewAction';

export default function DetailScreen({navigation}) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const {moviesDetail} = useSelector(state => state.moviesReducer);
  const {favorites} = useSelector(state => state.favoriteReducer);
  const {dataReview} = useSelector(state => state.reviewReducer);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');

  const myCUstomShare = async () => {
    const shareOptions = {
      message: 'This is a test message',
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(getMyReview());
  }, []);

  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleAddFavorite = movie => {
    addToFavorites(movie);
  };
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  const exists = movie => {
    if (favorites.filter(item => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  let defaultPhoto =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJETLjaeEGteeWMrEWSlfslFi1A0v2TDXoEg&usqp=CAU';

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <View style={styles.goBack}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackBtn}>
          <Icon
            name="chevron-left"
            size={46}
            color="white"
            style={styles.iconGoback}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={moviesDetail}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'black'}}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.content}>
                <ImageBackground
                  resizeMode="cover"
                  style={styles.imageDetail}
                  source={{uri: item.backdrop}}></ImageBackground>
                <View style={styles.details}>
                  <View style={styles.shadowImg}>
                    <Image
                      source={{uri: item.poster}}
                      style={styles.imagePoster}
                    />
                    <View style={styles.icon}>
                      <TouchableOpacity
                        onPress={() =>
                          exists(item)
                            ? handleRemoveFavorite(item)
                            : handleAddFavorite(item)
                        }>
                        <Icon
                          style={styles.iconWatchList}
                          name={exists(item) ? 'bookmark' : 'bookmark-outline'}
                          size={30}
                          color="#FE024E"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={myCUstomShare}>
                        <Icon name="merge" color="#FE024E" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={item.genre}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.genreList}>
                          <Text style={styles.genre}>{item.name}</Text>
                        </View>
                      );
                    }}
                  />
                  <Text style={styles.detailTitle}>{item.title}</Text>
                  <View style={styles.rating}>
                    <Rating
                      rated={item.avg_rating}
                      totalCount={5}
                      ratingColor="gold"
                      ratingBackgroundColor="#d4d4d4"
                      size={24}
                      readonly 
                      icon="ios-star"
                      direction="row"
                    />
                    <Text style={styles.voteCount}>
                      {item.count_review} REVIEWS
                    </Text>
                  </View>
                  <View style={{marginHorizontal: 10}}>
                    {loading ? (
                      <Text>loading</Text>
                    ) : (
                      <YoutubePlayer
                        height={220}
                        play={playing}
                        videoId={item.trailer}
                      />
                    )}
                  </View>
                  <Text style={styles.titleText}>Storyline</Text>
                  <Text style={styles.overview}>{item.synopsis}</Text>
                  <View style={styles.castContainer}>
                    <Text style={styles.titleTextCast}>Cast</Text>
                    <FlatList
                      data={item.characters}
                      horizontal={true}
                      keyExtractor={(item, index) => index.toString()}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => {
                        return (
                          <View>
                            <Image
                              source={{
                                uri:
                                  item.photo.search('defaultPhoto') > 0
                                    ? defaultPhoto
                                    : item.photo,
                              }}
                              style={styles.photoCast}
                            />
                            <Text style={styles.castName}>
                              {item.role_name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <Text style={styles.titleText}>User Reviews</Text>
                  <View style={{marginHorizontal: 10}}>
                    <View style={styles.titleRating}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontWeight: '500', fontSize: 16}}>
                          Title :
                        </Text>
                        <TextInput
                          placeholder="Title"
                          value={title}
                          onChangeText={setTitle}
                          style={styles.titleInput}
                        />
                      </View>
                      <AirbnbRating
                        count={5}
                        defaultRating={rating}
                        size={16}
                        selectedColor="gold"
                        unSelectedColor="#d4d4d4"
                        showRating={false}
                        onFinishRating={setRating}
                      />
                    </View>
                    <TextInput
                      value={review}
                      onChangeText={setReview}
                      placeholder="Review"
                      multiline
                      style={styles.textInput}
                    />
                    <View>
                      <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={async () => {
                          {if(title.length>3 || review.length > 3){
                            await dispatch(postMyReview(item.id,title,rating,review));
                            setTitle('');
                            setRating(3);
                            setReview('');
                          }else{
                            Alert.alert('Input must be more than 3 characters')
                          }
                        }
                        }}>
                        <Text style={styles.textSubmit}>Submit</Text>
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={dataReview}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                        // console.log('itemRev', item);
                        return (
                          <View>
                            <View style={styles.reviewWraper}>
                              <View style={styles.titleWraper}>
                                <Text style={styles.titleReview}>
                                  {item.title}
                                </Text>
                                <Rating
                                  rated={item.rating}
                                  totalCount={5}
                                  ratingColor="gold"
                                  ratingBackgroundColor="#d4d4d4"
                                  size={18}
                                  readonly
                                  icon="ios-star"
                                  direction="row"
                                />
                              </View>
                              <View style={styles.userInfo}>
                                <Text style={styles.reviewer}>
                                  {item.user_id.name}
                                </Text>
                                <Text>{item.updated_at.slice(0, 10)}</Text>
                              </View>
                              <View style={styles.userReview}>
                                <Image
                                  style={styles.imgReviewer}
                                  source={{uri: item.user_id.profile_picture}}
                                />
                                <ScrollView style={styles.reviewContainer}>
                                  <Text style={styles.reviewText}>
                                    {item.review}
                                  </Text>
                                </ScrollView>
                              </View>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginBottom: -60,
  },
  content: {
    flex: 1,
  },
  imageDetail: {
    flex: 1,
    height: 300,
  },
  goBack: {
    borderRadius: 30,
    backgroundColor: 'rgba(1,1,1,0.3)',
    width: 48,
    position: 'absolute',
    marginTop: 50,
    marginLeft: 10,
    zIndex: 10,
  },
  imagePoster: {
    width: 160,
    height: 240,
    borderRadius: 5,
  },
  shadowImg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    flexDirection: 'row',
    top: -180,
    marginLeft: 20,
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    marginBottom: -160,
    padding: 10,
  },
  icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  iconWatchList: {
    marginRight: 20,
  },
  genreList: {
    backgroundColor: 'rgba(111,111,111,0.2)',
    borderRadius: 6,
    marginBottom: 6,
    marginLeft: 10,
  },
  genre: {
    padding: 6,
    fontWeight: '500',
    fontSize: 13,
  },
  details: {
    flex: 1,
    // padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -20,
    backgroundColor: '#f2f2f2',
    paddingBottom: 60,
  },
  detailTitle: {
    fontSize: 30,
    width: 280,
    fontWeight: '700',
    marginBottom: 4,
    marginTop: 10,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    marginVertical: 10,
  },
  titleTextCast: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  titleInput: {
    marginLeft: 10,
    width: 200,
    maxWidth: 200,
    fontSize: 15,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  voteCount: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  overview: {
    textAlign: 'justify',
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  favorite: {
    backgroundColor: 'rgba(244,244,244,0.1)',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
  },
  castContainer: {
    paddingVertical: 16,
    marginLeft: 10,
  },
  photoCast: {
    width: 90,
    height: 120,
    borderRadius: 4,
    marginRight: 6,
  },
  castName: {
    width: 90,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 70,
    flexDirection: 'row',
    paddingTop: 14,
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  review: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: '#FE024E',
  },
  leaveReview: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: '#EB507F',
  },
  textReview: {
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: '700',
    color: 'white',
  },
  reviewContainer: {
    maxHeight: 100,
    marginTop: 4,
  },
  titleWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewText: {
    textAlign: 'justify',
  },
  reviewer: {
    marginRight: 10,
    fontWeight: '600',
    marginVertical: 4,
  },
  reviewWraper: {
    marginBottom: 14,
    borderRadius: 4,
    borderTopColor: '#aaa',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  titleReview: {
    fontSize: 17,
    fontWeight: '700',
    color: 'grey',
    flex:1
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  textInput: {
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
  imgReviewer: {
    height: 100,
    width: 80,
    marginRight: 6,
    borderRadius: 6,
    borderColor: '#bbb',
    borderWidth: 1,
    marginTop: 5,
  },
  userReview: {
    flexDirection: 'row',
  },
  titleRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitBtn: {
    backgroundColor: '#EB507F',
    width: 80,
    maxWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  textSubmit: {
    padding: 7,
    color: 'white',
    fontWeight: '600',
  },
});
