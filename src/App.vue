<script setup>
//#region References
import { db } from "@/firebase/index.js"
import { useTaskStore } from '@/stores/taskStore.js';
import { onMounted, ref } from 'vue';
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import router from "./router";
//#endregion

//#region Properties
const taskStore = useTaskStore();
//#endregion

//#region Methods
// init Function
onMounted(async () => {
  taskStore.errorInfo = ""
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"))
    let task = {}
    let taskArray = []
    querySnapshot.forEach((doc) => {
      task = {
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        completed: doc.data().completed,
        span: parseInt(doc.data().description.length / 130) + 1
      }
      taskArray.push(task)
    })
    taskStore.taskNbr = taskArray.length
    taskStore.setTasks(taskArray)
  }
  catch (error) {
    taskStore.errorInfo = ` Erreur lors du chargement des données :  ${error} !`
  }
})

//#endregion
</script>

<script>
export async function updateTask(task) {
  try {
    const taskRef = doc(db, "tasks", task.id)
    await updateDoc(taskRef, {
      name: task.name,
      description: task.description,
      completed: task.completed
    })
  }
  catch (error) {
    console.log(error)
  }
}
export async function updateCheckbox(task) {
  try {
    const taskRef = doc(db, "tasks", task.id)
    await updateDoc(taskRef, {
      completed: !task.completed
    })
  }
  catch (error) {
    console.log(error)
  }
}
export async function addTask(task) {
  try {
    await setDoc(doc(db, "tasks", task.id), {
      name: task.name,
      description: task.description,
      completed: task.completed
    })
  }
  catch (error) {
    console.log(error)
  }
}
export async function deleteTask(id) {
  try {
    await deleteDoc(doc(db, "tasks", id))
    location.reload()
  }
  catch (error) {
    console.log(error)
  }
}

window.onpopstate = function (event) {
  window.history.replaceState(null,"", "/")
  router.push("/")
}
</script>

<template>
  <header>
    <h1>Gestionnaire de tâches</h1>
  </header>
  <RouterView />
</template>

<style scoped>
h1 {
  text-align: center;
}

p {
  padding: 10px;
}
</style>