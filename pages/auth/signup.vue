<template>
  <v-row align="center" justify="center" style="height: 100vh">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card width="500" class="text-left" elevation="2">
        <v-card-title>Sign Up</v-card-title>
        <v-card-subtitle>Sign up for a new account</v-card-subtitle>

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
          <v-btn color="primary" depressed large @click="signup">
            Sign Up
          </v-btn>
          <v-btn color="primary" plain depressed large @click="forgotPassword">
            Use Phone Instead
          </v-btn>
        </v-card-actions>

        <v-divider class="mx-4"></v-divider>
        <p class="text-caption py-4 px-4">
          Already have an account?
          <nuxt-link to="/auth/signin">Sign In</nuxt-link>
        </p>
      </v-card>
      <v-snackbar v-model="snackbar" :timeout="5000" absolute bottom center>
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
  methods: {
    signup() {
      const that = this
      this.$fire.auth
        .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
        .then((user) => {
          this.sendEmailVerification()
          this.$nuxt.$router.push('/auth/verify')
        })
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
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
    sendEmailVerification() {
      this.$fire.auth.currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        this.snackbarText = 'Email verification sent. Please Check your email.'
        this.snackbar = true
      })
    },
  },
}
</script>

<style></style>
