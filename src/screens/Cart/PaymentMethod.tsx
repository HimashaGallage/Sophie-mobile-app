import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import { checkout_screen } from '../../constants/strings';

interface PaymentMethodProps {
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    errors: {
        paymentMethod: string;
    };
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, setPaymentMethod, errors }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{checkout_screen.payment_method}</Text>
            <View style={styles.paymentOptions}>
                {['Card', 'PayPal', 'COD'].map(method => (
                    <Pressable
                        key={method}
                        style={[styles.option, paymentMethod === method && styles.selectedOption]}
                        onPress={() => setPaymentMethod(method)}
                    >
                        <MaterialIcons name={method === 'Card' ? 'credit-card' : method === 'PayPal' ? 'payment' : 'attach-money'} size={24} color="black" />
                        <Text style={styles.optionText}>{method}</Text>
                    </Pressable>
                ))}
            </View>
            {errors.paymentMethod ? <Text style={styles.errorText}>{errors.paymentMethod}</Text> : null}
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
    paymentOptions: {
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 5,
        backgroundColor: theme.Colors.white,
    },
    selectedOption: {
        backgroundColor: theme.Colors.secondary,
    },
    optionText: {
        fontSize: 14,
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default PaymentMethod;