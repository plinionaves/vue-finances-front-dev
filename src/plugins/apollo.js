import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'

const AUTH_TOKEN = 'apollo-token'

const resetApolloClient = async apollo => {
  try {
    await apollo.resetStore()
  } catch (e) {
    console.log('%cError on cache reset', 'color: orange;', e.message)
  }
}

const onLogin = async (apollo, token) => {
  if (typeof window.localStorage !== 'undefined' && token) {
    window.localStorage.setItem(AUTH_TOKEN, token)
  }
  await resetApolloClient(apollo)
}

const link = new HttpLink({
  uri: 'http://localhost:4000'
})

const authLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext()
  operation.setContext({
    headers: {
      ...headers,
      'Authorization': `Bearer ${window.localStorage.getItem(AUTH_TOKEN)}`
    }
  })
  return forward(operation)
})

const apollo = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    link
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production'
})

export default apollo

export {
  AUTH_TOKEN,
  onLogin
}
