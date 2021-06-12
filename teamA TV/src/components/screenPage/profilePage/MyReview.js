import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {AirbnbRating} from 'react-native-ratings';
import {Rating} from 'react-native-rating-element';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getMovieDetails} from '../../../redux/action/moviesAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  editMyReview,
  getAllReviews,
  getMyReview,
  removeMyReview,
} from '../../../redux/action/reviewAction';

export default function MyReview({navigation}) {
  const {myReview} = useSelector(state => state.reviewReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const [rating, setRating] = useState(3);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  console.log('asd',myReview)
  useEffect(() => {
    dispatch(getMyReview())
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myReview}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.modal}>
                <Modal isVisible={isModalVisible}>
                  <View style={styles.containerModal}>
                    <View style={styles.closeBtn}>
                      <TouchableOpacity onPress={toggleModal}>
                        <Icon name="close-circle" size={40} color="coral" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.titleEdit}>Edit My Review</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={rating}
                      size={24}
                      selectedColor="gold"
                      unSelectedColor="#d4d4d4"
                      showRating={false}
                      onFinishRating={setRating}
                    />
                    <TextInput
                      placeholder={item.title}
                      placeholderTextColor="#aaa"
                      value={title}
                      onChangeText={setTitle}
                      style={styles.titleInput}
                    />
                    <TextInput
                      value={review}
                      onChangeText={setReview}
                      placeholder={item.review}
                      placeholderTextColor="#aaa"
                      multiline
                      style={styles.textInput}
                    />
                    <TouchableOpacity
                      style={styles.btnEdit}
                      onPress={async () => {
                        dispatch(
                        await editMyReview(
                            item.movie_id.id,
                            item._id,
                            title,
                            rating,
                            review,
                          ),
                        );
                        await dispatch(getMyReview());
                        setRating(3);
                        setTitle('');
                        setReview('');
                        setModalVisible(!isModalVisible);
                      }}>
                      <Text style={styles.textEdit}>Submit Edit</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <View>
                <ImageBackground
                  style={styles.background}
                  source={{uri: item.movie_id.backdrop}}>
                  <View style={styles.imgBg}>
                    <TouchableOpacity
                      onPress={async () => {
                        await dispatch(getMovieDetails(item.movie_id.id));
                        await dispatch(getAllReviews(item.movie_id.id));
                        navigation.navigate('DetailScreen');
                      }}>
                      <Image
                        style={styles.poster}
                        source={{uri: item.movie_id.poster}}
                      />
                    </TouchableOpacity>
                    <View style={styles.isiReview}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        <View style={{flex: 1}}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 4,
                            flex: 0.35,
                          }}>
                          <TouchableOpacity
                            style={{marginRight: 4}}
                            onPress={toggleModal}>
                            <Icon
                              name="circle-edit-outline"
                              color="white"
                              size={30}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(removeMyReview(item._id));
                              dispatch(getMyReview(item));
                            }}>
                            <Icon
                              name="delete-circle"
                              color="white"
                              size={30}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Rating
                        rated={item.rating}
                        totalCount={5}
                        ratingColor="gold"
                        ratingBackgroundColor="#d4d4d4"
                        size={20}
                        readonly 
                        icon="ios-star"
                        direction="row"
                      />
                      <ScrollView>
                        <Text style={styles.review}>{item.review}</Text>
                      </ScrollView>
                    </View>
                  </View>
                </ImageBackground>
              </View>
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
  },
  background: {
    width: '100%',
    height: 160,
    marginBottom: 10,
  },
  imgBg: {
    backgroundColor: 'rgba(111,111,111,0.7)',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
  },
  poster: {
    height: '100%',
    width: 110,
  },
  isiReview: {
    marginLeft: 10,
    width: 250,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  review: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'justify',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewWrap: {
    backgroundColor: 'blue',
    justifyContent: 'flex-end',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    width: 330,
    fontSize: 14,
    marginBottom: 10,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    width: 330,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 6,
    textAlign: 'justify',
  },
  titleEdit: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FE024E',
    marginBottom: 30,
  },
  btnEdit: {
    backgroundColor: '#FE024E',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  textEdit: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
