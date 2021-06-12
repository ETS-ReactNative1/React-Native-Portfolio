import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/config/colors';
import {useDispatch, useSelector} from 'react-redux';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Loading from '../../components/reusable/Loading';
import {fetchRequestInvoice} from '../../redux/actions/action';

export default function InvoiceDetail({navigation, route}) {
  const {selectedPackage} = useSelector(state => state.packageReducer);
  const {profile} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const dp = route.params.dp;
  const inv = route.params.inv;
  const items = inv.detailInvoices;

  const [recipt, setRecipt] = useState({
    mime: '',
    path: '',
    name: '',
  });
  const [isPaid, setIsPaid] = useState(false);
  const [paidCost, setPaidCost] = useState('0');
  const [loading, setLoading] = useState(false);
  const [priceTotal, setPriceTotal] = useState([]);


  useEffect(() => {
    if (selectedPackage !== undefined) {
      let total = 0;
      for (let i = 0; i < selectedPackage?.packageItems?.length; i++) {
        setPriceTotal((total += selectedPackage.packageItems[i].price));
      }
    }
  }, [selectedPackage]);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageQuality: 0.8,
    })
      .then(images => {
        setRecipt({
          mime: images.mime,
          path: images.path,
          name: images.filename,
        });
      })
      .catch(e => console.log(e));
  };

  const pathImage = 'https://portraiture.gabatch11.my.id';

  const isPaidHandle = () => {
    setIsPaid(!isPaid);
  };

  const saveInvoice = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('isPaid', isPaid);
    data.append('paidCost', paidCost);
    data.append('issuedDate', inv.issuedDate);
    data.append('dueDate', inv.dueDate);
    data.append('image', {
      uri: 'file://' + recipt.path,
      type: recipt.mime,
      name: recipt.name,
    });

    var config = {
      method: 'put',
      url:
        'https://portraiture.gabatch11.my.id/invoice?id_project=' +
        dp.id +
        '&id_invoice=' +
        inv.id_invoice,
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(fetchRequestInvoice(dp.id));
        navigation.navigate('Invoice')
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
          <Text style={styles.headTitle}>Invoice {inv.invoiceName}</Text>
          <Text style={styles.headDesc}>{dp.title}</Text>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <View>
              <Text
                style={{fontFamily: 'Montserrat-Regular', color: colors.ash}}>
                Project
              </Text>
              <Text style={{fontFamily: 'Montserrat-Bold', marginVertical: 5}}>
                {dp.title}
              </Text>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>{dp.date}</Text>
            </View>
            <View style={{marginTop: 15}}>
              <Text
                style={{fontFamily: 'Montserrat-Regular', color: colors.ash}}>
                Status
              </Text>
              <Text
                style={inv.isPaid == true ? styles.isPaid : styles.isUnpaid}>
                {inv.isPaid === true ? 'Paid' : 'Unpaid'}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Icon
                  onPress={isPaidHandle}
                  name={isPaid ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={30}
                />
                <Text
                  style={{fontFamily: 'Montserrat-Regular', marginLeft: 10}}>
                  Is paid ?
                </Text>
              </View>
              {isPaid == true && (
                <TextInput
                  placeholder="e.g 1.000.000"
                  style={styles.textInput}
                  value={paidCost}
                  onChangeText={setPaidCost}
                />
              )}
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.ash,
                  marginVertical: 5,
                }}>
                Receipt
              </Text>
              {recipt.mime !== '' && (
                <View
                  style={{backgroundColor: colors.info, paddingVertical: 3}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-Regular',
                      textAlign: 'center',
                      fontSize: 12,
                    }}>
                    Receipt Successfully Uploaded
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={choosePhotoFromLibrary}
                style={styles.uploadRecipt}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: colors.primary,
                    paddingVertical: 10,
                  }}>
                  Upload Receipt
                </Text>
              </TouchableOpacity>
            </View>
            <ButtonPrimary
              onPress={() => {
                setLoading(true);
                saveInvoice();
              }}
              name="Save"
            />
          </View>
        </View>
        <View style={styles.previewContainer}>
          <View style={styles.previewHeader}>
            <Text style={{fontFamily: 'Montserrat-Bold'}}>
              Portraiture Invoice
            </Text>
            <View style={styles.downloadPdf}>
              <Icon name="eye-outline" size={22} color={colors.primary} />
              <Text style={styles.textPdf}>Receipt preview</Text>
            </View>
          </View>
        </View>
        <View style={styles.pdfWrapper}>
          <View style={styles.pdfContent}>
            <View style={styles.logoBusiness}>
              <Image
                style={styles.logoImg}
                source={{uri: pathImage + profile.photo}}
              />
              <Text style={{fontFamily: 'Montserrat-Bold'}}>
                {profile.businessName}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: colors.primary,
                fontSize: 11,
              }}>
              INVOICE {inv.invoiceName}
            </Text>
            <View style={styles.dateWrapper}>
              <View style={styles.marginHeader}>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 10}}>
                  Issued Date
                </Text>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 10}}>
                  {inv.issuedDate}
                </Text>
              </View>
              <View>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 10}}>
                  Due Date
                </Text>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 10}}>
                  {inv.dueDate}
                </Text>
              </View>
            </View>
            <View style={styles.dateWrapper}>
              <View style={styles.marginHeader}>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 10}}>
                  Bill from
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 10,
                    color: colors.primary,
                  }}>
                  {dp.clientName}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 10,
                    color: colors.primary,
                  }}>
                  {dp.clientAddress}
                </Text>
              </View>
              <View>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 10}}>
                  Bill to
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 10,
                    color: colors.primary,
                  }}>
                  {profile.name}({profile.businessName})
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 10,
                    color: colors.primary,
                  }}>
                  {profile.address}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.titleTable}>
                <Text style={styles.titleTxt}>Name</Text>
                <Text style={styles.titleTxt}>Qty</Text>
                <Text style={styles.titleTxt}>Price</Text>
                <Text style={styles.titleTxt}>Amount</Text>
              </View>
              <View style={styles.itemTable}>
                <Text style={styles.textTb}>{selectedPackage.name}</Text>
                <Text style={styles.textTb}>1</Text>
                <Text style={styles.textTb}>
                  {priceTotal.toLocaleString({maximumFractionDigits: 2})}
                </Text>
                <Text style={styles.textTb}>
                  {priceTotal.toLocaleString({maximumFractionDigits: 2})}
                </Text>
              </View>
              {items.map(e => {
                return (
                  <View key={e.id_detailInvoice} style={styles.itemTable}>
                    <Text style={styles.textTb}>{e.name}</Text>
                    <Text style={styles.textTb}>{e.quantity}</Text>
                    <Text style={styles.textTb}>
                      {e.price.toLocaleString({maximumFractionDigits: 2})}
                    </Text>
                    <Text style={styles.textTb}>
                      {(e.price * e.quantity).toLocaleString({
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.totalWrap}>
              <View style={styles.subtotal}>
                <Text style={styles.sub}>Subtotal</Text>
                <Text style={styles.sub2}>
                  Rp.
                  {(inv.subtotal + priceTotal).toLocaleString({
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
              <View style={styles.subtotal}>
                <Text style={styles.paid}>Paid</Text>
                <Text style={styles.paid2}>
                  Rp.{inv.paidCost.toLocaleString({maximumFractionDigits: 2})}
                </Text>
              </View>
              <View style={styles.subtotalDue}>
                <Text style={styles.sub}>Amount Due</Text>
                <Text style={styles.sub2}>
                  Rp.
                  {(inv.amountDue + priceTotal).toLocaleString({
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View>
                <Text style={styles.sub}>{profile.businessName} 2021</Text>
                <Text style={styles.paid}>{profile.email}</Text>
              </View>
              <Text style={styles.powered}>POWERED BY PORTRAITURE</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: colors.mint,
    paddingHorizontal: 20,
  },
  contentHeader: {
    flex: 1,
  },
  isPaid: {
    fontFamily: 'Montserrat-Bold',
    color: colors.info,
    marginVertical: 5,
  },
  isUnpaid: {
    fontFamily: 'Montserrat-Bold',
    color: colors.error,
    marginVertical: 5,
  },
  uploadRecipt: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginTop: 3,
    marginBottom: 10,
    borderStyle: 'dotted',
  },
  previewContainer: {
    flex: 1,
    padding: 20,
  },
  downloadPdf: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPdf: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginLeft: 5,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pdfWrapper: {
    backgroundColor: colors.wheat,
    flex: 1,
  },
  pdfContent: {
    backgroundColor: colors.white,
    margin: 15,
    padding: 20,
  },
  logoImg: {
    width: 50,
    height: 50,
  },
  dateWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  logoBusiness: {
    width: 81,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  marginHeader: {
    width: 150,
  },
  titleTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.wheat,
    marginTop: 10,
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 10,
  },
  titleTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
  },
  itemTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textTb: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 9,
  },
  totalWrap: {
    paddingTop: 30,
    alignItems: 'flex-end',
    borderTopColor: colors.black,
    borderTopWidth: 1,
  },
  subtotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    marginVertical: 2,
    paddingHorizontal: 10,
  },
  subtotalDue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    marginVertical: 2,
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  sub: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
  },
  sub2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
  },
  paid: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 9,
  },
  paid2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  powered: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 5,
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
});
