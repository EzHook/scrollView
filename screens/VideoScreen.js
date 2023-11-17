import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import doge from '../assets/doge.mp4';
import VideoCard from '../components/VideoCard';
import RBSheet from 'react-native-raw-bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import convertToProxyURL from 'react-native-video-cache';

const VideoScreen = ({navigation}) => {
  const route = useRoute();
  const {videoUrl, thumbnail, id, title, views, uploadTime, subscriber, description} = route.params;
  const descriptionRef = useRef();
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    const getVideos = async () => {
      const videos = await firestore().collection('videos').get();
      console.log(videos);
      setVideoData(videos.docs);
      // setTimeout(()=>setIsLoading(false),1000);
      setIsLoading(false);
    };
    getVideos();
  }, []);

  const abbreviateNumber = number => {
    if (number >= 1e6) {
      // Convert to millions (M)
      return (number / 1e6).toFixed(1) + 'M';
    } else if (number >= 1e3) {
      // Convert to thousands (k)
      return (number / 1e3).toFixed(1) + 'k';
    } else {
      return number.toString();
    }
  };

  const filteredData = videoData.filter(
    item => item._data.id !== id,
  );

  return (
    <>
     <StatusBar backgroundColor='black' />
      <View style={{flex: 1, backgroundColor: '#fff', marginTop:40}}>
        <Video
          source={{uri:videoUrl}}
          style={{
            //   position: 'absolute',
            //   top: '10%',
            //   right: '2%',
            width: '100%',
            height: 250,
            position: 'relative',
          }}
          repeat={true}
          controls={true}
          poster={thumbnail}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: '4%',
          }}>
          <Image
            source={require('../assets/back.png')}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
        {/* video descrip */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 15,
            borderBottomWidth: 1,
            paddingBottom: 15,
            borderColor: '#F2F2F2',
          }}>
          <TouchableOpacity
            onPress={() => descriptionRef.current.open()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.heading}>{title}</Text>
            <Image
              source={require('../assets/downChev.png')}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
              }}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.subText}>{views}</Text>
            <Text style={styles.subText}>{uploadTime}</Text>
          </View>
        </View>
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
              {filteredData.map((item, index) => (
                <VideoCard item={item} key={index} />
              ))}
              <View style={{height: 30}} />
            </View>
          )}
        </ScrollView>
        <RBSheet
          ref={descriptionRef}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={540}
          customStyles={{
            wrapper: {
              // Add any wrapper styles here
            },
            draggableIcon: {
              backgroundColor: '#7F7F7F',
            },
            container: {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              // Add any container styles here
            },
          }}>
          <View
            style={{
              marginHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                borderBottomWidth: 1,
                paddingBottom: 20,
                borderColor: '#F2F2F2',
              }}>
              <Text style={styles.headingD}>Description</Text>
              <TouchableOpacity onPress={() => descriptionRef.current.close()}>
                <Image
                  source={require('../assets/close.png')}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* title & content */}
            <Text style={[styles.headingD, {marginTop: 10}]}>
              {title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headingRB}>
                  {abbreviateNumber(views)}
                </Text>
                <Text style={styles.rbTitle}>Views</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headingRB}>
                  {abbreviateNumber(subscriber)}
                </Text>
                <Text style={styles.rbTitle}>subscribers</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headingRB}>{uploadTime}</Text>
                <Text style={styles.rbTitle}>Upload Date</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.description}>{description}</Text>
            </ScrollView>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F0F0F',
    width: 300,
  },
  subText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F7F7F',
    marginRight: 20,
  },
  headingD: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F0F0F',
    width: 300,
  },
  headingRB: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F0F0F',
  },
  rbTitle: {
    fontSize: 12,
    color: '#7F7F7F',
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    color: '#0F0F0F',
  },
});
