import React,{useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import colors from '../../../assets/config/colors';

export default function ItemCard() {
  const [itemName, setItemName] = useState();
  const [price, setPrice] = useState();
  const [packageId, setPackageId] = useState('Select Category');
  const [selectCategory, setSelectCategory] = useState(true);

  const categoryHandler = () => {
    setSelectCategory(!selectCategory);
  };
  const selectCategoryHandler = name => {
    setPackageId(name);
    categoryHandler();
  };

  const category = [
    {id: '1', name: 'Photo Session'},
    {id: '2', name: 'Print'},
    {id: '3', name: 'Digital'},
    {id: '4', name: 'Other'},
  ];

  return (
    <>
      <View style={styles.packageItems}>
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
                    onPress={() => selectCategoryHandler(e.name)}
                    style={styles.categoryName}>
                    <Text style={styles.categoryText}>{e.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  packageItems: {
    borderWidth: 1,
    borderColor: colors.ash,
    padding: 20,
    zIndex: 0,
    marginBottom:24
  },
  title: {
    marginVertical: 20,
    fontFamily: 'Montserrat-Regular',
    color: colors.secondary,
  },
  inputWrapper: {
    marginVertical: 12,
  },
  titleText: {
    fontFamily: 'Montserrat-Regular',
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
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
