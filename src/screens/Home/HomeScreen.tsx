import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import profilePicture from '../../assets/images/portrait.jpg';
import { home_screen } from '../../constants/strings';
import Stories from './Stories';
import Orders from './Orders';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={profilePicture} style={styles.profileImage} />
          <Text style={styles.greeting}>{home_screen.hello_user}</Text>
        </View>
      </View>

      {/* Order status section */}
      <View style={styles.orders}>
        <Orders />
      </View>
      

      {/* Stories section */}
      <Stories />
    </ScrollView>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.white,
    padding: 16,
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
  },
  activityButton: {
    backgroundColor: theme.Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activityButtonText: {
    color: 'white',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 24,
  },
  orders: {
    marginVertical: 20
  }
});

export default HomeScreen;