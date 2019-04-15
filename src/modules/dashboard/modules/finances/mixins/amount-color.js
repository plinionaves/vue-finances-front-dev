export default {
  methods: {
    amountColor (amount) {
      return amount < 0
        ? 'error--text text--lighten-1'
        : 'primary--text text--lighten-1'
    }
  }
}
