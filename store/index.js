const state = () => ({
  user: null,
  isAuthenticated: false,
})

const getters = {
  getUser(state) {
    return state.user
  },

  getAuthenticated(state) {
    return state.isAuthenticated
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SET_AUTHENTICATED(state, value) {
    state.isAuthenticated = value
  },
}

const actions = {
  async nuxtServerInit({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

      if (authUser) {
        commit('SET_AUTHENTICATED', true)
      } else {
        commit('SET_AUTHENTICATED', false)
      }

      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
        token,
      })
    }
  },

  onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      commit('SET_USER', null)
      return
    }

    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    commit('SET_USER', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim,
    })
  },

  handleAuthenticated({ commit }, { value }) {
    commit('SET_AUTHENTICATED', value)
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
