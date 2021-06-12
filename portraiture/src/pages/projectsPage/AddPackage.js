import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/config/colors';
import {useDispatch, useSelector} from 'react-redux';
import {projectDetailId} from '../../redux/actions/action';

export default function AddPackage(props) {
  const {selectedPackage} = useSelector(state => state.packageReducer);
  const dispatch = useDispatch();
  const [priceTotal, setPriceTotal] = useState([]);

  useEffect(() => {
    if (selectedPackage !== undefined) {
      let total = 0;
      for (let i = 0; i < selectedPackage?.packageItems?.length; i++) {
        setPriceTotal((total += selectedPackage.packageItems[i].price));
      }
    }
  }, [selectedPackage]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Icon
          onPress={() => {
            dispatch(projectDetailId(props.route.params.package.id));
            props.navigation.goBack();
          }}
          name="chevron-left"
          size={40}
        />
        <View style={styles.headInner}>
          <Text style={styles.headTitle}>Package</Text>
          <Text style={styles.headDesc}>
            {props.route.params.package.title}
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.content}>
        {selectedPackage === undefined ? null : (
          <View style={styles.packageWrapper}>
            <View>
              <Image
                resizeMode="cover"
                style={styles.packageImg}
                source={{uri: selectedPackage.image}}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 16,
                  marginTop: 10,
                }}>
                {selectedPackage.name}
              </Text>
              {selectedPackage !== undefined && (
                <Text>
                  Rp. {priceTotal.toLocaleString({maximumFractionDigits: 2})}
                </Text>
              )}
            </View>
            <Text style={{color: colors.ash, fontFamily: 'Montserrat-Regular'}}>
              Item
            </Text>
            <FlatList
              data={selectedPackage.packageItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View>
                    <View style={styles.packageItems}>
                      <Icon name="square" size={5} />
                      <Text style={styles.itemName}>{item.itemName}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
        {selectedPackage == undefined ? (
          <View style={styles.addWrapper}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('SelectPackage', {
                  select: props.route.params,
                })
              }
              style={styles.addPackageBox}>
              <Text style={styles.addPackageText}>Add Package</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SelectPackage', {
                select: props.route.params,
              })
            }>
            <Text style={styles.changePackage}>Change package</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.wheat,
    height: 48 * 2,
  },
  headInner: {
    marginLeft: 20,
  },
  headTitle: {
    fontFamily: 'Montserrat-Bold',
  },
  headDesc: {
    fontFamily: 'Montserrat-Regular',
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  addWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPackageBox: {
    backgroundColor: colors.mint,
    borderColor: colors.primary,
    borderWidth: 2,
    borderStyle: 'dashed',
    paddingHorizontal: 120,
    paddingVertical: 100,
  },
  addPackageText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
  },
  packageImg: {
    width: '100%',
    height: 220,
    backgroundColor:colors.ash
  },
  packageItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  itemName: {
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    marginVertical: 5,
  },
  changePackage: {
    fontFamily: 'Montserrat-Bold',
    borderColor: colors.primary,
    borderWidth: 1,
    color: colors.primary,
    width: 170,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginTop: 50,
  },
});
