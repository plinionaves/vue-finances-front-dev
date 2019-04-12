<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>

import AppLayout from './../components/AppLayout.vue'

export default {
  name: 'Dashboard',
  components: {
    AppLayout
  }
}
</script>
