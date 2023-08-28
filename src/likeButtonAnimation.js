import {View, StyleSheet, Pressable, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function LikeButtonAnimation() {
  const scaleOutline = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const [liked, setLiked] = useState(false);
  const likeOnPress = () => {
    Animated.sequence([
      Animated.spring(scaleOutline, {
        toValue: 1.3,
        useNativeDriver: true,
        delay: 0,
        speed: 100,
      }),
      Animated.spring(scaleOutline, {toValue: 1, useNativeDriver: true, delay: 0}),
    ]).start();
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.3,
        useNativeDriver: true,
        delay: 0,
        speed: !liked ? 1000 : 100,
      }),
      Animated.spring(scale, {
        toValue: !liked ? 1 : 0,
        useNativeDriver: true,
        delay: 0,
      }),
    ]).start();
    setLiked(prev => !prev);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={likeOnPress}>
        <Animated.View style={[{transform: [{scale: scaleOutline}]}]}>
          <Ionicons name={'heart-outline'} size={100} style={{color: 'grey'}} />
        </Animated.View>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {transform: [{scale: scale}]},
          ]}>
          <Ionicons name={'heart'} size={100} style={{color: '#27b899'}} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
