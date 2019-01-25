import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { addToParks } from '../parksApi'

class ParkItem extends Component {
  constructor() {
    super()

    this.state = {}
  }

  removeFavorite = event => {
    const { user, history, flash, setUser, setFavorites } = this.props

    // grabs the parkCode of the currentPark
    const favorite = event.target.value

    addToParks(user, favorite)
      .then(res => res.json())
      .then(res => {
        setFavorites( { favoriteParksData: res.favoriteParksData } )
        return res
      })
      .catch(console.error)
      // otherwise, redirect the user to sign-in
  }

  render () {

    const { park } = this.props

    return (
      <p className='parkItem'>
        <span>{ park.fullName }</span>
        <button  onClickCapture={this.removeFavorite} value={park.parkCode}>Remove Park</button>
      </p>
    )
  }
}

export default ParkItem
