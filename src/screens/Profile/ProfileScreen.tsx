import React from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, Pressable, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { AppDispatch } from '../../redux/store';
import authThunk from '../../redux/thunks/authThunk';
import { resetProductsState } from '../../redux/slices/productsSlice';
import profilePicture from '../../assets/images/portrait.jpg';

const dummyUser = {
  name: 'Romina Edwards',
  email: 'RominaEdwards@example.com',
  profilePicture: profilePicture,
};

const settingsOptions = [
  { id: '1', title: 'About' },
  { id: '2', title: 'Privacy Policy' },
  { id: '3', title: 'Terms and Conditions' },
  { id: '4', title: 'Settings' },
];

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const dispatch = useDispatch<AppDispatch>();

  const handleOptionPress = (option: string) => {
    // TODO: Here you can navigate to the respective screen or perform an action
  };

  const onPressLogout = () => {
    dispatch(resetProductsState());
    dispatch(authThunk.logout());
  };

  const onPressUpdateProfile = () => {
    // TODO: handle update profile
  };

  return (
    <View style={styles.container}>
      {dummyUser.profilePicture && (
        <Image source={dummyUser.profilePicture} style={styles.profilePicture} />
      )}
      <View style={styles.userContent}>
        <Text style={styles.name}>{dummyUser.name}</Text>
        <Text style={styles.email}>{dummyUser.email}</Text>
        <Pressable style={styles.updateProfileButton} onPress={onPressUpdateProfile}>
          <Text style={styles.updateProfileButtonText}>Update Profile</Text>
        </Pressable>
        <Pressable style={styles.logoutButton} onPress={onPressLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
      </View>

      <Text style={styles.settingsHeader}>Settings</Text>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.option} onPress={() => handleOptionPress(item.title)}>
            <Text style={styles.optionText}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 100,
    backgroundColor: theme.Colors.white,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignSelf: 'center',
  },
  userContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.Colors.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: theme.Colors.secondary,
    marginBottom: 16,
  },
  updateProfileButton: {
    backgroundColor: theme.Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  updateProfileButtonText: {
    color: theme.Colors.white,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: theme.Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: theme.Colors.white,
    fontWeight: 'bold',
  },
  settingsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: theme.Colors.primary,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: theme.Colors.primary,
  },
});

export default ProfileScreen;