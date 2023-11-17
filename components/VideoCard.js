import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const VideoCard = ({item}) => {

  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={()=>navigation.navigate('Load',{
      data:item._data,
    })}
     style={styles.card}>
      <Image
        source={{
          uri:item._data.thumbnailUrl 
        }}
        style={{
          height: '75%',
          width: '100%',
          borderRadius: 30,
          position:'relative',
        }}
        resizeMode="cover"
      />
      <Text style={{
        color:'#FFFFFF',
        backgroundColor:'black',
        paddingVertical:5,
        paddingHorizontal:10,
        position:'absolute',
        borderRadius:10,
        bottom:'30%',
        right:'3%'
      }}>{item._data.duration}</Text>
      <Text style={styles.cardHeadText}>{item._data.title.length > 25 ? item._data.title.slice(0,25)+'..' : item._data.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text style={styles.cardText}>{item._data.author}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={styles.cardText}></Text> */}
          <Text style={styles.cardText}>{item._data.views}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={styles.cardText}></Text> */}
          <Text style={styles.cardText}>{item._data.uploadTime}</Text>
        </View>
      </View>
      <Image source={require('../assets/watchNow.png')}
      style={{
        height:100, 
        width:100, 
        position:'absolute',
        bottom:"0%",
        right:"0%"
      }}
      resizeMode='contain'
       />
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  card: {
    height: 280,
    width: 350,
    borderBottomWidth: 1,
    borderColor: '#F2F2F2',
    marginTop:20,
  },
  cardHeadText: {
    fontSize: 20,
    color: '#0F0F0F',
    fontWeight: '700',
    marginTop: 5,
  },
  cardText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7F7F',
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
  },
});
