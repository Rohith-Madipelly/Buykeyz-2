import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Platform } from 'react-native';
import PropTypes from 'prop-types';
import SkeletonLoader2 from '../Loadings/SkeletonLoader2';

const LoadingImage = ({ source, style, loaderColor = '#0000ff', ...props }) => {
  const [loading, setLoading] = useState(
    // Platform.OS!="ios"
  );
  // Handle source change (especially useful if source prop changes dynamically)
  const [imageUri, setImageUri] = useState(source);

  useEffect(() => {
    setImageUri(source)
  }, [source])

  // Image load events
  const handleImageLoadStart = () => setLoading(true);
  const handleImageLoadEnd = () => setLoading(false);
  const handleImageError = () => setImageUri(require('../../../assets/WarningError.png'));

  return (
    <View style={[styles.container, style]}>
      {loading && <SkeletonLoader2 style={{ width: "100%", height: '100%', borderRadius: 5 }} />
        // <ActivityIndicator style={styles.loader} size="large" color={loaderColor} />
      }
      <Image
        style={[styles.image, style]}
      source={source}
      // onLoadStart={handleImageLoadStart}
      // onLoadEnd={handleImageLoadEnd}
      onError={handleImageError} // Handle image error and fallback to default error image
      {...props}
      />
    </View>
  );
};

LoadingImage.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({ uri: PropTypes.string }),
    PropTypes.number, // For local images
  ]).isRequired,
  style: PropTypes.object,
  loaderColor: PropTypes.string, // Color for the loader
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
