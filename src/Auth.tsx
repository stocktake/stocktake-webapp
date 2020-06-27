import React from 'react'
import * as firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

function Auth() {
  const [loading, setLoading] = React.useState(true)
  const [isSignedIn, setIsSignedIn] = React.useState(true)

  React.useEffect(() => {
    console.log(firebase.auth().currentUser)
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => setIsSignedIn(!!user))

    return unregisterAuthObserver
  }, [])

  const uiConfig = {
    callbacks: {
      signInSuccess: (auth: any) => {
        console.log(auth)
      },
      signInSuccessWithAuthResult: () => false,
      uiShown: function () {
        setLoading(false)
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  }

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      {loading && <p>Loading....</p>}
      {isSignedIn && (
        <div>
          <p>
            Hello {firebase.auth().currentUser?.displayName}! You are a....
            poopyface
          </p>
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </div>
      )}
    </div>
  )
}

export default Auth
