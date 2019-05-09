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

    <v-flex
      v-for="chart in charts"
      :key="chart.title"
      xs12
      sm6
      md6
      lg6
      xl6
    >
      <v-card>
        <v-card-text>
          <h2 class="font-weight-light mb-4">{{ chart.title }}</h2>
          <canvas :ref="chart.refId"></canvas>
        </v-card-text>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>

import Chart from 'chart.js'
import { mapActions, mapState } from 'vuex'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import { generateChartConfigs } from '@/utils'
import RecordsService from './../services/records-service'
import ToolbarByMonth from './../components/ToolbarByMonth.vue'

export default {
  name: 'ReportsHome',
  components: {
    ToolbarByMonth
  },
  data: () => ({
    chartIncomesExpenses: undefined,
    chartCategoryExpenses: undefined,
    charts: [
      { title: 'Receitas vs Despesas', refId: 'chartIncomesExpenses' },
      { title: 'Despesas por Categoria', refId: 'chartCategoryExpenses' }
    ],
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
    createChart (chartId, options) {
      const ref = Array.isArray(this.$refs[chartId])
        ? this.$refs[chartId][0]
        : this.$refs[chartId]
      const ctx = ref.getContext('2d')
      return new Chart(ctx, options)
    },
    setCharts () {
      // receitas e despesas
      const chartIncomesExpensesConfigs = generateChartConfigs({
        type: 'bar',
        items: this.records,
        keyToGroup: 'type',
        keyOfValue: 'amount',
        aliases: { CREDIT: 'Receitas', DEBIT: 'Despesas' },
        backgroundColors: [
          this.$vuetify.theme.error,
          this.$vuetify.theme.primary
        ]
      })

      if (this.chartIncomesExpenses) {
        this.chartIncomesExpenses.data.datasets = chartIncomesExpensesConfigs.data.datasets
        this.chartIncomesExpenses.update()
      } else {
        this.chartIncomesExpenses =
          this.createChart('chartIncomesExpenses', chartIncomesExpensesConfigs)
      }

      // despesas por categoria
      // chartCategoryExpenses
      const chartCategoryExpensesConfigs = generateChartConfigs({
        type: 'doughnut',
        items: this.records.filter(r => r.type === 'DEBIT'),
        keyToGroup: 'category.description',
        keyOfValue: 'amount',
        backgroundColors: [
          this.$vuetify.theme.accent,
          this.$vuetify.theme.warning,
          this.$vuetify.theme.info,
          this.$vuetify.theme.success
        ]
      })

      if (this.chartCategoryExpenses) {
        this.chartCategoryExpenses.data.datasets = chartCategoryExpensesConfigs.data.datasets
        this.chartCategoryExpenses.data.labels = chartCategoryExpensesConfigs.data.labels
        this.chartCategoryExpenses.update()
      } else {
        this.chartCategoryExpenses =
          this.createChart('chartCategoryExpenses', chartCategoryExpensesConfigs)
      }
    },
    setRecords () {
      this.subscriptions.push(
        this.monthSubject$
          .pipe(
            mergeMap(month => RecordsService.records({ month }))
          ).subscribe(records => {
            this.records = records
            this.setCharts()
          })
      )
    }
  }
}
</script>
