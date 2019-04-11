<template>
  <v-toolbar
    app
    fixed
    color="primary"
  >
    <v-toolbar-side-icon @click.stop="$emit('hide', !show)"></v-toolbar-side-icon>
    <v-toolbar-title>Dashboard</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  props: {
    show: Boolean
  },
  model: {
    prop: 'show',
    event: 'hide'
  }
}
</script>
