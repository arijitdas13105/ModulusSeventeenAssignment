import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../Redux/Slices/authSlice';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useLogin } from '../Hooks/useLogin';

const LoginScreen = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  console.log('token', token);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const { loginUser, loading, error } = useLogin(); 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
   

    await loginUser(email, password); 

  };

  const handleGuestLogin = async () => {
    const guestEmail = 'guest@gmail.com';
    const guestPassword = '123';
  
    try {
      await loginUser(guestEmail, guestPassword);  
      Alert.alert('Guest Login', 'You have logged in as a guest!');
      navigation.navigate('Home');  
    } catch (error) {
      Alert.alert('Error', 'Failed to login as a guest. Please try again.');
      console.error('Guest login error:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Icon name="person-circle-outline" size={100} color="#4caf50" />

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>
          <Icon name="log-in-outline" size={18} color="#fff" /> Login
        </Text>
      </TouchableOpacity>

      {/* Guest Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, styles.guestButton]}
        onPress={handleGuestLogin}>
        <Text style={styles.loginButtonText}>
          <Icon name="person-outline" size={18} color="#fff" /> Guest Login
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <LoadingSpinner visible={loading} message="Logging in..." />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4caf50',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  guestButton: {
    backgroundColor: '#607d8b',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#777',
    fontSize: 14,
  },
  footerLink: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;
