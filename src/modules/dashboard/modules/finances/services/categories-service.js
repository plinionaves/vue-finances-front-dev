import apollo from '@/plugins/apollo'

import CategoriesQuery from './../graphql/Categories.gql'

const categories = async ({ operation }) => {
  const response = await apollo.query({
    query: CategoriesQuery,
    variables: { operation: operation ? operation.toUpperCase() : operation }
  })
  return response.data.categories
}

export default {
  categories
}
