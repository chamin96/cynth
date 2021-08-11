/* eslint-disable no-lonely-if */
export default function ({ app, route, redirect, store }) {
  if (!store.state.isAuthenticated) {
    return redirect('/auth/signin')
  }
}
