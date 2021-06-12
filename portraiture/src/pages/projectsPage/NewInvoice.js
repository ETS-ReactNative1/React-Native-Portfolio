import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/config/colors';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import InvoiceItems from '../../components/reusable/InvoiceItems';
import ButtonPrimary from '../../components/reusable/ButtonPrimary';
import Loading from '../../components/reusable/Loading';
import {useDispatch} from 'react-redux';
import {fetchRequestInvoice} from '../../redux/actions/action';

export default function NewInvoice(props) {
  const dispatch = useDispatch();
  const {selectedPackage} = useSelector(state => state.packageReducer);
  console.log('sp', selectedPackage);
  const titleHeader = props.route.params.client.params.name.title;
  const projectId = props.route.params.client.params.name.id;
  const detailProject = props.route.params.client.params.name;
  const {profile} = useSelector(state => state.authReducer);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [billTo, setBillTo] = useState(detailProject.clientName);
  const [billtoAddress, setBilltoAddress] = useState(
    detailProject.clientAddress,
  );
  const [packageImport, setPackageImport] = useState(false);
  const [addItem, setAddItem] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [paidCost, setPaidCost] = useState();
  const [loading, setLoading] = useState(false);

  const [itemName1, setItemName1] = useState('');
  const [itemName2, setItemName2] = useState('');
  const [itemName3, setItemName3] = useState('');
  const [itemName4, setItemName4] = useState('');
  const [itemName5, setItemName5] = useState('');
  const [price1, setPrice1] = useState('');
  const [price2, setPrice2] = useState('');
  const [price3, setPrice3] = useState('');
  const [price4, setPrice4] = useState('');
  const [price5, setPrice5] = useState('');
  const [qty1, setQty1] = useState('1');
  const [qty2, setQty2] = useState('1');
  const [qty3, setQty3] = useState('1');
  const [qty4, setQty4] = useState('1');
  const [qty5, setQty5] = useState('1');

  const isPaidHandle = () => {
    setIsPaid(!isPaid);
  };

  const boolPackage = () => {
    setPackageImport(!packageImport);
  };

  var months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  var days = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];
  const issuedDate =
    date.getFullYear() +
    '/' +
    months[date.getMonth()] +
    '/' +
    days[date.getDate() - 1];

  const dueDate =
    date2.getFullYear() +
    '/' +
    months[date2.getMonth()] +
    '/' +
    days[date2.getDate() - 1];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  console.log(issuedDate, dueDate, isPaid, paidCost, projectId);

  const submitInvoiceHandler = () => {
    var qs = require('qs');
    var data = qs.stringify({
      issuedDate: issuedDate,
      dueDate: dueDate,
      isPaid: isPaid,
      paidCost: paidCost,
    });
    var config = {
      method: 'post',
      url:
        'https://portraiture.gabatch11.my.id/invoice?id_project=' + projectId,
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(fetchRequestInvoice(projectId));
        props.navigation.goBack();
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const invoiceItem = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append(
      'name',
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
    data.append(
      'quantity',
      addItem == 0
        ? qty1
        : addItem == 1
        ? qty2
        : addItem == 2
        ? qty3
        : addItem == 3
        ? qty4
        : qty5,
    );
    var config = {
      method: 'post',
      url: 'https://portraiture.gabatch11.my.id/detailInvoice',
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addItemHandler = () => {
    setAddItem(addItem + 1);
  };

  const removeItemHandler = () => {
    setAddItem(addItem - 1);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Icon
          onPress={() => props.navigation.goBack()}
          name="chevron-left"
          size={40}
        />
        <View style={styles.headInner}>
          <Text style={styles.headTitle}>Create Invoice</Text>
          <Text style={styles.headDesc}>{titleHeader}</Text>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.importContainer}>
          <View style={styles.importWrap}>
            <TouchableOpacity onPress={boolPackage}>
              {selectedPackage === undefined ? (
                <Text style={styles.importText}>Related package not found</Text>
              ) : (
                <Text style={styles.importText}>Related package found</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ProjectDetail')}>
              <Text style={styles.importBox}>Import</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pullDown}></View>
          {packageImport == true ? (
            <View style={styles.items}>
              {selectedPackage === undefined ? (
                <Text style={styles.itemText}>
                  You can import related package into this invoice.
                </Text>
              ) : (
                <Text style={styles.itemText}>Here’s the package details</Text>
              )}
              {selectedPackage?.packageItems?.map(e => {
                console.log(e);
                return (
                  <View key={Math.random().toString()}>
                    <Text
                      style={{
                        color: colors.ash,
                        paddingHorizontal: 10,
                        marginTop: 5,
                      }}>
                      - {e.itemName}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>
        <View style={{flex: 1}}>
          <View style={styles.contain}>
            <View>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: colors.primary,
                  marginBottom: 20,
                  fontSize: 16,
                }}>
                INVOICE #{projectId}
              </Text>
              <Text style={styles.title}>Issued Date</Text>
              <TouchableOpacity style={styles.textInput} onPress={toggleModal}>
                <Text style={{fontFamily: 'Montserrat-Regular'}}>
                  {issuedDate}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.title}>Due Date</Text>
              <TouchableOpacity style={styles.textInput} onPress={toggleModal2}>
                <Text style={{fontFamily: 'Montserrat-Regular'}}>
                  {dueDate}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.detailTitle}>Project Details</Text>
            <View>
              <Text style={styles.title}>Bill to</Text>
              <TextInput
                style={styles.textInput}
                value={billTo}
                onChangeText={setBillTo}
              />
              <TextInput
                multiline
                style={styles.textInput}
                value={billtoAddress}
                onChangeText={setBilltoAddress}
              />
              <Text style={styles.title}>Bill from</Text>
              <Text style={styles.textInputFrom}>{profile.businessName}</Text>
              <Text style={styles.textInputFrom}>{profile.address}</Text>
            </View>
            <View>
              <Text style={styles.titleItem}>Items</Text>
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
                  <Text style={styles.titleText}>Qty*</Text>
                  <TextInput
                    style={styles.textInput}
                    value={qty1}
                    onChangeText={setQty1}
                  />
                </View>
              </View>
              {addItem > 0 && (
                <View style={styles.packageItems}>
                  <Icon
                    onPress={removeItemHandler}
                    name="close"
                    size={20}
                    style={styles.closebtn}
                  />
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Item Name*</Text>
                    <TextInput
                      placeholder="e.g. 4 x 6 inch print"
                      style={styles.textInput}
                      value={itemName2}
                      onChangeText={setItemName2}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Price*</Text>
                    <TextInput
                      placeholder="e.g. 1,000,000"
                      style={styles.textInput}
                      value={price2}
                      onChangeText={setPrice2}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Qty*</Text>
                    <TextInput
                      style={styles.textInput}
                      value={qty2}
                      onChangeText={setQty2}
                    />
                  </View>
                </View>
              )}
              {addItem > 1 && (
                <View style={styles.packageItems}>
                  <Icon
                    onPress={removeItemHandler}
                    name="close"
                    size={20}
                    style={styles.closebtn}
                  />
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Item Name*</Text>
                    <TextInput
                      placeholder="e.g. 4 x 6 inch print"
                      style={styles.textInput}
                      value={itemName3}
                      onChangeText={setItemName3}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Price*</Text>
                    <TextInput
                      placeholder="e.g. 1,000,000"
                      style={styles.textInput}
                      value={price3}
                      onChangeText={setPrice3}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Qty*</Text>
                    <TextInput
                      style={styles.textInput}
                      value={qty3}
                      onChangeText={setQty3}
                    />
                  </View>
                </View>
              )}
              {addItem > 2 && (
                <View style={styles.packageItems}>
                  <Icon
                    onPress={removeItemHandler}
                    name="close"
                    size={20}
                    style={styles.closebtn}
                  />
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Item Name*</Text>
                    <TextInput
                      placeholder="e.g. 4 x 6 inch print"
                      style={styles.textInput}
                      value={itemName4}
                      onChangeText={setItemName4}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Price*</Text>
                    <TextInput
                      placeholder="e.g. 1,000,000"
                      style={styles.textInput}
                      value={price4}
                      onChangeText={setPrice4}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Qty*</Text>
                    <TextInput
                      placeholder="e.g. 1,000,000"
                      style={styles.textInput}
                      value={qty4}
                      onChangeText={setQty4}
                    />
                  </View>
                </View>
              )}
              {addItem > 3 && (
                <View style={styles.packageItems}>
                  <Icon
                    onPress={removeItemHandler}
                    name="close"
                    size={20}
                    style={styles.closebtn}
                  />
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Item Name*</Text>
                    <TextInput
                      placeholder="e.g. 4 x 6 inch print"
                      style={styles.textInput}
                      value={itemName5}
                      onChangeText={setItemName5}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Price*</Text>
                    <TextInput
                      placeholder="e.g. 1,000,000"
                      style={styles.textInput}
                      value={price5}
                      onChangeText={setPrice5}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.titleText}>Qty*</Text>
                    <TextInput
                      style={styles.textInput}
                      value={qty5}
                      onChangeText={setQty5}
                    />
                  </View>
                </View>
              )}
              {addItem < 4 && (
                <TouchableOpacity
                  onPress={()=>{
                    invoiceItem();
                    addItemHandler();
                  }}
                  style={styles.addItem}>
                  <Text style={styles.addText}>+ Add Item</Text>
                </TouchableOpacity>
              )}
            </View>
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
              <Text style={{fontFamily: 'Montserrat-Regular', marginLeft: 10}}>
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
          </View>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalWrapper}>
              <DatePicker mode="date" date={date} onDateChange={setDate} />
              <TouchableOpacity
                style={styles.confirmDate}
                onPress={toggleModal}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal isVisible={isModalVisible2}>
            <View style={styles.modalWrapper}>
              <DatePicker mode="date" date={date2} onDateChange={setDate2} />
              <TouchableOpacity
                style={styles.confirmDate}
                onPress={toggleModal2}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.wrapSave}>
            <ButtonPrimary
              onPress={() => {
                setLoading(true);
                invoiceItem()
                submitInvoiceHandler();
              }}
              name="Save"
            />
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
  importWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  importContainer: {
    backgroundColor: colors.mint,
  },
  importText: {
    fontFamily: 'Montserrat-Bold',
  },
  importBox: {
    fontFamily: 'Montserrat-Regular',
    borderColor: colors.ash,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  pullDown: {
    borderColor: colors.vogue,
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    marginHorizontal: '43%',
    top: -10,
  },
  textInput: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 30,
    fontFamily: 'Montserrat-Regular',
  },
  textInputFrom: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    fontFamily: 'Montserrat-Regular',
  },
  picker: {
    borderBottomColor: colors.ash,
    borderBottomWidth: 1,
    padding: 14,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
  },
  confirmDate: {
    backgroundColor: colors.primary,
    marginBottom: 20,
    borderRadius: 6,
  },
  confirmText: {
    color: 'white',
    padding: 15,
    width: 300,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  modalWrapper: {
    backgroundColor: 'rgba(244,244,244,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  contain: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  detailTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 20,
  },
  titleItem: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.secondary,
    marginTop: 20,
  },

  addItem: {
    marginVertical: 20,
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
  wrapSave: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  items: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: colors.mint,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginTop:10
  },
  packageItems: {
    borderWidth: 1,
    borderColor: colors.ash,
    padding: 20,
    zIndex: 0,
    marginTop: 20,
  },
  closebtn: {
    position: 'absolute',
    right: 0,
    padding: 7,
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
  closebtn: {
    position: 'absolute',
    right: 0,
    padding: 7,
  },
});
