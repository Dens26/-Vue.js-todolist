<script setup>
//#region References
import { useTaskStore } from '@/stores/taskStore.js'
import { router } from '@/router/index.js';
//#endregion

//#region Properties
const taskStore = useTaskStore();
//#endregion
const handleSubmit = () => {
    // Ajoutez ici la logique de validation supplémentaire si nécessaire
    if (validateForm()) {
        taskStore.addTask();
        router.push('/');
    }
}

const validateForm = () => {
    if (!taskStore.editDescription || !taskStore.editName)
        return false
    return true;
}
</script>

<template>
  <h2>Modifier la tâche</h2>
  <form class="form" action="/" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Nom de la tâche</label>
      <input class="input" type="text" id="name" placeholder="Nom de la tâche" v-model="taskStore.editName" required>
    </div>
    <div class="form-group">
      <label for="description">Description de la tâche</label>
      <textarea name="description" id="description" cols="45" rows="5" placeholder="Description de la tâche"
        v-model="taskStore.editDescription" required></textarea>
    </div>
    <div class="form-button">
      <button type="submit" class="btn">Modifier</button>
      <RouterLink to="/"><button class="btn">Annuler</button></RouterLink>
    </div>
  </form>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>