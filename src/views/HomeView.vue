<script setup>
//#region Refences
import { useTaskStore } from '@/stores/taskStore.js';
import { v4 as uuidv4 } from 'uuid';
//#endregion

//#region Properties
const taskStore = useTaskStore();
taskStore.errorMessage = ""
const emptyTask = {
  id: uuidv4(),
  date: "",
  name: "",
  description: "",
  completed: false
}
//#endregion
</script>

<template>
  <div class="header">
    <h2>Liste des tâches</h2>
    <p>{{ taskStore.errorInfo }}</p>
  </div>
  <div class="nbr-info">
    <p>{{ taskStore.nbrInfo }}</p>
    <RouterLink to="/add"><button class="btn" v-on:click="taskStore.updateEditTask(emptyTask)">Nouvelle tâche</button>
    </RouterLink>
  </div>
  <div class="tasks">
    <div class="task" v-bind:class="{
      taskcompleted: task.completed,
      span2: task.span ==2,
      span3: task.span ==3,
      span4: task.span ==4,
      span5: task.span ==5,
    }" v-for="task in taskStore.tasks">
      <div class="task-header">
        <div>
          <input type="checkbox" v-model="task.completed" v-on:click="taskStore.updateCheckbox(task)">
          <span v-bind:class="{ completed: task.completed }">{{ task.name }}</span>
        </div>
        <div>
          <RouterLink v-bind:class="{ hidden: task.completed }" to="/edit"><button class="icon"
              v-on:click="taskStore.updateEditTask(task)">
              <img src="../assets/icons/edit.svg" width="15" alt="edit icon">
            </button>
          </RouterLink>
          <button class="icon" v-on:click="taskStore.deleteTask(task.id)">
            <img src="../assets/icons/delete.svg" width="15" alt="delete icon">
          </button>
        </div>
      </div>
      <div class="task-footer">
        <span v-bind:class="{ completed: task.completed }"> {{ task.description }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding-top: 5px;
  text-align: center;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.completed {
  text-decoration: line-through;
}

.hidden {
  display: none;
}

.taskcompleted {
  background-color: rgb(7, 7, 7);
}

.nbr-info {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

p {
  text-align: left;
  font-size: 1rem;
  padding: 10px;
}

.span2{
  grid-row: span 2;
}
.span3{
  grid-row: span 3;
}
.span4{
  grid-row: span 4;
}
.span5{
  grid-row: span 5;
}
</style>
