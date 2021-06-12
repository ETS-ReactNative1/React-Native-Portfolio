import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getMovieDetails,
} from '../../../redux/action/moviesAction';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import { getAllReviews } from '../../../redux/action/reviewAction';

export default function SearchScreen({navigation}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitSearch = () => {
    setError('');
    setLoading(true);
    axios
      .get(
        'https://team-a.gabatch11.my.id/movie/search?page=1&limit=50&title=' +
          search,
      )
      .then(res => {
        let searchResult = res.data.data.docs;
        setData(searchResult);
      })
      .catch(() => setError('err'))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.search}>
          <Icon name="magnify" size={30} color="#aaa" />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search Movie"
            value={search}
            autoCapitalize="none"
            onChangeText={response => {
              setSearch(response);
            }}
            onSubmitEditing={() => submitSearch()}
            placeholderTextColor="#aaa"
            autoFocus
          />
        </View>
        <Text onPress={() => navigation.goBack()} style={styles.cancel}>
          Cancel
        </Text>
      </SafeAreaView>
      <View style={styles.content}>
        {data.length <= 4 ? (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item}) => {
              console.log('items', item);
              return (
                <View style={styles.fewData}>
                  <TouchableOpacity
                    onPress={async () => {
                      await dispatch(getAllReviews(item.id));
                      await dispatch(getMovieDetails(item.id));
                      navigation.navigate('DetailScreen');
                    }}>
                    <ImageBackground
                      source={{uri: item.poster}}
                      style={styles.posterFew}>
                      <View style={styles.star}>
                        <Icon name="star" size={32} color="gold" />
                        <Text style={styles.rating}>{item.avg_rating.toString().slice(0,4)}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : error == 'err' ? (
          <Text>Movie Not Found</Text>
        ) : loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={data}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getMovieDetails(item.id));
                    dispatch(getAll)
                    navigation.navigate('DetailScreen');
                  }}>
                    <ImageBackground source={{uri: item.poster}} style={styles.poster}>
                    <View style={styles.star}>
                        <Icon name="star" size={24} color="gold" />
                        <Text style={styles.ratingSmall}>{item.avg_rating.toString().slice(0,4)}</Text>
                      </View>
                    </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  search: {
    flexDirection: 'row',
    width: 300,
    borderRadius: 10,
    padding: 4,
    backgroundColor: '#ddd',
  },
  searchTextInput: {
    marginLeft: 4,
    width: '87%',
  },
  cancel: {
    fontSize: 16,
    marginRight: 7,
    fontWeight: '500',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  poster: {
    width: 114,
    height: 164,
    marginHorizontal: 5,
    marginVertical: 7,
    backgroundColor: 'grey',
    borderRadius: 4,
  },
  posterFew: {
    width: 170,
    height: 264,
    marginHorizontal: 7,
    marginVertical: 7,
    backgroundColor: 'grey',
    borderRadius: 4,
  },
  star:{
    flexDirection:'row',
    alignItems:'center',
    padding:2
  },
  rating:{
    color:'white',
    fontWeight:'600',
    fontSize:16
  },
  ratingSmall:{
    color:'white',
    fontWeight:'700'
  }
});
