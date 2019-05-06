<template>
  <v-toolbar :color="color">
    <v-layout align-center>

      <v-flex xs1>
        <div class="text-xs-left">
          <v-btn
            icon
            flat
            @click="decrement"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </div>
      </v-flex>

      <v-flex
        xs8
        offset-xs1
      >
        <v-toolbar-title class="text-xs-center">
          <span>{{ currentMonth }}</span>
        </v-toolbar-title>
      </v-flex>

      <v-flex
        xs1
        text-xs-right
        v-if="showSlot"
      >
        <slot />
      </v-flex>

      <v-flex
        xs1
        :class="arrowRightClass"
      >
        <div class="text-xs-right">
          <v-btn
            icon
            flat
            @click="increment"
          >
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </div>
      </v-flex>

    </v-layout>
  </v-toolbar>
</template>

<script>

import moment from 'moment'

export default {
  name: 'ToolbarByMonth',
  props: {
    color: String,
    format: String,
    month: String,
    showSlot: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    date: undefined
  }),
  computed: {
    arrowRightClass () {
      return !this.showSlot ? 'offset-xs1' : ''
    },
    currentMonth () {
      return this.date.format('MMMM YYYY')
    }
  },
  created () {
    this.setCurrentMonth()
    this.emit()
  },
  methods: {
    emit () {
      this.$emit('month', this.date.format(this.format))
    },
    decrement () {
      this.date = this.date.clone().subtract(1, 'month')
      this.emit()
    },
    increment () {
      this.date = this.date.clone().add(1, 'month')
      this.emit()
    },
    setCurrentMonth () {
      this.date = this.month ? moment(this.month, this.format) : moment()
    }
  }
}
</script>
