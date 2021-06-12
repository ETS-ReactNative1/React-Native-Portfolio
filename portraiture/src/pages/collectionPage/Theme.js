import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import colors from '../../../assets/config/colors';
import {collectionDetailsAction} from '../../redux/actions/action';

export default function CollectionTheme(props) {
console.log(props);
  const [pickTheme, setpickTheme] = useState('Classic');
  const title = props.route.params.addC[0];
  const description = props.route.params.addC[1]
  const date = props.route.params.addC[2]
  const id_user = props.route.params.addC[3]
  const showGallery = props.route.params.addC[4]
  const downloadOption = props.route.params.addC[5]
console.log('pt',pickTheme);
  const propsData = {title, description, date, id_user, pickTheme,showGallery,downloadOption};

  const themeSelected = [
    {id: '1', theme: 'Classic', img: require('../../img/classic.png')},
    {id: '2', theme: 'Minimalism', img: require('../../img/minimalist.png')},
    {id: '3', theme: 'Darkmode', img: require('../../img/dark.png')},
  ];

  const themeHandler = design => {
    setpickTheme(design);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={themeSelected}
        numColumns={2}
        horizontal={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.themeContainer}>
              <TouchableOpacity onPress={() => themeHandler(item.theme)}>
                <View
                  style={
                    pickTheme == item.theme ? styles.themePick : styles.theme
                  }>
                  <Image style={styles.themeImg} source={item.img} />
                </View>
              </TouchableOpacity>
              <Text style={styles.themeTitle}>{item.theme}</Text>
            </View>
          );
        }}
      />
      <View style={styles.btnNext}>
        <TouchableOpacity
          onPress={() => {
            if (pickTheme === null) {
              alert('No Theme Selected');
            } else {
              props.navigation.navigate('Photos',{add:propsData});
            }
          }}
          style={styles.next}>
          <Text style={styles.nextTxt}>Photo Collection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  themeContainer: {
    marginHorizontal: 13,
    marginVertical: 10,
  },
  theme: {
    borderRadius: 10,
    backgroundColor: colors.wheat,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  themePick: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 10,
    backgroundColor: colors.wheat,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  themeImg: {
    width: 102,
    height: 89,
  },

  themeTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
  },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  nextTxt: {
    color: 'white',
    padding: 14,
    fontFamily: 'Montserrat-Bold',
  },
  btnNext: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    width: '96%',
    marginHorizontal: 17,
  },
});
