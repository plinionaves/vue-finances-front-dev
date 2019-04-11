<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :mini-variant="mini"
    absolute
    temporary
  >

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      { title: 'Home', icon: 'dashboard', url: '/dashboard', exact: true }
    ],
    mini: false
  })
}
</script>
