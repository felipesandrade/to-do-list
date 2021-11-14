import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

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

    setTasks(oldTasks => oldTasks.filter(
      tasks => tasks.id != id
    )); 
    
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