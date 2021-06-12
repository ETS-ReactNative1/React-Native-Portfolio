import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../../assets/config/colors';

export default function Loading(props) {
  return (
    <Modal
      animationIn='bounceIn'
      animationInTiming={0}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      backdropColor="black"
      style={styles.loadingWrapper}
      isVisible={props.isVisible}>
      <View style={styles.backGround}>
        <ActivityIndicator
          style={styles.loadingStart}
          size="large"
          color={colors.info}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backGround:{
    backgroundColor:colors.white,
    padding:40,
    borderRadius:10
  }
});
