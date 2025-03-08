import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { login } from '../../services/authService';
import { Navigation, LoginCredentials } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { AppDispatch} from '../../redux/store';
import { auth_flow } from '../../constants/strings';
import CustomLink from '../../components/CustomLink';
import CustomButton from '../../components/CustomButton';

type Props = {
  navigation: Navigation;
  setIsLoggedIn: (value: boolean) => void;
};

const LoginScreen = ({ navigation, setIsLoggedIn }: Props) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    try {
      const credentials: LoginCredentials = { username, password };
      // Await the login process
      const userData = await dispatch(login(credentials));
      setIsLoggedIn(true); // If login is successful
    } catch (error) {
      console.log('Login failed', 'Please check your credentials and try again.');
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleForgotPassword = () => {
    // TODO: Handle forgot password navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType='default'
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* First row with Forgot Password link */}
      <View style={styles.forgotPasswordContainer}>
        <CustomLink title={auth_flow.forgot_password} onPress={handleForgotPassword} />
      </View>

      {/* Button container for Sign in and Sign Up */}
      <View style={styles.buttonContainer}>
        <View style={styles.signInBtn}>
          <CustomButton title={auth_flow.login} onPress={handleLogin} />
        </View>
        <View style={styles.signUpBtn}>
          <Text style={styles.signUpLabel}>{auth_flow.no_account}</Text>
          <CustomLink title={auth_flow.signup} onPress={handleSignup} />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: theme.Colors.white,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: theme.Colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor:theme.Colors.input_grey,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signInBtn: {
    width: '100%',
    marginBottom: 10,
    alignSelf: 'auto',
  },
  signUpBtn: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpLabel: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
