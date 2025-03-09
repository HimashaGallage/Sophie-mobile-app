import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import { Navigation } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import CustomButton from '../../components/CustomButton';

type Props = {
  navigation: Navigation;
};

const SignupScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
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
          placeholder="Email"
          keyboardType='email-address'
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

      {/* Button container for Sign in and Sign Up */}
      <Pressable style={styles.signInBtn}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInBtnLable}>
          Already have an account
        </Text>
      </Pressable>

      <CustomButton title={'Sign Up'} onPress={handleSignup} />
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
    borderColor: theme.Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  form: {
    width: '100%',
    backgroundColor: '#eee',
    padding: 20,
    flex: 1,
  },
  signInBtn: {
    alignSelf: 'flex-end',
    marginVertical: 10
  },
  signInBtnLable: {
    color: theme.Colors.primary,
    textDecorationColor: theme.Colors.primary,
  }
});

export default SignupScreen;