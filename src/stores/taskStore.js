import { defineStore } from 'pinia'
import { updateTask, addTask, updateCheckbox, deleteTask } from "@/App.vue"

export const useTaskStore = defineStore('taskStore', {
  // Data
  state: () => ({
    tasks: [],
    editId: "",
    editName: "",
    editDescription: "",
    editCompleted: false,

    taskNbr: 0,
    nbrInfo: "",

    errorInfo:""
  }),
  actions: {
    //
    // initialise data
    //
    setTasks(newTasks) {
      this.tasks = newTasks
      for (const task of this.tasks) {
        if (task.completed)
          this.taskNbr--
      }
      this.updateNbrInfo()
    },
    //
    // Update TaskStore for edit or add view
    //
    updateEditTask(task) {
      this.editId = task.id
      this.editName = task.name
      this.editDescription = task.description
    },

    //
    // Update Task with editData in TaskStore and firebase
    //
    updateTask() {
      // Update TaskStore
      const id = this.tasks.findIndex(task => task.id == this.editId)
      this.tasks[id].name = this.editName
      this.tasks[id].description = this.editDescription
      this.tasks[id].completed = this.editCompleted

      // Update firebase db
      updateTask(this.tasks[id])
    },

    updateCheckbox(task) {
      if (!task.completed)
        this.taskNbr--
      else
        this.taskNbr++
      this.updateNbrInfo()
      updateCheckbox(task)
    },

    //
    // Add task in TaskStore and firebase db
    //
    addTask() {
      // Prepare data
      const task = {
        id: this.editId,
        name: this.editName,
        description: this.editDescription,
        completed: false
      }

      // Add TaskStore
      this.tasks.push(task)

      // Add firebase db
      addTask(task)
    },

    //
    // Get the task with id pass in parameteres
    //
    getTaskById(id) {
      return this.tasks.find(task => task.id == id)
    },

    deleteTask(taskId) {
      if (confirm("Etes-vous sûr de vouloir supprimer cette tâche ?")) {
        deleteTask(taskId)
      }
    },

    updateNbrInfo() {
      this.nbrInfo = this.taskNbr > 1 ? `Il vous reste ${this.taskNbr} tâches !` : `Il vous reste ${this.taskNbr} tâche !`
    }
  }
});