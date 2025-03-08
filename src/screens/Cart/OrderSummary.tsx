import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { checkout_screen } from '../../constants/strings';

interface OrderSummaryProps {
    totalCost: string;
    shippingFee: string;
    shippingGuarantee: number;
    orderTotal: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalCost, shippingFee, shippingGuarantee, orderTotal }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{checkout_screen.order_summary}</Text>
            <View style={styles.row}>
                <Text style={[styles.text, styles.leftAlign]}>
                    {checkout_screen.retail_price}
                </Text>
                <Text style={[styles.amount, styles.rightAlign]}>
                    ${totalCost}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.leftAlign]}>
                    {checkout_screen.shipping_fee}
                </Text>
                <Text style={[styles.amount, styles.rightAlign]}>
                    ${shippingFee}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.leftAlign]}>
                    {checkout_screen.shipping_guarantee}
                </Text>
                <Text style={[styles.amount, styles.rightAlign]}>
                    ${shippingGuarantee.toFixed(2)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.totalText, styles.leftAlign]}>
                    {checkout_screen.order_total}
                </Text>
                <Text style={[styles.totalAmount, styles.rightAlign]}>
                    ${orderTotal}
                </Text>
            </View>
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
    text: {
        fontSize: 18,
        marginVertical: 8,
        color: theme.Colors.primary,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        color: theme.Colors.primary,
    },
    amount: {
        fontWeight: 'bold',
        color: theme.Colors.secondary,
    },
    totalAmount: {
        fontWeight: 'bold',
        color: theme.Colors.secondary,
    },
    leftAlign: {
        textAlign: 'left',
    },
    rightAlign: {
        textAlign: 'right',
    },
});

export default OrderSummary;