import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { checkout_screen } from '../../constants/strings';

interface ShippingDetailsProps {
    name: string;
    setName: (name: string) => void;
    address: string;
    setAddress: (address: string) => void;
    city: string;
    setCity: (city: string) => void;
    zipCode: string;
    setZipCode: (zipCode: string) => void;
    errors: {
        name: string;
        address: string;
        city: string;
        zipCode: string;
    };
}

const ShippingDetails: React.FC<ShippingDetailsProps> = 
    ({ name, setName, address, setAddress, city, setCity, zipCode, setZipCode, errors }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{checkout_screen.shipping_details}</Text>
            <TextInput
                style={[styles.input, errors.name ? styles.errorInput : null]}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            <TextInput
                style={[styles.input, errors.address ? styles.errorInput : null]}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

            <TextInput
                style={[styles.input, errors.city ? styles.errorInput : null]}
                placeholder="City"
                value={city}
                onChangeText={setCity}
            />
            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}

            <TextInput
                style={[styles.input, errors.zipCode ? styles.errorInput : null]}
                placeholder="Zip Code"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="numeric"
            />
            {errors.zipCode ? <Text style={styles.errorText}>{errors.zipCode}</Text> : null}
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
    input: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        backgroundColor: theme.Colors.white,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default ShippingDetails;