import {Image, ScrollView, StatusBar, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import VideoCard from '../components/VideoCard';
// import {videoData} from '../data/data';
import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const getVideos = async () => {
      const videos = await firestore().collection('videos').get();
      console.log(videos.docs);
      setVideoData(videos.docs);
      // setTimeout(()=>setIsLoading(false),1000);
      setIsLoading(false)
    };
    getVideos();
  }, []);
  return (
    <>
    <StatusBar translucent backgroundColor='#62B1F4' />
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
       
      {/* header */}
      <View
        style={{
          backgroundColor: '#62B1F4',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          height: 120,
        }}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/transparentLogo.png')}
            style={{
              height: 230,
              width: 230,
              top: -40,
              left: -20,
              position: 'absolute',
            }}
            resizeMode="stretch"
          />
        </View>
      </View>

      {/* content */}

      {/* video cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          //   marginTop: 20,
          marginHorizontal: 10,
        }}>
        {isLoading ? (
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
            }}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                height={200}
                width={350}
                borderRadius={30}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                marginLeft={5}
                height={30}
                width={340}
                borderRadius={30}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                marginLeft={5}
                height={20}
                width={300}
                borderRadius={30}
                marginBottom={20}
              />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                height={200}
                width={350}
                borderRadius={30}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                marginLeft={5}
                height={30}
                width={340}
                borderRadius={30}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                marginLeft={5}
                height={20}
                width={300}
                borderRadius={30}
                marginBottom={20}
              />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                height={200}
                width={350}
                borderRadius={30}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                marginLeft={5}
                height={30}
                width={340}
                borderRadius={30}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                marginLeft={5}
                height={20}
                width={300}
                borderRadius={30} 
                marginBottom={20}
              />
            </SkeletonPlaceholder>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
            }}>
            {videoData.map((item, index) => (
              <VideoCard item={item} key={index} />
            ))}
            <View style={{height: 50}} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    // marginHorizontal: 10,
    position: 'relative',
  },
});
