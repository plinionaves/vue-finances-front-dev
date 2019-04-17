<template>
  <v-toolbar
    app
    fixed
    color="primary"
  >
    <v-toolbar-side-icon @click.stop="$emit('hide', !show)"></v-toolbar-side-icon>
    <v-toolbar-title>{{ title || 'Dashboard' }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'AppToolbar',
  props: {
    show: Boolean
  },
  model: {
    prop: 'show',
    event: 'hide'
  },
  computed: {
    ...mapState(['title'])
  }
}
</script>
