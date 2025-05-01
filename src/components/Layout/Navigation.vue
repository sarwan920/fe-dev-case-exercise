<template>
  <div :class="['sidebar', { expanded: isExpanded }]">
    <div class="menu-toggle" @click="toggleSidebar">
      <IconMenu />
    </div>

    <router-link
      v-for="item in navItems"
      :key="item.name"
      :to="item.route"
      class="nav-item"
      :class="{ active: $route.path === item.route }"
    >
      <span class="icon-wrapper">
        <component :is="item.icon" class="icon" :class="{ active: $route.path === item.route }" />
      </span>
      <span class="link-text" v-if="isExpanded">{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconTasks from '../icons/IconTasks.vue'
import IconNotifications from '../icons/IconNotification.vue'
import IconSettings from '../icons/IconSetting.vue'
import IconMenu from '../icons/IconMenu.vue'

const isExpanded = ref(false)
const toggleSidebar = () => (isExpanded.value = !isExpanded.value)
type NavItem = {
  name: string
  route: string
  icon: typeof IconTasks | typeof IconNotifications | typeof IconSettings
}

const navItems: NavItem[] = [
  { name: 'Tasks', route: '/tasks', icon: IconTasks },
  { name: 'Notifications', route: '/notifications', icon: IconNotifications },
  { name: 'Settings', route: '/settings', icon: IconSettings },
]
</script>

<style scoped>
.sidebar {
  background-color: #05668d;
  color: white;
  width: 72px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  overflow: hidden;
}

.sidebar.expanded {
  width: 240px;
  align-items: flex-start;
}

.menu-toggle {
  cursor: pointer;
  margin-bottom: 20px;
}

.icon-wrapper {
  display: inline-flex;
  justify-content: center;
}
.icon {
  color: white;
  transition: color 0.3s ease;
}

.icon.active {
  color: #05668d;
}
.nav-item {
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  gap: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  padding: 0.5rem 0rem;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 20px;
  font-weight: lighter;
}

/* Active link */
.nav-item.active {
  background-color: white;
  color: #05668d;
  z-index: 1;
  position: relative;
}
</style>
