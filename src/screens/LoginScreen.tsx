import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('signupScreen');
  };

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(username, password);
      navigation.navigate('getAStarted');
      console.log('User logged in!', userCredential);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.text}>Enter Your Credentials for Login</Text>
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/icons/profile.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={val => setUsername(val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/icons/lock.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={val => setPassword(val)}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.passwordToggle}>
          <Image
            source={
              passwordVisible
                ? require('../assets/icons/hidden.png')
                : require('../assets/icons/view.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.errorText}>{message}</Text> : null}

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>If you don't have an account, </Text>
        <TouchableOpacity onPress={handleNavigation}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#C67C4E',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  passwordToggle: {
    padding: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: '100%',
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(111, 78, 55)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  signupText: {
    fontSize: 16,
    color: '#000',
  },
  signupLink: {
    fontSize: 18,
    color: 'blue',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});
