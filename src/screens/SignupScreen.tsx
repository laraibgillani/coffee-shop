import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        username,
        password,
      );
      navigation.navigate('getAStarted');
    } catch (err) {
      setMessage(err.message);
    }
  };
  const handleNavigation = () => {
    navigation.navigate('loginScreen');
  };

  return (
    <View style={styles.container}>
      <View
        style={{height: '30%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Welcome to Coffee Shop</Text>
        <Text style={styles.text}>Create a account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/icons/profile.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
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
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/icons/locked-padlock.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          value={confirmPassword}
          onChangeText={val => setConfirmPassword(val)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.errorText}>{message}</Text> : null}
      <View style={styles.loginContainer}>
              <Text style={styles.loginText}>If you have an account, </Text>
              <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

export default SignupScreen;

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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    fontSize: 18,
    color: 'blue',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});
