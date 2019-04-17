<template>
  <h1>Novo Lançamento</h1>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'RecordsAdd',
  created () {
    this.changeTitle(this.$route.query.type)
  },
  beforeRouteUpdate (to, from, next) {
    this.changeTitle(to.query.type)
    next()
  },
  methods: {
    ...mapActions(['setTitle']),
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Nova Receita'
          break
        case 'debit':
          title = 'Nova Despesa'
          break
        default:
          title = 'Novo Lançamento'
      }
      this.setTitle({ title })
    }
  }
}
</script>
