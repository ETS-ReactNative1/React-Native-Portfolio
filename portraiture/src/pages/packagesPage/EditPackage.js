import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {fetchRequestPackageItems} from '../../redux/actions/action';
import Loading from '../../components/reusable/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

export default function EditPackage(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(props.route.params.packageId.name);
  const [description, setDescription] = useState(
    props.route.params.packageId.description,
  );
  const dispatch = useDispatch();

  const [image, setImage] = useState({
    mime: '',
    path: props.route.params.packageId.image,
    name: '',
  });

  const packageDetailHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('image', {
      uri: 'file://' + image.path,
      type: image.mime,
      name: image.name,
    });
    data.append('packageId', props.route.params.packageId.id);

    var config = {
      method: 'put',
      url: 'https://portraiture.gabatch11.my.id/package',
      headers: {Authorization: `bearer ${token}`},
      data: data,
    };
    axios(config)
      .then(function (response) {
        dispatch(fetchRequestPackageItems());
        setTimeout(() => {
          setLoading(false);
          props.navigation.navigate('PackageScreen');
        }, 400);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      // forceJpg: true,
      // compressImageQuality: 0.8,
    })
      .then(images => {
        setImage({
          mime: images.mime,
          path: images.path,
          name: images.filename,
        });
      })
      .catch(e => alert(e));
  };

  return (
    <View style={styles.container}>
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
              <Image source={{uri: image.path}} style={styles.imageLogo} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={styles.title}>Package Items</Text> */}
        {/* <View style={styles.packageItems}>
          <View style={styles.inputWrapper}>
            <Text style={styles.titleText}>Item Name*</Text>
            <TextInput
              placeholder="e.g. 4 x 6 inch print"
              style={styles.textInput}
              value={itemName}
              onChangeText={setItemName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.titleText}>Price*</Text>
            <TextInput
              placeholder="e.g. 1,000,000"
              style={styles.textInput}
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.titleText}>Category*</Text>
            <TouchableOpacity style={styles.textWrap} onPress={categoryHandler}>
              <Text style={styles.textInputCategory}>{packageId}</Text>
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
        </View> */}
        {/* <TouchableOpacity
          onPress={() => addItemHandler()}
          style={styles.addItem}>
          <Text style={styles.addText}>+ Add Item</Text>
        </TouchableOpacity> */}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              packageDetailHandler();
            }}
            style={styles.save}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading isVisible={loading} />
    </View>
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
