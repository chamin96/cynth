<template>
  <v-row align="center" justify="center" style="height: 100vh">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card width="500" class="text-left" elevation="2">
        <v-card-title>Sign In</v-card-title>
        <v-card-subtitle>Sign in to your dashboard</v-card-subtitle>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="auth.email"
              label="Email"
              name="email"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="auth.password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between px-4">
          <v-btn color="primary" depressed large @click="login">
            Sign In
          </v-btn>
          <v-btn color="primary" plain depressed large @click="forgotPassword">
            Forgot Password
          </v-btn>
        </v-card-actions>

        <v-divider class="mx-4"></v-divider>

        <p class="text-caption py-4 px-4">
          Dont't have an account?
          <nuxt-link to="/auth/signup">Sign Up</nuxt-link>
        </p>
      </v-card>
      <v-snackbar v-model="snackbar" :timeout="4000" absolute bottom center>
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: '',
      },
    }
  },

  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },

  created() {
    if (this.user) {
      this.$store.dispatch('handleAuthenticated', { value: true })
      this.$nuxt.$router.push('/')
    }
  },

  methods: {
    login() {
      const THIS = this
      this.$fire.auth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(function (error) {
          THIS.snackbarText = error.message
          THIS.snackbar = true
        })
        .then((user) => {
          // we are signed in
          if (user) {
            this.$store.dispatch('handleAuthenticated', { value: true })
          }
          this.$nuxt.$router.push('/')
        })
    },
    forgotPassword() {
      const that = this
      this.$fire.auth
        .sendPasswordResetEmail(this.auth.email)
        .then(function () {
          that.snackbarText = 'reset link sent to ' + that.auth.email
          that.snackbar = true
        })
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
        })
    },
  },
}
</script>

<style></style>
