import apollo from '@/plugins/apollo'

import AccountsQuery from './../graphql/Accounts.gql'
import AccountCreateMutation from './../graphql/AccountCreate.gql'

const accounts = async () => {
  const response = await apollo.query({
    query: AccountsQuery
  })
  return response.data.accounts
}

const createAccount = async variables => {
  const response = await apollo.mutate({
    mutation: AccountCreateMutation,
    variables,
    update: (proxy, { data: { createAccount } }) => {
      try {
        const data = proxy.readQuery({
          AccountsQuery
        })

        data.accounts = [...data.accounts, createAccount]

        proxy.writeQuery({
          query: AccountsQuery,
          data
        })
      } catch (e) {
        console.log('Query "accounts" has not been read yet!', e)
      }
    }
  })
  return response.data.createAccount
}

export default {
  accounts,
  createAccount
}
