import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../utils/constant';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { useCreateTask } from '../Hooks/useCreateTask';

const {width, height} = Dimensions.get('window');  

const AddTask = () => {
  const {createTask, loading, error}=useCreateTask()
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = useSelector(state => state.auth.userToken);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Select an Option');
  const options = ['High', 'Medium', 'Low'];

  const handleSelectValue = option => {
    setSelectedValue(option);
    setIsDropdownOpen(false);
  };

  const getPriorityColor = option => {
    switch (option) {
      case 'High':
        return '#FF4B4B';
      case 'Medium':
        return '#FFA500';
      case 'Low':
        return '#4CAF50';
      default:
        return '#808080';
    }
  };

  const handleSave = async () => {
    const taskData = {
      title,
      description,
      priority: selectedValue,
      deadLine: date.toISOString(),
      status: 'Pending',
      dateTime: new Date().toISOString(),
    };

    await createTask(taskData, token);  
    if (  !error) {
      navigation.navigate('Home'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goBack}>
        <TouchableOpacity
          style={styles.goBackHolder}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="long-arrow-left" size={40} color="black" />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputHolder}>
        <View>
          <Text style={styles.textH}>Title</Text>
          <TextInput
            type="text"
            placeholder="Enter title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View>
          <Text style={styles.textH}>Description</Text>
          <TextInput
            type="text"
            placeholder="Enter description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View>
          <Text style={styles.textH}>Priority</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Text
              style={[{color: getPriorityColor(selectedValue)}, {fontWeight: 'bold', fontSize: 20}]}>
              {selectedValue}
            </Text>
            {isDropdownOpen && (
              <View style={styles.dropdownOptions}>
                {options.map((option, i) => {
                  return (
                    <TouchableOpacity
                      style={[styles.option, {backgroundColor: getPriorityColor(option)}]}
                      key={i}
                      onPress={() => handleSelectValue(option)}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textH}>Deadline</Text>

          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={showDatepicker}>
              <View style={styles.pickerTextContainer}>
                <FontAwesome name="calendar" size={25} color="black" />
                <Text style={styles.pickerText}>Select Date</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={showTimepicker}>
              <View style={styles.pickerTextContainer}>
                <Ionicons name="timer-sharp" size={30} color="black" />
                <Text style={styles.pickerText}>Select Time</Text>
              </View>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onChange}
              style={styles.dateTimePicker}
            />
          )}
        </View>

        {date && (
          <View>
            <View style={styles.selectedTime_Date}>
              <Text style={styles.selectedTimeLabel}>🗓️Selected Date</Text>
              <Text style={styles.selectedTimeValue}>{date.toDateString()}</Text>
            </View>

            <View style={styles.selectedTime_Date}>
              <Text style={styles.selectedTimeLabel}>⌚Selected Time</Text>
              <Text style={styles.selectedTimeValue}>{date.toLocaleTimeString()}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.saveButton}>
        <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    flex: 1,
    backgroundColor: '#D2D7D3',
  },
  goBack: {
    alignItems: 'flex-start',
    padding: 10,
  },
  goBackHolder: {
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
  inputHolder: {
    borderColor: 'black',
    borderRadius: 10,
    flex: 7,
    padding: width * 0.05,
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
  },
  textH: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: width * 0.03,
    borderRadius: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: width * 0.03,
    borderRadius: 5,
  },
  dropdownOptions: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  pickerButton: {
    backgroundColor: '#4CAF50',
    padding: width * 0.05,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pickerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.05,
  },
  pickerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  dateTimePicker: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: width * 0.05,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.05,
  },
  selectedTime_Date: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedTimeLabel: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedTimeValue: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#4CAF50',
  },
});

