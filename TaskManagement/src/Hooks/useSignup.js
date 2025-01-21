
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../utils/constant';
import { login } from '../Redux/Slices/authSlice';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); 
  const navigation = useNavigation(); 

  const signupUser = async (email, password) => {
    setLoading(true);
    setError(null); 

    try {
      const response = await axios.post(`${BASE_URL}/user/register`, {
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Signup Successful', `Account created for ${email}!`);
        dispatch(login(response?.data?.userToken));  
        navigation.navigate('Login');  
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      setError(error.message || 'Something went wrong');
      Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { signupUser, loading, error };
};
