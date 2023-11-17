import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: true,
    });

    fadeInAnimation.start(() => {
      navigateToHomeScreen();
    });

    return () => {
      // Clean up any animations or resources as needed.
      fadeInAnimation.stop();
    };
  }, [fadeAnim, navigation]);

  const navigateToHomeScreen = () => {
    navigation.replace('Home'); // Replace 'Home' with your actual screen name.
  };

  return (
    <>
    <StatusBar translucent backgroundColor='#62B1F4' />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#62B1F4' }}>
      <Animated.Image
        source={require('../assets/transparentLogo.png')} // Replace with the actual path to your logo
        style={{ width: 200, height: 200, opacity: fadeAnim }}
      />
    </View>
    </>
  );
};

export default SplashScreen;
