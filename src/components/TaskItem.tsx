import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import deleteIcon from '../assets/icons/delete/x.png';
import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
    id: number;
    title: string;
    done: boolean;
  }

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    
    // Estados
    const [isEditing, setIsEditing ] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    // Funções    
    function handleStartEditing() {
      setIsEditing(true);

    }

    function handleCancelEditing() {
      setTaskNewTitleValue(task.title);

      setIsEditing(false);

    }

    function handleSubmitEditing() {
      editTask(task.id, taskNewTitleValue);

      setIsEditing(false);

    }
    
    useEffect(() => {
      if (textInputRef.current) {
        if (isEditing) {
          textInputRef.current.focus();
        } else {
          textInputRef.current.blur();
        }
      }
    }, [isEditing])


    return(
        <>
            <View>
                <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
                >
                    <View 
                        testID={`marker-${index}`}
                        style={task.done == false ? styles.taskMarker : styles.taskMarkerDone}
                    >
                        { task.done  && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput 
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}    
                        style={task.done  == false ? styles.taskText : styles.taskTextDone}
                        ref={textInputRef}                        
                    />
                </TouchableOpacity>
            </View>
            <View
              style={styles.button}
            >
              
             { isEditing ? (
              <TouchableOpacity
                  testID={`trash-${index}`}
                  style={{ paddingHorizontal: 24 }}
                  onPress={() => handleCancelEditing()}
              >
                  <Image source={deleteIcon} />
              </TouchableOpacity>
             ) : (                         
              <TouchableOpacity
                  testID={`trash-${index}`}
                  style={{ paddingHorizontal: 24 }}
                  onPress={() => handleStartEditing()}
              >
                  <Image source={editIcon} />
              </TouchableOpacity>
             ) }

              <View style={styles.divisorIcon} />

              <TouchableOpacity
                  testID={`trash-${index}`}
                  style={{ paddingHorizontal: 24 }}
                  disabled={isEditing}
                  onPress={() => removeTask(task.id)}
              >
                 
                  <Image source={trashIcon} style={{ opacity: isEditing ? 0.2: 1 }} />
              </TouchableOpacity>
            </View>  
      </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 5,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    button: {
      flexDirection: 'row'
    },
    divisorIcon: {
      height: 24,
      width: 1,
      backgroundColor: '#C4C4C4',
    }
  })

