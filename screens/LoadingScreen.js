import {
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const LoadingScreen = ({navigation}) => {
  const route = useRoute();
  const {data} = route.params;
  setTimeout(() => {
    navigation.replace('Video', {
      id: data.id,
      videoUrl: data.videoUrl,
      thumbnail: data.thumbnailUrl,
      title: data.title,
      views: data.views,
      uploadTime: data.uploadTime,
      subscriber: data.subscriber,
      description: data.description,
    });
  }, 1000);
  return (
    <>
      <StatusBar translucent backgroundColor="#62B1F4" />
      <View style={styles.container}>
        <ActivityIndicator size={200} color="#FFFFFF" />
      </View>
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#62B1F4',
    alignItems: 'center',
  },
});
