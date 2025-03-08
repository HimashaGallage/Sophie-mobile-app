import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import * as Keychain from 'react-native-keychain';
import realm from '../../realm/realmConfig';
import { AppDispatch } from '../../redux/store';

type Props = {
  setIsLoading: (value: boolean) => void;
};

const SplashScreen = ({ setIsLoading }: Props) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get stored credentials from Keychain
        const credentials = await Keychain.getGenericPassword();
        
        if (credentials && credentials.username) {
          const userId = parseInt(credentials.username, 10);

          // Fetch user data from Realm safely
          const user = realm.objects('User').filtered(`id == $0`, userId)[0];

          if (user) {
            dispatch(setUser({
              id: Number(user.id),
              username: String(user.username),
              email: String(user.email || ''),
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        // Ensure loading is always stopped
        setIsLoading(false); 
      }
    };

    checkAuthStatus();
  }, [dispatch, setIsLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Sophie</Text>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.Colors.splash,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.Colors.white,
      fontFamily: theme.Fonts.bold,
    },
  });

export default SplashScreen;