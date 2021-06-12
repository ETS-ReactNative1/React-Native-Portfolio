import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../assets/config/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {actionRatingSubmit, addFavorite, removeFavorite} from '../../redux/action/actions';

export default function Detail({navigation}) {
  const dispatch = useDispatch();
  const {detail, video, review, rating, favorites} = useSelector(
    state => state.allReducers,
  );
  const [playing, setPlaying] = useState(false);
  const [postRating, setPostRating] = useState(5);

  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleAddFavorite = movie => {
    addToFavorites(movie);
  };
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  const exists = movie => {
    if (favorites?.filter(detail => detail.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImageBackground
        style={styles.backdrop}
        source={{
          uri: 'https://image.tmdb.org/t/p/w500' + detail.backdrop_path,
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
          }}></LinearGradient>
        <View style={styles.posterShadow}>
          <Image
            resizeMode="contain"
            style={styles.poster}
            source={{
              uri: 'https://image.tmdb.org/t/p/w500' + detail.poster_path,
            }}
          />
        </View>
      </ImageBackground>
      <View style={styles.details}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{detail.title}</Text>
          <TouchableOpacity
            onPress={() =>
              exists(detail)
                ? handleRemoveFavorite(detail)
                : handleAddFavorite(detail)
            }>
            <Icon name={exists(detail) ? "heart" : "heart-outline"} size={hp(3.5)} color={Colors.active} />
          </TouchableOpacity>
        </View>
        <View style={styles.ratingWrap}>
          <Icon name="star" size={20} color="gold" />
          <Text style={styles.rating}>
            {(detail.vote_average + rating) / 2}
          </Text>
        </View>
        <Text style={styles.detailTxt}>{detail.overview}</Text>
        <View style={styles.video}>
          <YoutubePlayer height={220} play={playing} videoId={video[0]?.key} />
        </View>
        <View style={styles.postRating}>
          <Text style={styles.rateMovieTxt}>Rate this Movie</Text>
          <AirbnbRating
            count={10}
            reviews={[
              'Terrible',
              'Bad',
              'Meh',
              'Not So Bad',
              'So So',
              'Good',
              'Very Good',
              'Wow',
              'Amazing',
              'Unbelievable',
            ]}
            defaultRating={5}
            size={20}
            onFinishRating={setPostRating}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(actionRatingSubmit(postRating));
              alert('Submit Success !');
            }}
            style={styles.submitBtn}>
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View>
          {review.map(item => {
            console.log('itm', item);
            return (
              <View key={item.id}>
                <View style={styles.author}>
                  <Text style={styles.authorName}>{item.author}</Text>
                  <Text style={styles.authorDate}>
                    {item.updated_at?.slice(0, 10)}
                  </Text>
                </View>
                <ScrollView style={styles.contentWrap}>
                  <Text style={styles.authorContent}>{item.content}</Text>
                </ScrollView>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  backdrop: {
    width: wp(100),
    resizeMode: 'cover',
  },
  poster: {
    width: wp(40),
    height: hp(30),
    position: 'absolute',
    bottom: hp(10),
    left: wp(5),
  },
  posterShadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 20,
  },
  details: {
    top: -hp(7),
    marginHorizontal: wp(5),
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    color: Colors.white,
    fontWeight: '600',
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: Colors.white,
    marginLeft: 10,
  },
  detailTxt: {
    color: Colors.ash,
    textAlign: 'justify',
    marginTop: hp(2),
  },
  video: {
    marginVertical: hp(2),
  },
  author: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  authorName: {
    color: Colors.white,
    fontSize: 16,
  },
  authorDate: {
    color: Colors.white,
  },
  authorContent: {
    color: Colors.ash,
  },
  contentWrap: {
    height: hp(20),
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  rateMovieTxt: {
    color: Colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  postRating: {
    marginBottom: hp(3),
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.active,
    borderRadius: wp(2),
    marginTop: hp(2),
  },
  submitBtnDone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ash,
    borderRadius: wp(2),
    marginTop: hp(2),
  },
  submitTxt: {
    color: Colors.white,
    paddingVertical: hp(1),
  },
});
