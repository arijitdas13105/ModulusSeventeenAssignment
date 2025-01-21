
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../utils/constant';
import { login } from '../Redux/Slices/authSlice';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();  
  const navigation = useNavigation();  

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null); // Reset previous error

    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Login Successful', `Welcome back, ${email}!`);
        dispatch(login(response?.data?.userToken));  
        navigation.navigate('Home');  
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError(error.message || 'Something went wrong');
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
