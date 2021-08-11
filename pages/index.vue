<template>
  <div justify="center" align="center">
    <p class="text-h3">Hello</p>
    <v-btn color="primary" outlined @click="signout"> Sign Out </v-btn>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  computed: {
    isAuthenticated() {
      return this.$store.getters.getAuthenticated
    },
    user() {
      return this.$store.getters.getUser
    },
  },

  methods: {
    signout() {
      this.$fire.auth
        .signOut()
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
        .then(() => {
          this.$store.dispatch('handleAuthenticated', {value: false})
          this.$nuxt.$router.push('/auth/signin')
        })
    },
  },
}
</script>
