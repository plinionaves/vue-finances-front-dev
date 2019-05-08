<template>
  <v-layout
    row
    wrap
  >

    <v-flex xs12>
      <ToolbarByMonth
        format="MM-YYYY"
        color="primary"
      />
    </v-flex>

  </v-layout>
</template>

<script>

import { mapActions } from 'vuex'

import ToolbarByMonth from './../components/ToolbarByMonth.vue'

export default {
  name: 'ReportsHome',
  components: {
    ToolbarByMonth
  },
  created () {
    this.setTitle({ title: 'Relatórios' })
  },
  methods: {
    ...mapActions(['setTitle'])
  }
}
</script>
