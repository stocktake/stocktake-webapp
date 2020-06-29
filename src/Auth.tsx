import React from 'react'
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import LogRocket from 'logrocket'

function Auth() {
  const [loading, setLoading] = React.useState(true)
  const user = firebase.auth().currentUser

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: () => false,
      uiShown: function () {
        setLoading(false)
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
      },
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  }

  React.useEffect(() => {
    if (!!user) {
      LogRocket.identify(user.uid, {
        name: `${user.displayName}`,
        email: `${user.email}`
      })
    }
  }, [user])

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      {loading && <p>Loading....</p>}
      {!!user && (
        <div>
          <p>Hello {user.displayName}! You are a.... poopyface</p>
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </div>
      )}
    </div>
  )
}

export default Auth
