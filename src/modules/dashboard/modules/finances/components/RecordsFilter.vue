<template>
  <div>

    <v-layout row>
      <v-flex xs6>
        <v-btn icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn
          icon
          @click="showFilterDialog = true"
        >
          <v-icon>filter_list</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="showFilterDialog"
      max-width="350px"
    >
      <v-card>
        <v-card-title>
          <h3 class="headline">Filtros</h3>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="showFilterDialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="filter"
          >
            <v-icon>check</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: 'RecordsFilter',
  data: () => ({
    showFilterDialog: false
  }),
  methods: {
    filter (e) {
      console.log('Filters')
    }
  }
}
</script>
