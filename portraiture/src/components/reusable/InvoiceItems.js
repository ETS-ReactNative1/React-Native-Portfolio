import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../assets/config/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InvoiceItems(props) {
  const [selectCategory, setSelectCategory] = useState(true);
  const [packageId, setPackageId] = useState('1');

  console.log(packageId);
  const categoryHandler = () => {
    setSelectCategory(!selectCategory);
  };

  const selectCategoryHandler = id => {
    setPackageId(id);
    categoryHandler();
  };

  const category = [
    {id: '1', name: '1'},
    {id: '2', name: '2'},
    {id: '3', name: '3'},
    {id: '4', name: '4'},
  ];

  return (
    <View style={styles.packageItems}>
        <Icon onPress={props.onPressDelete} name='close' size={20} style={styles.closebtn} />
      <View style={styles.inputWrapper}>
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
        <Text style={styles.titleText}>Qty*</Text>
        <TouchableOpacity style={styles.textWrap} onPress={props.onPress}>
          <Text style={styles.textInputCategory}>{packageId}</Text>
        </TouchableOpacity>
        {selectCategory ? null : (
          <View style={styles.categoryWrap}>
            {category.map(e => {
              return (
                <TouchableOpacity
                  key={e.id}
                  onPress={props.onPressQty}
                  style={styles.categoryName}>
                  <Text style={styles.categoryText}>{e.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
    marginTop:20
  },
  closebtn:{
      position:'absolute',
      right:0,
      padding:7
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
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 30,
    fontFamily: 'Montserrat-Regular',
  },
});
