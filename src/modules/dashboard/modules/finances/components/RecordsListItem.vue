<template>
  <v-list-tile avatar>

    <v-list-tile-avatar>
      <v-icon :class="[ recordIconColor(record.type), 'lighten-1 white--text' ]">{{ recordIcon(record.type) }}</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ record.description }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ record.category.description }} | {{ record.account.description }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <span :class="amountColor(record.amount)">{{ formatCurrency(record.amount) }}</span>
    </v-list-tile-action>

  </v-list-tile>
</template>

<script>

import amountColorMixin from './../mixins/amount-color'
import formatCurrencyMixin from '@/mixins/format-currency'

export default {
  name: 'RecordsListItem',
  mixins: [
    amountColorMixin,
    formatCurrencyMixin
  ],
  props: {
    record: Object
  },
  methods: {
    recordIcon (type) {
      return type === 'CREDIT' ? 'arrow_upward' : 'arrow_downward'
    },
    recordIconColor (type) {
      return type === 'CREDIT' ? 'primary' : 'error'
    }
  }
}
</script>
