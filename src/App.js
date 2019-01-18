import React, { Component } from 'react'
import './App.scss'
import { Route, Link, Redirect } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Home from './parks/components/Home'
import ExploreParks from './parks/components/ExploreParks'
import Park from './parks/components/Park'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null,
      parks: [],
      image: null,
      currentPark: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setParks = ({parks, image, currentPark}) => this.setState({ parks, image, currentPark })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user, parks, image, currentPark } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <div className="">
          <Route exact path='/' render={() => (
            <Home flash={this.flash} />
          )} />
          <Route exact path='/exploreParks' render={() => (
            <ExploreParks flash={this.flash} user={user}
              parks={parks}
              image={image}
              currentPark={currentPark}
              setParks={this.setParks}/>
          )} />
          <Route path='/exploreParks/parks' render={() => (
            !this.state.parks[0]
              ? <Redirect to='/' />
              :<Park flash={this.flash}
                user={user}
                parks={parks}
                image={image}
                currentPark={currentPark}
                setUser={this.setUser}/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
        </div>
      </React.Fragment>
    )
  }
}

export default App
