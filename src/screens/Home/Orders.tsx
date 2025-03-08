import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import { home_screen, HomeScreenKeys } from '../../constants/strings';

const orderButtons = [
    { text: 'To Pay', action: 'to_pay', icon: 'payment' },
    { text: 'To Receive', action: 'to_receive', icon: 'local-shipping' },
    { text: 'To Review', action: 'to_review', icon: 'rate-review' },
];

const Orders: React.FC = () => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const handleOrderButtonPress = () => {
        // TODO: Handle the order button press
    };

    return (
        <View style={styles.orders}>
            {orderButtons.map((button, index) => (
                <Pressable
                    key={index}
                    style={styles.orderButton}
                    onPress={handleOrderButtonPress}
                >
                    <MaterialIcons name={button.icon} size={20} color={theme.Colors.white} />
                    <Text style={styles.orderButtonText}>
                        {home_screen[button.action as HomeScreenKeys]}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    orders: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-evenly',
    },
    orderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        shadowColor: theme.Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    orderButtonText: {
        color: theme.Colors.white,
        marginLeft: 8
    },
});

export default Orders;