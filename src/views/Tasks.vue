<template>
  <div>
    <h1 class="page-title">Tasks</h1>
    <div v-if="loading" class="loading">Loading....</div>
    <div v-else class="kanban-board">
      <div class="columns">
        <div class="column" v-for="status in statuses" :key="status">
          <h2 class="column-title">{{ statusLabels[status] }}</h2>
          <draggable
            :list="tasksByStatus(status)"
            group="tasks"
            item-key="title"
            @change="({ added }) => handleTaskDrop(added, status)"
            class="task-list"
            :animation="200"
            ghost-class="ghost-card"
          >
            <template #item="{ element }">
              <div class="task-card" :style="{ backgroundColor: element.color }">
                {{ element.title }}
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!-- Task Details Modal -->
      <Teleport to="body">
        <div v-if="movedTask" class="modal" @click.self="closeModal">
          <ConfirmationDialogue :task="movedTask" @close="closeModal" />
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ConfirmationDialogue from '@/components/ConfirmationDialogue.vue'
import draggable from 'vuedraggable'

// Status setup
const statuses = ['to-do', 'in-progress', 'done']
const statusLabels = {
  'to-do': 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}
const movedTask = ref(null)
const loading = ref(false)

// Initial tasks
const tasks = ref([])

async function getTasks() {
  loading.value = true
  try {
    const response = await axios.get('https://q1z3telex7a9metry.denaliops.com/data.json')
    tasks.value = response.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching tasks:', error)
    loading.value = false
  }
}

onMounted(() => {
  getTasks()
})

// Method to return tasks by status
const tasksByStatus = (status) => tasks.value.filter((task) => task.status === status)

// Handle drop between columns
const handleTaskDrop = (added, newStatus) => {
  if (added && added.element) {
    added.element.status = newStatus
    console.log(movedTask.value)
    console.log(added.element)
    movedTask.value = added.element
  }
}

const closeModal = () => {
  movedTask.value = null
}
</script>

<style scoped>
.kanban-board {
  padding: 16px;
  min-height: 100vh;
  width: 100%;
}
.columns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
  height: calc(100vh - 100px);
}

.column {
  border: 4px solid var(--text-color);
  padding: 36px 48px;
  width: 400px;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
}

.column-title {
  margin-bottom: 15px;
  color: #495057;
  font-size: 24px;
  font-weight: 500;
  padding-left: 10px;
}
.task-list {
  min-height: 100px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  transition: background-color 0.3s;
}

@media (max-width: 1280px) {
}
.task-card {
  padding: 0 24px;
  height: 80px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: lighter;
  border-radius: 6px;
  align-items: center;
  place-content: center;
  cursor: pointer;
  border: 2px solid var(--text-color);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.task-card:hover {
  box-shadow: 0 0 4px 1px rgba(40, 38, 32, 0.36);
}
.task-card h3 {
  font-size: 16px;
  font-weight: lighter;
  color: #212529;
  text-transform: uppercase;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.ghost-card {
  opacity: 0.5;
  background: #f8f9fa;
  border: 2px dashed #adb5bd;
}

@media (max-width: 1280px) {
  .columns {
    height: auto;
  }
  .column {
    width: 100%;
  }
  .task-list {
    flex-direction: row;
  }

  .task-card {
    width: 148px;
    height: 160px;
    padding: 16px 12px;
    text-align: start;
    font-size: 14px;
  }
}

.loading {
  padding: 20px;
  font-size: larger;
}
</style>
