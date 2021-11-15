import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskExists = tasks.find(newTask => newTask.title === newTaskTitle);

    if(taskExists){

      return (

        Alert.alert(
          'Task já cadastrada',
          'Você não pode cadastrar uma task com o mesmo nome.'
        )

      )

    }

    const data = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }

   setTasks(oldTaskTitle => [...oldTaskTitle, data]);
    
  }

  function handleToggleTaskDone(id: number) {

    // Copiando as tasks e armazenando na variável
    const updatedTasks = tasks.map(task => ({ ...task }));

    // Encontrando o index da task que será alterada
    const indexTask = tasks.findIndex(oldTask => oldTask.id == id);    

    // Alterando o valor do atributo done da task 
    if(updatedTasks[indexTask].done == false){
      updatedTasks[indexTask].done = true;  

    } else {
      updatedTasks[indexTask].done = false;
    }

    // Alterando o estado 
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'Sim', onPress: () => setTasks(oldTasks => oldTasks.filter(
        tasks => tasks.id != id
        ))
        },
        {text: 'Não'}
      ]

    )

    
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})