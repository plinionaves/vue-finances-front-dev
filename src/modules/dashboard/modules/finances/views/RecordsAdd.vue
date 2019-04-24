<template>
  <v-container text-xs-center>
    <v-layout
      row
      wrap
    >

      <v-flex
        xs12
        sm6
        md4
        lg4
      >
        <p>Amount</p>
      </v-flex>

      <v-flex
        xs12
        sm6
        md8
        lg8
      >
        <v-card>
          <v-card-text>
            <v-form>

              <v-select
                name="account"
                label="Conta"
                prepend-icon="account_balance"
                :items="accounts"
                item-text="description"
                item-value="id"
                v-model="$v.record.accountId.$model"
              ></v-select>

              <v-select
                name="category"
                label="Categoria"
                prepend-icon="class"
                :items="categories"
                item-text="description"
                item-value="id"
                v-model="$v.record.categoryId.$model"
              ></v-select>

              <v-text-field
                name="description"
                label="Descrição"
                prepend-icon="description"
                type="text"
                v-model="$v.record.description.$model"
              ></v-text-field>

              <v-text-field
                name="tags"
                label="Tags (separadas por vírgula)"
                prepend-icon="label"
                type="text"
                v-model="record.tags"
              ></v-text-field>

              <v-text-field
                name="note"
                label="Observação"
                prepend-icon="note"
                type="text"
                v-model="record.note"
              ></v-text-field>

            </v-form>
          </v-card-text>
        </v-card>

        <v-btn
          color="secondary"
          large
          fab
          class="mt-4"
          @click="$router.back()"
        >
          <v-icon>close</v-icon>
        </v-btn>

        <v-btn
          :color="color"
          large
          fab
          class="mt-4"
          @click="submit"
        >
          <v-icon>check</v-icon>
        </v-btn>

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

import moment from 'moment'
import { decimal, minLength, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

import AccountsService from './../services/accounts-service'
import CategoriesService from './../services/categories-service'

export default {
  name: 'RecordsAdd',
  data () {
    return {
      accounts: [],
      categories: [],
      record: {
        type: this.$route.query.type.toUpperCase(),
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accountId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
      }
    }
  },
  validations: {
    record: {
      type: { required },
      amount: { required, decimal, different: value => value !== 0 },
      date: { required },
      accountId: { required },
      categoryId: { required },
      description: { required, minLength: minLength(6) }
    }
  },
  computed: {
    color () {
      switch (this.record.type) {
        case 'CREDIT':
          return 'primary'

        case 'DEBIT':
          return 'error'

        default:
          return 'primary'
      }
    }
  },
  async created () {
    this.changeTitle(this.$route.query.type)
    this.accounts = await AccountsService.accounts()
    this.categories = await CategoriesService.categories({ operation: this.$route.query.type })
  },
  async beforeRouteUpdate (to, from, next) {
    const { type } = to.query
    this.changeTitle(type)
    this.record.type = type.toUpperCase()
    this.categories = await CategoriesService.categories({ operation: type })
    next()
  },
  methods: {
    ...mapActions(['setTitle']),
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Nova Receita'
          break
        case 'debit':
          title = 'Nova Despesa'
          break
        default:
          title = 'Novo Lançamento'
      }
      this.setTitle({ title })
    },
    submit () {
      console.log('Form: ', this.record)
    }
  }
}
</script>
