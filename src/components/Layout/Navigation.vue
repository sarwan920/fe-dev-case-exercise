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
      <component :is="item.icon" class="icon" :class="{ active: $route.path === item.route }" />
      <span v-if="isExpanded">{{ item.name }}</span>
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
  position: relative;
  background-color: #05668d;
  color: white;
  width: 60px;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  padding-top: 4rem; /* Push nav items below the toggle */
  padding-left: 1rem;
  overflow: hidden;
}

.sidebar.expanded {
  width: 200px;
  align-items: flex-start;
  padding-left: 1rem;
}

.menu-toggle {
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  /* z-index: 2; */
  margin-bottom: 100px;
}

.icon {
  /* height: 24px;
  width: 24px; */
  color: white;
  transition: color 0.3s ease;
}

.icon.active {
  color: #05668d;
}
.nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  padding: 0.5rem 0rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

/* Active link */
.nav-item.active {
  background-color: white;
  color: #05668d;
  margin-left: -1rem; /* Pull it outside of the sidebar */
  padding-left: 1.5rem;
  width: calc(100% + 1rem); /* Extend past the sidebar's right edge */
  z-index: 1;
  position: relative;
}

.icon {
  font-size: 1.5rem;
}

/* Main Content */
.content {
  flex: 1;
  padding: 2rem;
}
</style>
