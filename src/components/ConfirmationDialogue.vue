<template>
  <div class="modal-content">
    <div class="modal-header">
      <p>Card updated</p>
    </div>
    <div class="modal-body">
      <pre class="modal-json">{{ task }}</pre>
    </div>
    <div class="modal-footer">
      <button class="close-btn" @click="closeModal">CLOSE</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}
</script>
<style scoped>
.modal-content {
  border-radius: 8px;
  width: 580px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-json {
  font-weight: lighter;
  font-size: 20px;
}
.modal-header {
  display: flex;
  border-radius: 4px 4px 0 0;
  background-color: var(--lapis-color);
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 16px 24px;
}
.modal p {
  padding: 25px;
  color: white;
  text-transform: uppercase;
}
.modal-body {
  padding: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #dee2e6;
  gap: 10px;
  margin-top: 20px;
  padding: 10px 24px;
}
.close-btn {
  padding: 8px 8px;
  background-color: transparent;
  color: var(--lapis-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
</style>
