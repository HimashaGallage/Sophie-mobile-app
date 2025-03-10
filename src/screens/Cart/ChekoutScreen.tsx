import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import cartThunk from '../../redux/thunks/cartThunk';
import { Navigation } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../../components/CustomAlert';
import OrderSummary from './OrderSummary';
import ShippingDetails from './ShippingDetails';
import ShippingOptions from './ShippingOptions';
import PaymentMethod from './PaymentMethod';
import { checkout_screen } from '../../constants/strings';

interface Props {
    navigation: Navigation;
};

interface CheckoutRouteParams {
    totalCost: string;
}

const CheckoutScreen = ({ navigation }: Props) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const route = useRoute();
    const dispatch = useDispatch<AppDispatch>();
    const { totalCost } = route.params as CheckoutRouteParams;

    const userId = useSelector((state: RootState) => state.auth.user?.id);

    const retailPriceNumber = parseFloat(totalCost);
    const shippingFee = (retailPriceNumber * 0.1).toFixed(2);
    const shippingGuarantee = 0.99;
    const orderTotal = (retailPriceNumber + parseFloat(shippingFee) + shippingGuarantee).toFixed(2);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [shippingOption, setShippingOption] = useState('standard');
    const [errors, setErrors] = useState({
        name: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: '',
    });

    const [showAlert, setShowAlert] = useState(false);

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { name: '', address: '', city: '', zipCode: '', paymentMethod: '' };

        if (!name.trim()) {
            formIsValid = false;
            newErrors.name = 'Name is required.';
        }

        if (!address.trim()) {
            formIsValid = false;
            newErrors.address = 'Address is required.';
        }

        if (!city.trim()) {
            formIsValid = false;
            newErrors.city = 'City is required.';
        }

        if (!zipCode.trim() || isNaN(Number(zipCode)) || zipCode.length < 5) {
            formIsValid = false;
            newErrors.zipCode = 'Please enter a valid zip code (at least 5 digits).';
        }

        if (!paymentMethod) {
            formIsValid = false;
            newErrors.paymentMethod = 'Please select a payment method.';
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleConfirmOrder = () => {
        if (!validateForm()) {
            return;
        }

        if (userId) {
            dispatch(cartThunk.clearCart(userId));
            setShowAlert(true);
            return;
        }

        setShowAlert(true);
    };

    const isFormValid = () => {
        return name.trim() && address.trim() && city.trim() && zipCode.trim() && paymentMethod;
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <OrderSummary
                    totalCost={totalCost}
                    shippingFee={shippingFee}
                    shippingGuarantee={shippingGuarantee}
                    orderTotal={orderTotal}
                />
                <ShippingDetails
                    name={name}
                    setName={setName}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                    errors={errors}
                />
                <ShippingOptions
                    shippingOption={shippingOption}
                    setShippingOption={setShippingOption}
                />
                <PaymentMethod
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    errors={errors}
                />
            </ScrollView>
            <Pressable
                style={[styles.confirmButton, !isFormValid() && styles.confirmButtonDisabled]}
                onPress={handleConfirmOrder}
                disabled={!isFormValid()}>
                <Text style={styles.confirmButtonText}>{checkout_screen.confirm_order}</Text>
            </Pressable>
            {showAlert && (
                <CustomAlert
                    title="Order Confirmed"
                    message={`Thank you, ${name}! Your order has been placed successfully with ${paymentMethod} payment.`}
                    onPressOk={() => {
                        setName('');
                        setAddress('');
                        setCity('');
                        setZipCode('');
                        setPaymentMethod('');
                        navigation.navigate('Home');
                        setShowAlert(false);
                    }}
                />
            )}
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.Colors.white,
    },
    scrollViewContent: {
        padding: 16,
        paddingBottom: 80,
    },
    confirmButton: {
        backgroundColor: theme.Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30, 
        borderRadius: 30, 
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        height: 40, 
    },
    confirmButtonDisabled: {
        backgroundColor: theme.Colors.disabled,
    },
    confirmButtonText: {
        color: theme.Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default CheckoutScreen;