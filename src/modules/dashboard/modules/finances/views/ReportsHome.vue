<template>
  <v-layout
    row
    wrap
  >

    <v-flex xs12>
      <ToolbarByMonth
        format="MM-YYYY"
        color="primary"
        :month="month || $route.query.month"
        @month="changeMonth"
      />
    </v-flex>

  </v-layout>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import RecordsService from './../services/records-service'
import ToolbarByMonth from './../components/ToolbarByMonth.vue'

export default {
  name: 'ReportsHome',
  components: {
    ToolbarByMonth
  },
  data: () => ({
    monthSubject$: new Subject(),
    records: [],
    subscriptions: []
  }),
  computed: {
    ...mapState('finances', ['month'])
  },
  created () {
    this.setTitle({ title: 'Relatórios' })
    this.setRecords()
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
  },
  methods: {
    ...mapActions(['setTitle']),
    ...mapActions('finances', ['setMonth']),
    changeMonth (month) {
      this.$router.push({
        path: this.$route.path,
        query: { month }
      })
      this.setMonth({ month })
      this.monthSubject$.next(month)
    },
    setRecords () {
      this.subscriptions.push(
        this.monthSubject$
          .pipe(
            mergeMap(month => RecordsService.records({ month }))
          ).subscribe(records => {
            this.records = records
            console.log('Records: ', this.records)
          })
      )
    }
  }
}
</script>
