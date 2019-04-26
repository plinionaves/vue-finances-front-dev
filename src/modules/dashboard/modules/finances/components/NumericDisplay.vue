<template>
  <v-card :color="color">
    <div style="height: 345px"></div>
  </v-card>
</template>

<script>
export default {
  name: 'NumericDisplay',
  props: {
    color: String
  }
}
</script>
