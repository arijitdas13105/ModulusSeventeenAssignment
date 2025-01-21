import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../utils/constant';
import {logout} from '../Redux/Slices/authSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const token = useSelector(state => state.auth.userToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const totalTasks = useSelector(state => state.tasks.totalTasks);
  const completedTaskcount = useSelector(
    state => state.tasks.completedTasksCount,
  );
  const pendingTaskcount = useSelector(state => state.tasks.pendingTasksCount);
  const completionRate = useSelector(state => state.tasks.completionRate);

  const fetchUserEmail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/userEmail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmail(response.data.email);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user email:', error.message);
      Alert.alert('Error', 'Failed to load profile details.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('Logout button clicked!');
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          navigation.replace('Login');
        },
      },
    ]);
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  const avatarLetter = email.charAt(0).toUpperCase();

  const menuItems = [
    {
      title: 'Tasks Overview',
      subtitle: 'View your task statistics',
      icon: '📊',
    },
    {title: 'Notifications', subtitle: 'Manage your alerts', icon: '🔔'},
    {title: 'Settings', subtitle: 'App preferences', icon: '⚙️'},
    {title: 'Help & Support', subtitle: 'Get assistance', icon: '💡'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.goBack}>
          <TouchableOpacity
            style={styles.goBackHolder}
            onPress={() => navigation.goBack()}>
            <FontAwesome name="long-arrow-left" size={40} color="black" />
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.email}>{email}</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalTasks}</Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statNumber}>{completionRate}%</Text>
          <Text style={styles.statLabel}>Completion</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pendingTaskcount}</Text>
          <Text style={styles.statLabel}>Pending Tasks</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    gap:10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
  },
  goBack: {
    display: 'flex',
    borderColor: 'black',
    padding: 10,
    alignItems: 'flex-start',
  },
  goBackHolder: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: '#6fd976',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingRight: 20,
    paddingLeft: 5,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: height * 0.02,
    padding: height * 0.02,
    backgroundColor: '#6C63FF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatarContainer: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarText: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  profileInfo: {
    marginLeft: width * 0.05,
    flex: 1,
  },
  welcomeText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: height * 0.01,
  },
  email: {
    fontSize: width * 0.04,
    color: '#E8E8FF',
    marginBottom: height * 0.01,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.04,
    borderRadius: 20,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#EEEEF6',
  },
  statNumber: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: height * 0.01,
  },
  statLabel: {
    fontSize: width * 0.04,
    color: '#9098B1',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.04,
    borderRadius: 20,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderRadius: 12,
  },
  menuIcon: {
    fontSize: width * 0.08,
    marginRight: width * 0.05,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#223263',
    marginBottom: height * 0.01,
  },
  menuSubtitle: {
    fontSize: width * 0.04,
    color: '#9098B1',
  },
  logoutButton: {
    backgroundColor: '#FF5C5C',
    marginHorizontal: width * 0.04,
    padding: width * 0.04,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF5C5C',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ProfileScreen;
