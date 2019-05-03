<template>
  <v-card>
    <v-card-title class="headline">{{ title }}</v-card-title>

    <v-card-text>

      <v-text-field
        label="Descrição"
        v-model="$v.item.description.$model"
      ></v-text-field>

      <v-select
        v-if="entity === 'category'"
        label="Operação"
        v-model="$v.item.operation.$model"
        :items="operations"
        item-text="description"
        item-value="value"
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
        :disabled="$v.$invalid"
        @click="save"
      >Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AccountCategoryAdd',
  props: {
    entity: String
  },
  data () {
    return {
      item: {
        description: '',
        operation: this.$route.query.type.toUpperCase()
      },
      operations: [
        { description: 'Receita', value: 'CREDIT' },
        { description: 'Despesa', value: 'DEBIT' }
      ]
    }
  },
  validations () {
    const validations = {
      item: {
        description: {
          required,
          minLength: minLength(3)
        }
      }
    }

    if (this.entity === 'account') { return validations }

    return {
      item: {
        ...validations.item,
        operation: { required }
      }
    }
  },
  computed: {
    title () {
      return this.entity === 'account'
        ? 'Nova Conta'
        : 'Nova Categoria'
    }
  },
  methods: {
    save (e) {
      console.log('Item: ', this.item)
    }
  }
}
</script>
