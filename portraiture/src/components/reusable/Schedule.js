import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../../../assets/config/colors';

export default function Schedule(props) {
  const timeSchedule = [
    // {id: 1, time: '00:00'},
    // {id: 2, time: '00:30'},
    // {id: 3, time: '01:00'},
    // {id: 4, time: '01:30'},
    // {id: 5, time: '02:00'},
    // {id: 6, time: '02:30'},
    // {id: 7, time: '03:00'},
    // {id: 8, time: '03:30'},
    {id: 9, time: '04:00'},
    {id: 10, time: '04:30'},
    {id: 11, time: '05:00'},
    {id: 12, time: '05:30'},
    {id: 13, time: '06:00'},
    {id: 14, time: '06:30'},
    {id: 15, time: '07:00'},
    {id: 16, time: '07:30'},
    {id: 17, time: '08:00'},
    {id: 18, time: '08:30'},
    {id: 19, time: '09:00'},
    {id: 20, time: '09:30'},
    {id: 21, time: '10:00'},
    {id: 22, time: '10:30'},
    {id: 23, time: '11:00'},
    {id: 24, time: '11:30'},
    {id: 25, time: '12:00'},
    {id: 26, time: '12:30'},
    {id: 27, time: '13:00'},
    {id: 28, time: '13:30'},
    {id: 29, time: '14:00'},
    {id: 30, time: '14:30'},
    {id: 31, time: '15:00'},
    {id: 32, time: '15:30'},
    {id: 33, time: '16:00'},
    {id: 34, time: '16:30'},
    {id: 35, time: '17:00'},
    {id: 36, time: '17:30'},
    {id: 37, time: '18:00'},
    {id: 38, time: '18:30'},
    {id: 39, time: '19:00'},
    {id: 40, time: '19:30'},
    {id: 41, time: '20:00'},
    {id: 42, time: '20:30'},
    {id: 43, time: '21:00'},
    {id: 44, time: '21:30'},
    {id: 45, time: '22:00'},
    {id: 46, time: '22:30'},
  ];

  const eventName1 = props.eventName1
  const from1 = props.from1;
  const to1 = props.to1
  const theme1 = props.theme1;
  const desc1 = props.desc1
  const eventName2 = props.eventName2
  const from2 = props.from2;
  const to2 = props.to2
  const theme2 = props.theme2;
  const desc2 = props.desc2
  return (
    <View>
      <FlatList
        data={timeSchedule}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          console.log(item.time !== from1);
          return (
            <View style={styles.timeWrap}>
              <View style={styles.timeItem}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <TouchableOpacity
                onPress={props.onPress}
                style={styles.itemSchedule}>
                { item.time.includes(from1) ? (
                  <View style={theme1 == 1 ? styles.bgSchedule1 : styles.bgSchedule2}>
                    <Text style={styles.title}>{eventName1}</Text>
                    <Text style={styles.time}>{from1} - {to1}</Text>
                    <Text style={styles.time}>{desc1}</Text>
                  </View>
                ) : item.time.includes(from2) ? (
                  <View style={theme2 == 1 ? styles.bgSchedule1 : styles.bgSchedule2}>
                    <Text style={styles.title}>{eventName2}</Text>
                    <Text style={styles.time}>{from2} - {to2}</Text>
                    <Text style={styles.time}>{desc2}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timeWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 80,
    borderBottomColor: colors.vogue,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  timeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },
  itemSchedule: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  timeText: {
    fontFamily: 'Montserrat-Regular',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: '#166666'
  },
  time: {
    fontFamily: 'Montserrat-Regular',
    color: '#166666'
  },
  bgSchedule1:{
    backgroundColor:'#CAEAEA',
    padding:12,
    borderRadius:5
  },
  bgSchedule2:{
    backgroundColor:'#F7DEC0',
    padding:12,
    borderRadius:5
  }

});
