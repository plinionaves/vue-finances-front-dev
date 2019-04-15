<template>
  <div>
    <h1>Lançamentos</h1>
    <RecordsList />
  </div>
</template>

<script>

import RecordsList from './../components/RecordsList.vue'

export default {
  name: 'RecordsHome',
  components: {
    RecordsList
  }
}
</script>
