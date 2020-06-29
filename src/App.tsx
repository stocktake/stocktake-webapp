import React from 'react'
import logo from './assets/img/3d-stocktake-logo.jpg'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import axios from 'axios'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'

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
    LogRocket.init('stocktake/stocktake-webapp')
    setupLogRocketReact(LogRocket)

    getFirebaseConfig.then((result: any) => {
      firebase.initializeApp(result)
      setInitialized(true)
    })
  }, [])

  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <header className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-700 leading-tight">Stocktake</h1>
      </header>
      <section className="text-base text-gray-700 leading-normal">
        {initialized && <Auth />}
      </section>
    </div>
  )
}

export default App
