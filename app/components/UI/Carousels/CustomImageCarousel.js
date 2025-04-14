import React, { useRef, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Animated, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import SkeletonLoader2 from "../Loadings/SkeletonLoader2";

const CustomImageCarousel = ({
    width,
    height,
    bannersData = [],
    autoPlay = true,
    onPress,
    contentFit = "cover",
    imageStyling,
    scrollAnimationDuration,
    showIndicators = false,
    disabledonPress = false,
    maxHeight
}) => {
    const carouselData = bannersData.length > 0 ? bannersData : [];
    const filteredPictures = carouselData.filter(item => item !== null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const CarouselRef = useRef();

    const scrollToIndex = (index) => {
        if (CarouselRef.current) {
            CarouselRef.current.scrollTo({ index, animated: true });
        }
    };

    const Indicator = () => (
        <View style={styles.indicatorContainer}>
            {filteredPictures.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 1, 0.6],
                    extrapolate: 'clamp',
                });
                const bgColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ["#A9A8A8", "#4A3AFF", "#A9A8A8"],
                    extrapolate: 'clamp',
                });

                return (
                    <TouchableOpacity key={i} onPress={() => scrollToIndex(i)} activeOpacity={1}>
                        <Animated.View
                            style={[
                                styles.indicator,
                                { backgroundColor: bgColor, opacity, transform: [{ scale }], height: 5, width: 10 },
                            ]}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <View style={{ width, height: showIndicators ? height + 30 : height, maxHeight: maxHeight }}>
            {filteredPictures.length > 0 ? (
                <Carousel
                    loop
                    width={width}
                    height={height > maxHeight ? maxHeight : height}
                    autoPlay={autoPlay}
                    data={filteredPictures}
                    scrollAnimationDuration={scrollAnimationDuration || 2000}
                    onSnapToItem={(index) => scrollX.setValue(index * width)}
                    renderItem={({ item }) => {
                        const [loading, setLoading] = useState(true);
                        const imageSource = { uri: item?.picture || item };

                        return (
                            <TouchableOpacity
                                onPress={() => onPress?.(item)}
                                style={[styles.carouselItem, { width, height }]}
                                disabled={disabledonPress}
                                activeOpacity={0.9}
                            >
                                {loading && (
                                    <SkeletonLoader2 style={[styles.image, imageStyling]} />
                                )}
                                <Image
                                    source={imageSource}
                                    style={[
                                        styles.image,
                                        imageStyling,
                                        {
                                            position: loading ? 'absolute' : 'relative',
                                            opacity: loading ? 0 : 1,
                                        },
                                    ]}
                                    resizeMode={contentFit}
                                    onLoadStart={() => setLoading(true)}
                                    onLoadEnd={() => setLoading(false)}
                                />
                            </TouchableOpacity>
                        );
                    }}
                    ref={CarouselRef}
                />
            ) : (
                <View style={styles.skeletonContainer}>
                    <SkeletonLoader2 style={styles.skeletonLoader} />
                </View>
            )}

            {showIndicators && (
                <View style={styles.indicatorsWrapper}>
                    <Indicator />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    carouselItem: {
        padding: 15,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    indicatorContainer: {
        flexDirection: 'row',
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5,
    },
    skeletonContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        padding: 15,
    },
    skeletonLoader: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden'
    },
    indicatorsWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default React.memo(CustomImageCarousel);