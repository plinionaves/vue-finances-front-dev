<template>
  <v-card>

    <v-list
      two-line
      subheader
    >
      <template v-for="(records, date, index) in mappedRecords">
        <v-subheader :key="date">{{ date }}</v-subheader>
        <RecordsListItem
          v-for="record in records"
          :key="record.id"
          :record="record"
        />
        <v-divider
          :key="`${date}-${index}`"
          v-if="showDivider(index, mappedRecords)"
        ></v-divider>
      </template>
    </v-list>

    <v-footer class="pa-2">
      <v-flex text-xs-right>
        <h3 class="font-weight-light">
          <span>Saldo do mês:</span>
          <strong
            class="ml-5"
            :class="amountColor(totalAmount)"
          >{{ formatCurrency(totalAmount) }}</strong>
        </h3>
      </v-flex>
    </v-footer>

  </v-card>
</template>

<script>

import moment from 'moment'
import { groupBy } from '@/utils'
import amountColorMixin from './../mixins/amount-color'
import formatCurrencyMixin from '@/mixins/format-currency'
import RecordsListItem from './RecordsListItem.vue'
import RecordsService from './../services/records-service'

export default {
  name: 'RecordsList',
  components: {
    RecordsListItem
  },
  mixins: [
    amountColorMixin,
    formatCurrencyMixin
  ],
  data: () => ({
    records: []
  }),
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dateKey) => {
        return moment(record[dateKey]).format('DD/MM/YYYY')
      })
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    }
  },
  async created () {
    this.records = await RecordsService.records()
  },
  methods: {
    showDivider (index, object) {
      return index < Object.keys(object).length - 1
    }
  }
}
</script>
