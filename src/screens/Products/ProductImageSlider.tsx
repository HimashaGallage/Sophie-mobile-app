import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useTheme } from '../../context/ThemeContext';

interface ProductImageSliderProps {
    images: string[];
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <Swiper style={styles.wrapper} activeDotColor={theme.Colors.primary}>
            {images.map((image, index) => (
                <View key={index} style={styles.slide}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
            ))}
        </Swiper>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    wrapper: {
        height: 150,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
});

export default ProductImageSlider;