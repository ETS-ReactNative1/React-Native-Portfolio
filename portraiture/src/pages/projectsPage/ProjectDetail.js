import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/config/colors';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  actionEventRundown,
  fetchAddPersonRundown,
  fetchRequestInvoice,
  fetchRequestProjectItems,
  fetchSelectedPackage,
} from '../../redux/actions/action';
import Loading from '../../components/reusable/Loading';

export default function ProjectDetail(props) {
  const [loading, setLoading] = useState(false);
  const {projectDetail} = useSelector(state => state.projectReducer);
  const dispatch = useDispatch();
  console.log('detial proj', projectDetail);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Icon
          onPress={() => {
            props.navigation.goBack();
          }}
          name="chevron-left"
          size={40}
          color={colors.gun}
        />
        <Text style={styles.headerTitle}>Project Detail</Text>
        <Icon name="chevron-left" size={38} color={colors.wheat} />
      </SafeAreaView>
      <View style={styles.projectWrap}>
        <View style={styles.labelPlanned}>
          <Text style={styles.label}>Planned</Text>
        </View>
        <View style={styles.projectDetail}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditProject', {
                projectId: projectDetail,
              })
            }
            style={styles.editDetailIcon}>
            <Icon name="pencil-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.titleDetail}>Name</Text>
          <Text style={styles.descDetail}>{projectDetail.title}</Text>
          <Text style={styles.titleDetail}>Date</Text>
          <Text style={styles.descDetail}>{projectDetail.date}</Text>
          <Text style={styles.titleDetail}>Description</Text>
          <Text style={styles.descDetail}>{projectDetail.description}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            dispatch(fetchSelectedPackage(projectDetail.id_package));
            dispatch(fetchRequestProjectItems());
            setTimeout(() => {
              setLoading(false);
              props.navigation.navigate('AddPackage', {package: projectDetail});
            }, 400);
          }}
          style={styles.create}>
          <View style={styles.createTop}>
            <MaskedView
              style={{height: 30, width: 30}}
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="folder" size={30} color={colors.primary} />
                </View>
              }>
              <LinearGradient
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={[colors.primary, colors.secondary]}
                style={{flex: 1}}
              />
            </MaskedView>
            <Text style={styles.createName}>Package</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            dispatch(fetchAddPersonRundown(projectDetail.id));
            dispatch(actionEventRundown());
            props.navigation.navigate('Rundown', {package: projectDetail});
            setLoading(false);
          }}
          style={styles.create}>
          <View style={styles.createTop}>
            <MaskedView
              style={{height: 30, width: 30}}
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="calendar-month"
                    size={30}
                    color={colors.primary}
                  />
                </View>
              }>
              <LinearGradient
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={[colors.primary, colors.secondary]}
                style={{flex: 1}}
              />
            </MaskedView>
            <Text style={styles.createName}>Rundown</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            dispatch(fetchRequestInvoice(projectDetail.id));
            setTimeout(() => {
              props.navigation.navigate('Invoice', {name: projectDetail});
              setLoading(false);
            }, 300);
          }}
          style={styles.create}>
          <View style={styles.createTop}>
            <MaskedView
              style={{height: 30, width: 30}}
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="book-account-outline"
                    size={30}
                    color={colors.primary}
                  />
                </View>
              }>
              <LinearGradient
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={[colors.primary, colors.secondary]}
                style={{flex: 1}}
              />
            </MaskedView>
            <Text style={styles.createName}>Invoice</Text>
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    color: colors.gun,
  },
  projectWrap: {
    padding: 20,
  },
  labelPlanned: {
    backgroundColor: colors.info,
    width: 90,
    borderRadius: 4,
    marginVertical: 10,
  },
  label: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  projectDetail: {
    backgroundColor: colors.mint,
    borderRadius: 4,
    padding: 12,
  },
  editDetailIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    flex: 1,
  },
  titleDetail: {
    fontFamily: 'Montserrat-Bold',
  },
  descDetail: {
    fontFamily: 'Montserrat-Regular',
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  create: {
    backgroundColor: colors.cream,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  createTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createName: {
    color: colors.primary,
    fontSize: 15,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
});
