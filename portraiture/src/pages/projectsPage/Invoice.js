import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/config/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchRequestInvoice,
  fetchRequestProfileData,
  fetchSelectedPackage,
} from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from '../../components/reusable/Loading';

export default function Invoice({navigation, route}) {
  const {invoice} = useSelector(state => state.projectReducer);
  const dispatch = useDispatch();
  const dataProject = route.params.name;
  const [loading, setLoading] = useState(false);
  console.log('inv', invoice);
  console.log('dp', dataProject);

  useEffect(() => {
    dispatch(fetchRequestInvoice(dataProject.id));
  }, []);

  const deleteInvoice = id => {
    var config = {
      method: 'delete',
      url:
        'https://portraiture.gabatch11.my.id/invoice/delete?id_invoice=' + id,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRequestInvoice(dataProject.id));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={40}
        />
        <View style={styles.headInner}>
          <Text style={styles.headTitle}>Invoice</Text>
          <Text style={styles.headDesc}>{route.params.name.title}</Text>
        </View>
      </SafeAreaView>
      <View style={styles.content}>
        <FlatList
          data={invoice}
          numColumns={2}
          keyExtractor={item => item.id_invoice}
          horizontal={false}
          renderItem={({item}) => {
            console.log('item inv', item);
            return (
              <View>
                <View style={styles.listPaid}>
                  {item.add_id !== 999 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Icon
                        name="book-account-outline"
                        size={34}
                        color={colors.primary}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setLoading(true);
                          deleteInvoice(item.id_invoice);
                        }}>
                        <Icon
                          name="delete-outline"
                          size={34}
                          color={colors.error}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {item.add_id !== 999 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('InvoiceDetail', {
                          dp: dataProject,
                          inv: item,
                        })
                      }>
                      <Text
                        style={
                          item.isPaid == true
                            ? styles.statusPaid
                            : styles.statusUnpaid
                        }>
                        {item.isPaid == true ? 'Paid' : 'Unpaid'}
                      </Text>
                      <Text style={styles.code}>{item.invoiceName}</Text>
                      <Text style={styles.date}>
                        {item.isPaid == true
                          ? 'Paid at ' + item.dueDate
                          : 'Updated at ' + item.issuedDate}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {item.add_id == 999 && (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          fetchSelectedPackage(route.params.name.id_package),
                        );
                        dispatch(fetchRequestProfileData());
                        navigation.navigate('NewInvoice', {client: route});
                      }}
                      style={styles.addNewWrap}>
                      <Text style={styles.addNew}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  listWrapper: {
    width: 168,
    height: 206,
    marginVertical: 14,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listName: {
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary,
  },
  listPaid: {
    justifyContent: 'space-between',
    width: 180,
    height: 216,
    marginHorizontal: 9,
    marginVertical: 9,
    backgroundColor: colors.mint,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  listName: {
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary,
  },
  listAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 216,
    marginHorizontal: 14,
    marginVertical: 10,
    backgroundColor: colors.mint,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  addText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary,
  },
  statusPaid: {
    color: colors.info,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  statusUnpaid: {
    color: colors.error,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  code: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginBottom: 20,
  },
  date: {
    fontFamily: 'Montserrat-Regular',
    color: colors.ash,
  },
  downloadPdf: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  textPdf: {
    fontFamily: 'Montserrat-Regular',
  },
  addNewWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNew: {
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary,
  },
});
