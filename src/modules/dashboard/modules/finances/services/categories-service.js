import apollo from '@/plugins/apollo'

import CategoriesQuery from './../graphql/Categories.gql'
import CategoryCreateMutation from './../graphql/CategoryCreate.gql'

const categories = async ({ operation }) => {
  const response = await apollo.query({
    query: CategoriesQuery,
    variables: { operation: operation ? operation.toUpperCase() : operation }
  })
  return response.data.categories
}

const createCategory = async variables => {
  const response = await apollo.mutate({
    mutation: CategoryCreateMutation,
    variables,
    update: (proxy, { data: { createCategory } }) => {
      try {
        const variables = { operation: createCategory.operation }
        const data = proxy.readQuery({
          query: CategoriesQuery,
          variables
        })

        data.categories = [...data.categories, createCategory]

        proxy.writeQuery({
          query: CategoriesQuery,
          variables,
          data
        })
      } catch (e) {
        console.log('Query "categories" has not been read yet!', e)
      }
    }
  })
  return response.data.createCategory
}

export default {
  categories,
  createCategory
}
