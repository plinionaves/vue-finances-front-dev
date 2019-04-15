<template>
  <v-list two-line>
    <RecordsListItem
      v-for="record in records"
      :key="record.id"
      :record="record"
    />
  </v-list>
</template>

<script>

import RecordsListItem from './RecordsListItem.vue'
import RecordsService from './../services/records-service'

export default {
  name: 'RecordsList',
  components: {
    RecordsListItem
  },
  data: () => ({
    records: []
  }),
  async created () {
    this.records = await RecordsService.records()
  }
}
</script>
