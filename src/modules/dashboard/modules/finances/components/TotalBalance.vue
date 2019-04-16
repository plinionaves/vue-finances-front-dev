<template>
  <v-card :color="color">
    <v-card-title primary-title>
      <div class="text-xs-center ma-auto">
        <p class="subheading">Saldo atual</p>
        <h1 class="display-2">{{ totalInCurrency }}</h1>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>

import formatCurrencyMixin from '@/mixins/format-currency'
import RecordsService from './../services/records-service'

export default {
  name: 'TotalBalance',
  mixins: [
    formatCurrencyMixin
  ],
  data: () => ({
    total: 0
  }),
  computed: {
    color () {
      return this.total < 0 ? 'error' : 'primary'
    },
    totalInCurrency () {
      return this.formatCurrency(this.total)
    }
  },
  async created () {
    this.total = await RecordsService.totalBalance()
  }
}
</script>
