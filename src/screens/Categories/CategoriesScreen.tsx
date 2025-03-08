import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const CategoriesScreen: React.FC = () => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <MaterialIcons name="warning" size={24} color={'black'} style={styles.icon} />
                <Text style={styles.bannerText}>Page Under Construction</Text>
            </View>
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.Colors.white,
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#EED202',
        borderRadius: 8,
        shadowColor: theme.Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 8,
    },
    bannerText: {
        fontSize: 14,
        color: theme.Colors.black,
        textAlign: 'center',
    },
});

export default CategoriesScreen;