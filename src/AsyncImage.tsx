import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';

const AsyncImage = ({ thumbnailSource, source, style }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const onImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <View>
      <Animated.View
        style={[
          {
            backgroundColor: '#e1e4e8',
            height: 60,
            width: 60,
            borderRadius: 60,
            opacity: isLoading ? 1 : 0,
          },
          style,
        ]}
      />

      <Animated.Image
        source={source}
        onLoad={onImageLoad}
        style={[
          {
            height: 60,
            width: 60,
            position: 'absolute',
            opacity: !isLoading ? 1 : 0,
            resizeMode: 'contain',
          },
          style,
        ]}
      />
    </View>
  );
};

export default AsyncImage;
