import React from 'react'
import logo from './assets/img/3d-stocktake-logo.jpg'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'
import './App.css'
import Auth from './Auth'

const getFirebaseConfig = new Promise((resolve, reject) => {
  axios
    .get(`/__/firebase/init.json`)
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => reject(err))
})

function App() {
  const [initialized, setInitialized] = React.useState(false)

  React.useEffect(() => {
    getFirebaseConfig.then((result: any) => {
      firebase.initializeApp(result)
      setInitialized(true)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>{initialized && <Auth />}</section>
    </div>
  )
}

export default App
