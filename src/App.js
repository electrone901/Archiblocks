/* eslint-disable indent */
import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { appStore, onAppMount } from './state/app'

import { Wallet } from './components/Wallet'
import { Contract } from './components/Contract'
import { Keys } from './components/Keys'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
// import Home from './components/home/Home';

import './App.css'

const App = () => {
  const { state, dispatch, update } = useContext(appStore)

  const { near, wallet, account, localKeys, loading } = state

  const onMount = () => {
    dispatch(onAppMount())
  }
  useEffect(onMount, [])

  if (loading) {
    return (
      <div className="root">
        <h3>Workin on it!</h3>
      </div>
    )
  }

  return (
    <Router>
      <Navbar />
      <div
        className="root"
        style={{ minHeight: '60vh', paddingBottom: '3rem' }}
      >
        <h2>1. Guest Accounts</h2>
        <p>
          Set up a guest account (seed phrase + implicitAccountId) and you will
          also receive an access key that is added to the "contract account".
        </p>
        <Keys {...{ near, update, localKeys }} />
        <Contract {...{ near, update, localKeys, wallet, account }} />

        {localKeys && (
          <>
            <h2>3. Sign In with NEAR Wallet</h2>
            <p>
              Sign in with a wallet that already has NEAR tokens, and you will
              be presented above with an option to purchase the message created
              by the guest account.
            </p>
            <Wallet {...{ wallet, account }} />
          </>
        )}
      </div>
      <Footer />
    </Router>
  )
}

export default App
