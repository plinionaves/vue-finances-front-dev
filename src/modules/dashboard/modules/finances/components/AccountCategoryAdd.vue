<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <v-text-field label="Descrição"></v-text-field>
      <v-select
        v-if="entity === 'category'"
        label="Operação"
      ></v-select>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click="$emit('close')"
      >Cancelar</v-btn>
      <v-btn
        flat
        color="primary"
      >Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AccountCategoryAdd',
  props: {
    entity: String
  },
  computed: {
    title () {
      return this.entity === 'account'
        ? 'Nova Conta'
        : 'Nova Categoria'
    }
  }
}
</script>
