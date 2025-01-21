import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import UserIcon from 'react-native-vector-icons/FontAwesome';
import PlusIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const HeaderNav = () => {
  const navigation =useNavigation()
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  const ProfileClicked=()=>{
    if(!isAuthenticated){
      Alert.alert('Please Login First');
      navigation.navigate('Login');
    }
    else{
      navigation.navigate('Profile');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>My Tasks</Text>
      <View style={styles.headAction}>
        <PlusIcon name="add-circle-sharp" size={40} color="red" onPress={() =>navigation.navigate('AddTask')} />
        <UserIcon name="user-secret" size={40} color="black" onPress={()=>ProfileClicked()} />
      </View>
    </View>
  )
}

export default HeaderNav

const styles=StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headAction:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20
  }
})