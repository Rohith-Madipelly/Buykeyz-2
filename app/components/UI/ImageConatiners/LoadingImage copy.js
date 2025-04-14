import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import SkeletonLoader2 from '../Loadings/SkeletonLoader2';

const LoadingImage = ({ source, style, loaderColor = '#0000ff', ...props }) => {
  const [loading, setLoading] = useState(true); // Start as loading
  const [imageUri, setImageUri] = useState(source);

  useEffect(() => {
    setImageUri(source);
    setLoading(true); // Trigger loading state on new source
  }, [source]);

  const handleImageLoadStart = () => setLoading(true);
  const handleImageLoadEnd = () => setLoading(false);
  const handleImageError = () => {
    setLoading(false);
    setImageUri(require('../../../assets/WarningError.png'));
  };

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <SkeletonLoader2 style={[StyleSheet.absoluteFill, { borderRadius: 5 }]} />
        // You can use ActivityIndicator if you want instead:
        // <ActivityIndicator style={styles.loader} size="large" color={loaderColor} />
      )}
      <Image
        source={imageUri}
        style={[styles.image, style]}
        onLoadStart={handleImageLoadStart}
        onLoadEnd={handleImageLoadEnd}
        onError={handleImageError}
        {...props}
      />
    </View>
  );
};

LoadingImage.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({ uri: PropTypes.string }),
    PropTypes.number, // Local image
  ]).isRequired,
  style: PropTypes.object,
  loaderColor: PropTypes.string,
};

export default LoadingImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loader: {
    position: 'absolute',
  },
});
