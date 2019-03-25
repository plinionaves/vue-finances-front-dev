import apollo, { onLogin } from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.gql'

const login = async variables => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  const { login } = response.data
  await onLogin(apollo, login.token)
  return login
}

export default {
  login
}
