import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../utils/constant';
import axios from 'axios';
import {useSelector} from 'react-redux';
import useTasks from '../Hooks/useTasks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTaskDetails} from '../Hooks/useTaskDetails';

const TaskDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {taskId} = route.params;
  const token = useSelector(state => state.auth.userToken);

  const {tasks, fetchTasks} = useTasks();
  const {task, loading, fetchTaskDetails, deleteTask} = useTaskDetails(
    taskId,
    fetchTasks,
  );

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const getPriorityColor = priority => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#E50914';
      case 'medium':
        return '#E87C03';
      case 'low':
        return '#46D369';
      default:
        return '#6E6E6E';
    }
  };

  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#E50914';
      case 'in progress':
        return '#E87C03';
      case 'completed':
        return '#46D369';
      default:
        return '#6E6E6E';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.goBack}>
        <TouchableOpacity
          style={styles.goBackHolder}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="long-arrow-left" size={40} color="black" />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{task.title}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>
            {task.description || 'No description provided'}
          </Text>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.dateSection}>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.dateValue}>
              {new Date(task.dateTime).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.label}>Due</Text>
            <Text style={styles.dateValue}>
              {new Date(task.deadLine).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.badge,
              {backgroundColor: getPriorityColor(task.priority)},
            ]}>
            <Text style={styles.badgeText}>{task.priority}</Text>
          </View>
          <View
            style={[
              styles.badge,
              {backgroundColor: getStatusColor(task.status)},
            ]}>
            <Text style={styles.badgeText}>{task.status}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: deleteTask, style: 'destructive'},
            ],
            {cancelable: false},
          )
        }>
        <Text style={styles.deleteButtonText}>Delete Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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

  headerBackground: {
    backgroundColor: '#141414',
    paddingTop: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2A2A2A',
  },
  header: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  detailsContainer: {
    padding: 24,
    backgroundColor: '#141414',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    marginBottom: 28,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  dateSection: {
    flex: 1,
    marginRight: 20,
  },
  label: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '600',
  },
  value: {
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 26,
  },
  dateValue: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  badge: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginTop: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  deleteButton: {
    backgroundColor: '#E50914',
    paddingVertical: 18,
    borderRadius: 8,
    margin: 16,
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  errorText: {
    fontSize: 16,
    color: '#E50914',
    fontWeight: '600',
  },
});

export default TaskDetailsScreen;
