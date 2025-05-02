<template>
  <div class="kanban-board">
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
            <div
              class="task-card"
              :style="{ backgroundColor: element.color }"
              @click="openTaskDetails(element)"
            >
              {{ element.title }}
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <!-- Task Details Modal -->
    <div v-if="selectedTask" class="modal" @click.self="closeModal">
      <div class="modal-content" :style="{ backgroundColor: selectedTask.color }">
        <h2>Edit Task</h2>
        <div class="modal-body">body</div>
        <div class="modal-footer">
          <button @click="saveTask" class="save-btn">Save</button>
          <button @click="closeModal" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

// Status setup
const statuses = ['to-do', 'in-progress', 'done']
const statusLabels = {
  'to-do': 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}

// Initial tasks
const tasks = ref([
  { title: 'Stay hungry, stay foolish.', color: '#A8DADC', status: 'to-do' },
  { title: 'Simplicity is the ultimate sophistication.', color: '#F1FAEE', status: 'in-progress' },
  { title: 'The only way out is through.', color: '#FFDDD2', status: 'to-do' },
  { title: 'What we think, we become.', color: '#CDB4DB', status: 'done' },
  { title: 'Dream big. Dare bigger.', color: '#F1FAEE', status: 'in-progress' },
  { title: 'Everything you can imagine is real.', color: '#A8DADC', status: 'to-do' },
  { title: 'Do one thing every day that scares you.', color: '#FFDDD2', status: 'done' },
  {
    title: 'Act as if what you do makes a difference. It does.',
    color: '#CDB4DB',
    status: 'in-progress',
  },
  { title: 'Be yourself; everyone else is already taken.', color: '#F1FAEE', status: 'to-do' },
  { title: 'Turn your wounds into wisdom.', color: '#A8DADC', status: 'in-progress' },
])

// Method to return tasks by status
const tasksByStatus = (status) => tasks.value.filter((task) => task.status === status)

// Handle drop between columns
const handleTaskDrop = (added, newStatus) => {
  if (added && added.element) {
    added.element.status = newStatus
    console.log('Task moved:', added)
  }
}

// Task editing
const selectedTask = ref(null)
const originalTask = ref(null)

const openTaskDetails = (task) => {
  selectedTask.value = { ...task }
  originalTask.value = task
}

const closeModal = () => {
  selectedTask.value = null
  originalTask.value = null
}

const saveTask = () => {
  if (originalTask.value) {
    Object.assign(originalTask.value, selectedTask.value)
  }
  closeModal()
}
</script>

<style scoped>
.kanban-board {
  padding: 20px;
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
  border: 4px solid #28262c;
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
  border: 2px solid #28262c;
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
.modal-content {
  padding: 25px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.modal h2 {
  margin-top: 0;
  color: #212529;
}
.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
.save-btn {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.save-btn:hover {
  background-color: #218838;
}
.cancel-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.cancel-btn:hover {
  background-color: #c82333;
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
</style>
