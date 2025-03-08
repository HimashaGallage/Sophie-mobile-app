import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { checkout_screen } from '../../constants/strings';

interface ShippingOptionsProps {
    shippingOption: string;
    setShippingOption: (option: string) => void;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({ shippingOption, setShippingOption }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{checkout_screen.shipping_options}</Text>
            <Pressable style={styles.row} onPress={() => setShippingOption('standard')}>
                <View style={styles.radioButton}>
                    {shippingOption === 'standard' && <View style={styles.radioButtonSelected} />}
                </View>
                <View style={styles.shippingOption}>
                    <Text style={styles.shippingText}>Standard</Text>
                    <Text style={styles.shippingSubText}>5-7 days</Text>
                    <Text style={styles.shippingPrice}>FREE</Text>
                </View>
            </Pressable>
            <Pressable style={styles.row} onPress={() => setShippingOption('express')}>
                <View style={styles.radioButton}>
                    {shippingOption === 'express' && <View style={styles.radioButtonSelected} />}
                </View>
                <View style={styles.shippingOption}>
                    <Text style={styles.shippingText}>Express</Text>
                    <Text style={styles.shippingSubText}>1-2 days</Text>
                    <Text style={styles.shippingPrice}>$12.00</Text>
                </View>
            </Pressable>
            <Text style={styles.deliveryDate}>Delivered on or before Thursday, 23 April 2020</Text>
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: theme.Colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: theme.Colors.secondary,
    },
    shippingOption: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 8,
        paddingVertical: 8,
    },
    shippingText: {
        fontSize: 14,
    },
    shippingSubText: {
        fontSize: 14,
        color: theme.Colors.primary,
    },
    shippingPrice: {
        fontSize: 14,
        color: theme.Colors.primary,
    },
    deliveryDate: {
        fontSize: 14,
        color: theme.Colors.primary,
        marginTop: 8,
    },
});

export default ShippingOptions;