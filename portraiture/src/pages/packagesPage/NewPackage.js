import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../../../assets/config/colors';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchRequestPackageItems,
  packageItemAction,
} from '../../redux/actions/action';
import Loading from '../../components/reusable/Loading';
import PackageItems from '../../components/reusable/PackagItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

export default function NewPackage({navigation}) {
  const {categoryId} = useSelector(state => state.packageReducer);
  const dispatch = useDispatch();
  console.log('hsl dspt', categoryId);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const defImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2dM2rpp1m8GOXl9CEKJ5KrQEA7-2ihbmRFg&usqp=CAU';

  const [image, setImage] = useState({
    mime: '',
    path: defImage,
    name: '',
  });
  console.log('img', image);
  const [itemName1, setItemName1] = useState('');
  const [price1, setPrice1] = useState();

  const [itemName2, setItemName2] = useState('');
  const [price2, setPrice2] = useState();

  const [itemName3, setItemName3] = useState('');
  const [price3, setPrice3] = useState();

  const [itemName4, setItemName4] = useState('');
  const [price4, setPrice4] = useState();

  const [itemName5, setItemName5] = useState('');
  const [price5, setPrice5] = useState();

  const [packageId, setPackageId] = useState('1');
  console.log('packid', packageId);
  const [selectCategory, setSelectCategory] = useState(true);
  const [loading, setLoading] = useState(false);
  const [addItem, setAddItem] = useState(0);

  const addItemHandler = () => {
    setAddItem(addItem + 1);
  };

  const deleteItemHandler = () => {
    setAddItem(addItem - 1);
  };

  const categoryHandler = () => {
    setSelectCategory(!selectCategory);
  };

  const selectCategoryHandler = id => {
    setPackageId(id);
    categoryHandler();
  };

  const category = [
    {id: '1', name: 'Photo Session'},
    {id: '2', name: 'Videography'},
    {id: '3', name: 'Print'},
    {id: '4', name: 'Digital'},
  ];

  const packageDetailHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('image', {
      uri: Platform.OS === 'android' ? image.path : 'file://' + image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    });

    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/package',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'bearer ' + token,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        navigation.navigate('PackageScreen');
        dispatch(fetchRequestPackageItems());
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const packageItemHandler = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append(
      'itemName',
      addItem == 0
        ? itemName1
        : addItem == 1
        ? itemName2
        : addItem == 2
        ? itemName3
        : addItem == 3
        ? itemName4
        : itemName5,
    );
    data.append(
      'price',
      addItem == 0
        ? price1
        : addItem == 1
        ? price2
        : addItem == 2
        ? price3
        : addItem == 3
        ? price4
        : price5,
    );
    data.append('id_category', addItem == 0 ? packageId : categoryId);
    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/packageItem',
      data: data,
    };
    axios(config)
      .then(function async(response) {
      })
      .catch(function (error) {
        Alert.alert('Item Error', error.message);
      });
  };

  const newPackageHandler = () => {
    packageDetailHandler();
    setTimeout(() => {
      navigation.navigate('PackageScreen');
    }, 400);
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageQuality: 0.5,
    })
      .then(images => {
        console.log(images);
        setImage({
          mime: images.mime,
          path: images.path,
          name: images.filename,
        });
      })
      .catch(e => alert(e));
  };

  return (
    <ScrollView style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>Package Detail</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.titleText}>Name*</Text>
            <TextInput
              placeholder="e.g. Professional Photoshoot Session"
              style={styles.textInput}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.titleText}>Desctiption</Text>
            <TextInput
              placeholder="Type collection description"
              style={styles.textInput}
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.titleText}>Images</Text>
            <TouchableOpacity onPress={choosePhotoFromLibrary}>
              <Image source={{uri: image?.path}} style={styles.imageLogo} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.title}>Package Items</Text>
          <View style={styles.packageItems}>
            <View style={styles.inputWrapper}>
              <Text style={styles.titleText}>Item Name*</Text>
              <TextInput
                placeholder="e.g. 4 x 6 inch print"
                style={styles.textInput}
                value={itemName1}
                onChangeText={setItemName1}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.titleText}>Price*</Text>
              <TextInput
                placeholder="e.g. 1,000,000"
                style={styles.textInput}
                value={price1}
                onChangeText={setPrice1}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.titleText}>Category*</Text>
              <TouchableOpacity
                style={styles.textWrap}
                onPress={categoryHandler}>
                <Text style={styles.textInputCategory}>
                  {packageId === '1'
                    ? 'Photo Session'
                    : packageId === '2'
                    ? 'Videography'
                    : packageId === '3'
                    ? 'Print'
                    : 'Digital'}
                </Text>
              </TouchableOpacity>
              {selectCategory ? null : (
                <View style={styles.categoryWrap}>
                  {category.map(e => {
                    return (
                      <TouchableOpacity
                        key={e.id}
                        onPress={() => selectCategoryHandler(e.id)}
                        style={styles.categoryName}>
                        <Text style={styles.categoryText}>{e.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </View>

        {addItem > 0 && (
          <PackageItems
            onPressDelete={deleteItemHandler}
            valueName={itemName2}
            onChangeTextName={setItemName2}
            valuePrice={price2}
            onChangeTextPrice={setPrice2}
            onPressCategory={selectCategoryHandler}
          />
        )}
        {addItem > 1 && (
          <PackageItems
            onPressDelete={deleteItemHandler}
            valueName={itemName3}
            onChangeTextName={setItemName3}
            valuePrice={price3}
            onChangeTextPrice={setPrice3}
          />
        )}
        {addItem > 2 && (
          <PackageItems
            onPressDelete={deleteItemHandler}
            valueName={itemName4}
            onChangeTextName={setItemName4}
            valuePrice={price4}
            onChangeTextPrice={setPrice4}
          />
        )}
        {addItem > 3 && (
          <PackageItems
            onPressDelete={deleteItemHandler}
            valueName={itemName5}
            onChangeTextName={setItemName5}
            valuePrice={price5}
            onChangeTextPrice={setPrice5}
          />
        )}
        {addItem < 4 ? (
          <TouchableOpacity
            onPress={() => {
              packageItemHandler();
              addItemHandler();
            }}
            style={styles.addItem}>
            <Text style={styles.addText}>+ Add Item</Text>
          </TouchableOpacity>
        ) : null}

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={async () => {
              if (image.mime === '') {
                alert('Choose Image to Save');
              } else {
                setLoading(true);
                packageItemHandler();
                newPackageHandler();
                dispatch(fetchRequestPackageItems());
              }
            }}
            style={styles.save}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading isVisible={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.wheat,
  },
  iconHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  signout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontFamily: 'Montserrat-Regular',
    color: colors.secondary,
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
  },
  inputWrapper: {
    marginVertical: 12,
  },
  imageLogo: {
    width: 140,
    height: 140,
    marginVertical: 10,
    borderColor: colors.ash,
    borderWidth: 1,
  },
  titleText: {
    fontFamily: 'Montserrat-Regular',
  },
  addItem: {
    marginBottom: 50,
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    width: 100,
  },
  addText: {
    textAlign: 'center',
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  save: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveText: {
    color: colors.white,
    padding: 20,
    fontFamily: 'Montserrat-Bold',
  },

  packageItems: {
    borderWidth: 1,
    borderColor: colors.ash,
    padding: 20,
    zIndex: 0,
    marginBottom: 24,
  },
  textInputCategory: {
    padding: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  textWrap: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
  },
  categoryWrap: {
    backgroundColor: colors.white,
    position: 'relative',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    position: 'relative',
  },
  categoryName: {
    marginVertical: 10,
  },
  categoryText: {
    fontFamily: 'Montserrat-Regular',
  },
});
