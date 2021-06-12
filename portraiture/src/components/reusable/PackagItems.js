import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../assets/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux'
import {actionCategoryId} from '../../redux/actions/action';

export default function PackagItems(props) {
  const dispatch = useDispatch();
  const [packageId, setPackageId] = useState('1');
  const [selectCategory, setSelectCategory] = useState(true);

  const categoryHandler = () => {
    setSelectCategory(!selectCategory);
  };

  const selectCategoryHandler = id => {
    setPackageId(id);
    dispatch(actionCategoryId(id))
    categoryHandler();
  };

  const category = [
    {id: '1', name: 'Photo Session'},
    {id: '2', name: 'Videography'},
    {id: '3', name: 'Print'},
    {id: '4', name: 'Digital'},
  ];

  const categoryId = packageId
  console.log('reuscat',categoryId);

  return (
    <View style={{flex: 1}}>
      <View style={styles.packageItems}>
        <View style={styles.inputWrapper}>
          <Icon onPress={props.onPressDelete} name='close' size={20} style={styles.deleteBtn} />
          <Text style={styles.titleText}>Item Name*</Text>
          <TextInput
            placeholder="e.g. 4 x 6 inch print"
            style={styles.textInput}
            value={props.valueName}
            onChangeText={props.onChangeTextName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.titleText}>Price*</Text>
          <TextInput
            placeholder="e.g. 1,000,000"
            style={styles.textInput}
            value={props.valuePrice}
            onChangeText={props.onChangeTextPrice}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.titleText}>Category*</Text>
          <TouchableOpacity style={styles.textWrap} onPress={categoryHandler}>
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
  );
}

const styles = StyleSheet.create({
  packageItems: {
    borderWidth: 1,
    borderColor: colors.ash,
    padding: 20,
    zIndex: 0,
    marginBottom: 24,
  },
  inputWrapper: {
    marginVertical: 12,
  },
  addText: {
    textAlign: 'center',
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
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
  textInputCategory: {
    padding: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  deleteBtn:{
    position:'absolute',
    right:-10,
    top:-20
  }
});
